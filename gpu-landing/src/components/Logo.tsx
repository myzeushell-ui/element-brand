import Image from "next/image";
import { company } from "@/lib/config";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt={`${company.brand} — газопоршневые установки`}
      width={108}
      height={36}
      priority
      className={cn("h-9 w-auto", className)}
      style={{ height: "2.1rem", width: "auto" }}
    />
  );
}
