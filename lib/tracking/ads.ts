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

type Gtag = (...args: unknown[]) => void;

function gtagFn(): Gtag {
  const w = window as Window & { dataLayer?: unknown[]; gtag?: Gtag };
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  return w.gtag;
}

/** Path only, so a thank-you redirect cannot forward contact fields in the query string. */
export function pageLocationWithoutQuery(): string {
  return `${window.location.origin}${window.location.pathname}`;
}

function readCookie(name: string): string {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : "";
}

function gaClientId(): string {
  const parts = readCookie("_ga").split(".");
  if (parts.length >= 4 && parts[2] && parts[3]) return `${parts[2]}.${parts[3]}`;
  return "";
}

function gaSession(): { sid: string; sct: string } {
  const raw = readCookie(`_ga_${GA4_MEASUREMENT_ID.slice(2)}`);
  const sid = raw.match(/(?:^|[.$])s(\d+)/)?.[1];
  const sct = raw.match(/\$o(\d+)/)?.[1];
  if (sid) return { sid, sct: sct || "1" };
  return { sid: String(Math.floor(Date.now() / 1000)), sct: "1" };
}

function bodyText(body: unknown): string {
  if (!body) return "";
  if (typeof body === "string") return body;
  if (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams) return body.toString();
  return "";
}

/**
 * Asks gtag to send the event only to GA4. On this property the shared tag
 * (GA4 + Ads on one dataLayer) collects page_view, contact_us, and purchase,
 * and drops generate_lead and phone_click. If that request is not seen,
 * one collect beacon is sent with the same client id and no query string.
 */
export function sendGa4Event(name: string, params: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const page_location = pageLocationWithoutQuery();
  let seen = false;
  const watch = (url: unknown, body: unknown) => {
    const blob = `${typeof url === "string" ? url : ""} ${bodyText(body)}`;
    if (blob.includes(`en=${name}`) && blob.includes(GA4_MEASUREMENT_ID)) seen = true;
    if (blob.includes(`en=${encodeURIComponent(name)}`) && blob.includes(GA4_MEASUREMENT_ID)) seen = true;
  };
  const origFetch = window.fetch;
  const origBeacon = navigator.sendBeacon?.bind(navigator);
  window.fetch = function fetchWatch(input: RequestInfo | URL, init?: RequestInit) {
    try {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      watch(url, init?.body);
    } catch {
      /* observation must not break the request */
    }
    return origFetch.call(this, input, init);
  };
  if (origBeacon) {
    navigator.sendBeacon = function beaconWatch(url, data) {
      watch(url, data);
      return origBeacon(url, data);
    };
  }

  const restore = () => {
    window.fetch = origFetch;
    if (origBeacon) navigator.sendBeacon = origBeacon;
  };

  const fallback = () => {
    restore();
    if (seen) return;
    const cid = gaClientId();
    if (!cid) return;
    const { sid, sct } = gaSession();
    const query = new URLSearchParams({
      v: "2",
      tid: GA4_MEASUREMENT_ID,
      cid,
      sid,
      sct,
      seg: "1",
      dl: page_location,
      dt: document.title.slice(0, 120),
      en: name,
      _ee: "1",
      gcd: "13l3l3l3l1l1",
      npa: "0",
    });
    if (params.currency != null) query.set("cu", String(params.currency));
    for (const [key, value] of Object.entries(params)) {
      if (key === "currency") continue;
      query.set(typeof value === "number" ? `epn.${key}` : `ep.${key}`, String(value));
    }
    const url = `https://analytics.google.com/g/collect?${query.toString()}`;
    try {
      if (origBeacon?.(url)) return;
    } catch {
      /* fetch below */
    }
    origFetch(url, { method: "POST", mode: "no-cors", keepalive: true }).catch(() => {});
  };

  gtagFn()("event", name, {
    send_to: GA4_MEASUREMENT_ID,
    page_location,
    ...params,
  });
  window.setTimeout(fallback, 1200);
}
