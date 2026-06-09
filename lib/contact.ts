// Central contact + showroom info. Showroom values are placeholders — swap for
// the real address/hours when provided.

export const WHATSAPP_NUMBER = "212624828155";
export const PHONE = "+212624828155";
export const PHONE_DISPLAY = "+212 624 828 155";
export const EMAIL = "contact@oasisdesk.ma";

export const SHOWROOM = {
  city: "Agadir",
  // TODO: provisional address — replace with the real showroom address.
  address: "Av. Hassan II, Talborjt, 80000 Agadir (adresse provisoire)",
  hours: "Lun – Sam · 9 h – 19 h",
  mapsEmbed: "https://maps.google.com/maps?q=Agadir%20Maroc&z=13&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Agadir%20Maroc",
};

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
