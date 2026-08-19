export const RUANGSI_WHATSAPP_NUMBER = "62895609250509";
export const RUANGSI_INSTAGRAM_URL = "https://www.instagram.com/jago.jokitugas/";

export function buildWhatsAppUrl(context: string): string {
  const message = `Halo RuangSI, saya ingin konsultasi tentang ${context}. Saya menemukan RuangSI dari website.`;
  return `https://wa.me/${RUANGSI_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
