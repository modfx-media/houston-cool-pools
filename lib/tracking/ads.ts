/**
 * Google Ads / GA4 conversion config for Houston Cool Pools.
 *
 * These labels are the ones already installed on the site (the "MFX Submit
 * lead form" and "MFX Click to call" event snippets). They are not read from
 * environment variables. Muhammad must confirm in Google Ads that each label
 * still belongs to a Primary conversion action included in the Conversions
 * column. If a label was rotated in the Ads UI, paste the new one here.
 */
export const GA4_MEASUREMENT_ID = "G-ZV23BE77HG";

export const GOOGLE_ADS_ID = "AW-990264356";

/** MFX Submit lead form. Fires once per confirmed form success. */
export const ADS_LEAD_CONVERSION_LABEL = "3JEoCJf1u9ccEKT4mNgD";

/** MFX Click to call. Fires on a tap/click of a landing-page tel: link. */
export const ADS_PHONE_CLICK_CONVERSION_LABEL = "y9PqCPnO09ccEKT4mNgD";

/**
 * Calls-from-website snippet (Google forwarding). Separate action from the
 * click conversion above. Kept so an already-configured call action can
 * still register the number. Only one of these two should be Primary in Ads.
 */
export const ADS_CALLS_FROM_WEBSITE_LABEL = "nMiBCPbO09ccEKT4mNgD";

export const ADS_LEAD_SEND_TO = `${GOOGLE_ADS_ID}/${ADS_LEAD_CONVERSION_LABEL}`;
export const ADS_PHONE_CLICK_SEND_TO = `${GOOGLE_ADS_ID}/${ADS_PHONE_CLICK_CONVERSION_LABEL}`;
export const ADS_CALLS_FROM_WEBSITE_SEND_TO = `${GOOGLE_ADS_ID}/${ADS_CALLS_FROM_WEBSITE_LABEL}`;

/** Landing-page call-tracking number. Not the main-site office line. */
export const LP_PHONE_DISPLAY = "(281) 938-4830";
export const LP_PHONE_DIGITS = "2819384830";

/**
 * Set when a form iframe reports success. The thank-you page consumes it.
 * A later submission in the same tab can set it again.
 */
export const LEAD_PENDING_STORAGE_KEY = "hcp_lead_pending";

/** Long enough for the GoHighLevel top-window redirect, short enough that a later direct visit does not count. */
export const LEAD_PENDING_TTL_MS = 2 * 60 * 1000;

const GHL_DOMAINS = ["millcreekmktg.com", "leadconnectorhq.com", "msgsndr.com"] as const;

/** Exact host or a real subdomain. `leadconnectorhq.com.evil.test` does not pass. */
export function isGhlHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  return GHL_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
}

export function isGhlLeadMessage(origin: string, data: unknown): boolean {
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  if (url.protocol !== "https:") return false;
  if (!isGhlHostname(url.hostname)) return false;
  return Array.isArray(data) && data[0] === "set-sticky-contacts";
}

/** The message must come from a form iframe on this page, not from the parent or another frame. */
export function isFormFrameSource(source: MessageEventSource | null): boolean {
  if (!source || typeof document === "undefined") return false;
  const frames = document.querySelectorAll<HTMLIFrameElement>("iframe[data-form-id]");
  for (const frame of frames) {
    if (frame.contentWindow === source) return true;
  }
  return false;
}

/**
 * GoHighLevel posts `set-sticky-contacts` only after it has accepted a
 * submission. Load-time messages (`fetch-sticky-contacts`,
 * `fetch-query-params`) must not count.
 */
export function isGhlLeadSuccess(event: {
  origin: string;
  data: unknown;
  source: MessageEventSource | null;
}): boolean {
  return isGhlLeadMessage(event.origin, event.data) && isFormFrameSource(event.source);
}

/** Path only. Conversion events must not forward contact fields from the query string. */
export function pageLocationWithoutQuery(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${window.location.pathname}`;
}

const PII_QUERY_KEYS = new Set([
  "email",
  "e-mail",
  "mail",
  "phone",
  "tel",
  "mobile",
  "phone_number",
  "name",
  "first_name",
  "last_name",
  "firstname",
  "lastname",
  "full_name",
  "fullname",
  "fname",
  "lname",
  "address",
  "street",
  "city",
  "zip",
  "postal",
  "postal_code",
  "message",
  "comments",
]);

function isKeptCampaignKey(key: string): boolean {
  return (
    /^(gclid|gbraid|wbraid|fbclid|msclkid|gad_source|gclsrc|gad_campaignid)$/i.test(key) ||
    /^utm_/i.test(key)
  );
}

function valueLooksLikePii(value: string): boolean {
  if (value.includes("@")) return true;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10;
}

/**
 * Page location for gtag config (page_view and Ads remarketing).
 * Keeps click ids and utm params. Drops contact-field names and values that
 * look like an email or a phone number.
 */
export function pageLocationForConfig(href?: string): string {
  const raw = href ?? (typeof window !== "undefined" ? window.location.href : "");
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return raw;
  }
  const keep = new URLSearchParams();
  url.searchParams.forEach((value, key) => {
    if (isKeptCampaignKey(key)) {
      keep.append(key, value);
      return;
    }
    if (PII_QUERY_KEYS.has(key.toLowerCase())) return;
    if (valueLooksLikePii(value)) return;
    keep.append(key, value);
  });
  const qs = keep.toString();
  return `${url.origin}${url.pathname}${qs ? `?${qs}` : ""}`;
}
