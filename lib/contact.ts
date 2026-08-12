// Central contact + showroom info. Showroom values are placeholders — swap for
// the real address/hours when provided.

export const WHATSAPP_NUMBER = "212624828155";
export const PHONE = "+212624828155";
export const PHONE_DISPLAY = "+212 624 828 155";
export const EMAIL = "contact@oasisdeskmaroc.com";

// Single source of truth for opening hours so the showroom + footer never
// contradict each other.
export const HOURS = "Lun – Sam · 9 h – 19 h";

export const SHOWROOM = {
  city: "Agadir",
  // TODO: replace with the real showroom street address before launch.
  address: "Av. Hassan II, Talborjt, 80000 Agadir",
  hours: HOURS,
  mapsEmbed: "https://maps.google.com/maps?q=Agadir%20Maroc&z=13&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Agadir%20Maroc",
};

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
