import { NextResponse } from "next/server";
import type { LeadPayload, PowerValue } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const POWERS: PowerValue[] = ["65", "145", "210", "230", "unknown"];

/**
 * Простой in-memory rate limit по IP.
 * Достаточно как базовая защита; для нескольких инстансов нужен внешний стор
 * (Upstash/Redis) — отмечено в README как пункт на подтверждение.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function str(v: unknown, max = 2000): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  if (!t) return undefined;
  return t.slice(0, max);
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: скрытое поле должно быть пустым у людей.
  if (str(body.company_website)) {
    // Отвечаем 200, чтобы не подсказывать боту, но заявку не обрабатываем.
    return NextResponse.json({ ok: true });
  }

  const power = body.power as PowerValue;
  if (!POWERS.includes(power)) {
    return NextResponse.json({ ok: false, error: "invalid_power" }, { status: 400 });
  }

  const phone = str(body.phone, 40);
  const email = isEmail(body.email) ? (body.email as string).trim() : undefined;
  if (!phone && !email) {
    return NextResponse.json({ ok: false, error: "no_contact" }, { status: 400 });
  }

  const purposes = Array.isArray(body.purposes)
    ? body.purposes.filter((p): p is string => typeof p === "string").slice(0, 12)
    : [];

  const lead: LeadPayload = {
    company: str(body.company, 200),
    name: str(body.name, 200),
    phone,
    email,
    region: str(body.region, 200),
    power,
    purposes,
    comment: str(body.comment, 2000),
    source: str(body.source, 100) ?? "gpu-landing",
    pageUrl: str(body.pageUrl, 500),
    utmSource: str(body.utmSource, 200),
    utmMedium: str(body.utmMedium, 200),
    utmCampaign: str(body.utmCampaign, 200),
    utmContent: str(body.utmContent, 200),
    utmTerm: str(body.utmTerm, 200),
  };

  // Пересылаем в CRM/чат/таблицу через вебхук, если он задан.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const resp = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          receivedAt: new Date().toISOString(),
          ip,
        }),
      });
      if (!resp.ok) {
        console.error("[lead] webhook non-2xx:", resp.status);
        return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
      }
    } catch (e) {
      console.error("[lead] webhook error:", e instanceof Error ? e.message : "unknown");
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } else {
    // Вебхук не настроен: не логируем персональные данные, только факт заявки.
    console.info("[lead] received (no LEAD_WEBHOOK_URL configured):", {
      power: lead.power,
      purposes: lead.purposes,
      hasPhone: Boolean(lead.phone),
      hasEmail: Boolean(lead.email),
      source: lead.source,
    });
  }

  return NextResponse.json({ ok: true });
}
