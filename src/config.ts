const erpUrl = ((import.meta.env.VITE_ERP_URL as string | undefined) || "https://www.zuhaexpress.com").replace(/\/$/, "");

export const ERP_URL = erpUrl;
/** Public address of this marketing site (the ERP keeps the main www domain). */
export const WEBSITE_URL = ((import.meta.env.VITE_WEBSITE_URL as string | undefined) || "https://ship.zuhaexpress.com").replace(/\/$/, "");
/** "https://www.zuhaexpress.com" -> "www.zuhaexpress.com" for showing on screen. */
export const displayUrl = (url: string) => url.replace(/^https?:\/\//, "");
export const LOGIN_URL = `${erpUrl}/customer/login`;
export const RIDER_LOGIN_URL = `${erpUrl}/rider/login`;
export const ADMIN_LOGIN_URL = `${erpUrl}/login`;
export const TRACK_URL = `${erpUrl}/track`;
export const trackingUrl = (trackingId: string) => `${TRACK_URL}?id=${encodeURIComponent(trackingId)}`;

/** Shown in the footer; switch to a business address (e.g. info@zuhaexpress.com) once that mailbox exists. */
export const CONTACT_EMAIL = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || "zuhaexpress92@gmail.com";

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) || "923343174541";
export const WHATSAPP_URL = `https://wa.me/${whatsappNumber}`;
export const PHONE_URL = `tel:+${whatsappNumber}`;
/** Local format for display, e.g. 0334 3174541 */
export const PHONE_DISPLAY = `0${whatsappNumber.slice(2, 5)} ${whatsappNumber.slice(5)}`;
