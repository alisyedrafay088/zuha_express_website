const erpUrl = ((import.meta.env.VITE_ERP_URL as string | undefined) || "https://www.zuhaexpress.com").replace(/\/$/, "");

export const ERP_URL = erpUrl;
export const LOGIN_URL = `${erpUrl}/customer/login`;
export const RIDER_LOGIN_URL = `${erpUrl}/rider/login`;
export const TRACK_URL = `${erpUrl}/track`;
export const trackingUrl = (trackingId: string) => `${TRACK_URL}?id=${encodeURIComponent(trackingId)}`;

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) || "923343174541";
export const WHATSAPP_URL = `https://wa.me/${whatsappNumber}`;
export const PHONE_URL = `tel:+${whatsappNumber}`;
/** Local format for display, e.g. 0334 3174541 */
export const PHONE_DISPLAY = `0${whatsappNumber.slice(2, 5)} ${whatsappNumber.slice(5)}`;
