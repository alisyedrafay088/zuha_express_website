const erpUrl = ((import.meta.env.VITE_ERP_URL as string | undefined) || "https://www.zuhaexpress.com").replace(/\/$/, "");

export const ERP_URL = erpUrl;
export const LOGIN_URL = `${erpUrl}/customer/login`;
export const TRACK_URL = `${erpUrl}/track`;
export const trackingUrl = (trackingId: string) => `${TRACK_URL}?id=${encodeURIComponent(trackingId)}`;

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "923000000000";
export const WHATSAPP_URL = `https://wa.me/${whatsappNumber}`;
