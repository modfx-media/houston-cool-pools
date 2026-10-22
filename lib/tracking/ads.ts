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

/** MFX Click to call. Fires on a tap/click of the landing-page tracking number. */
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

export const LEAD_CONVERSION_STORAGE_KEY = "hcp_ads_lead_fired";

const GHL_ORIGIN = /millcreekmktg\.com|leadconnectorhq\.com|msgsndr\.com/i;

/**
 * GoHighLevel posts this to the parent only after it has accepted a
 * submission (the form bundle sends it from the success handler, not on
 * load). Load-time messages are `fetch-sticky-contacts` and
 * `fetch-query-params`, which must not count.
 */
export function isGhlLeadSuccess(origin: string, data: unknown): boolean {
  if (!GHL_ORIGIN.test(origin)) return false;
  return Array.isArray(data) && data[0] === "set-sticky-contacts";
}

export function isLpTrackingPhone(href: string): boolean {
  const digits = href.replace(/\D/g, "");
  return digits.endsWith(LP_PHONE_DIGITS);
}

const GA4_COLLECT = "https://analytics.google.com/g/collect";

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : "";
}

/** GA4 client id from the `_ga` cookie (`GA1.1.<cid>.<ts>` → `<cid>.<ts>`). */
function gaClientId(): string {
  const parts = readCookie("_ga").split(".");
  if (parts.length >= 4 && parts[2] && parts[3]) return `${parts[2]}.${parts[3]}`;
  try {
    const existing = sessionStorage.getItem("hcp_ga_cid");
    if (existing) return existing;
    const created = `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`;
    sessionStorage.setItem("hcp_ga_cid", created);
    return created;
  } catch {
    return `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`;
  }
}

/** Session id and count from the GS2 `_ga_<measurement>` cookie. */
function gaSession(): { sid: string; sct: string } {
  const raw = readCookie(`_ga_${GA4_MEASUREMENT_ID.slice(2)}`);
  const sid = raw.match(/(?:^|[.$])s(\d+)/)?.[1];
  const sct = raw.match(/\$o(\d+)/)?.[1];
  if (sid) return { sid, sct: sct || "1" };
  return { sid: String(Math.floor(Date.now() / 1000)), sct: "1" };
}

function gclidFromPage(): string {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("gclid");
    if (fromUrl) return fromUrl;
  } catch {
    /* ignore */
  }
  const aw = readCookie("_gcl_aw");
  const parts = aw.split(".");
  return parts.length >= 3 ? parts.slice(2).join(".") : "";
}

/**
 * Sends one GA4 event straight to the collect endpoint.
 *
 * gtag('event', name, { send_to: GA4 }) does not leave the browser on these
 * landing pages once the Google Ads tag is configured on the same dataLayer
 * (page_view still does; the custom event does not). An unscoped gtag event
 * is worse: it is collected as an Ads conversion with no label. This beacon
 * is the GA4 hit only. Callers must not also push the same event through gtag.
 */
export function sendGa4Event(name: string, params: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const dispatch = () => {
    const { sid, sct } = gaSession();
    const query = new URLSearchParams({
      v: "2",
      tid: GA4_MEASUREMENT_ID,
      cid: gaClientId(),
      sid,
      sct,
      seg: "1",
      dl: window.location.href,
      dt: document.title.slice(0, 120),
      en: name,
      _ee: "1",
    });
    const clickId = gclidFromPage();
    if (clickId) query.set("gclid", clickId);
    if (params.currency != null) query.set("cu", String(params.currency));
    for (const [key, value] of Object.entries(params)) {
      if (key === "currency") continue;
      query.set(typeof value === "number" ? `epn.${key}` : `ep.${key}`, String(value));
    }
    const url = `${GA4_COLLECT}?${query.toString()}`;
    try {
      if (navigator.sendBeacon?.(url)) return;
    } catch {
      /* fall through to fetch */
    }
    fetch(url, { method: "POST", mode: "no-cors", keepalive: true }).catch(() => {});
  };

  if (readCookie("_ga")) {
    dispatch();
    return;
  }
  const started = Date.now();
  const timer = window.setInterval(() => {
    if (readCookie("_ga") || Date.now() - started > 1500) {
      window.clearInterval(timer);
      dispatch();
    }
  }, 50);
}
