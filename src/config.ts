const erpUrl = (import.meta.env.VITE_ERP_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export const ERP_URL = erpUrl || "#";
export const LOGIN_URL = erpUrl ? `${erpUrl}/customer/login` : "#";
export const trackingUrl = (trackingId: string) =>
  erpUrl ? `${erpUrl}/track?id=${encodeURIComponent(trackingId)}` : "#";

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "923000000000";
export const WHATSAPP_URL = `https://wa.me/${whatsappNumber}`;
