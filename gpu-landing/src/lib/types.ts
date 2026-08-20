export type PowerValue = "65" | "145" | "210" | "230" | "unknown";

export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export interface LeadPayload extends UtmParams {
  company?: string;
  name?: string;
  phone?: string;
  email?: string;
  region?: string;
  power: PowerValue;
  purposes: string[];
  comment?: string;
  source?: string;
  pageUrl?: string;
}
