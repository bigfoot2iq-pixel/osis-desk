// Central contact + showroom info. Showroom values are placeholders — swap for
// the real address/hours when provided.

export const WHATSAPP_NUMBER = "212624828155";
export const PHONE = "+212624828155";
export const PHONE_DISPLAY = "+212 624 828 155";
export const EMAIL = "Oasis.desk25@gmail.com";

// Single source of truth for opening hours so the showroom + footer never
// contradict each other.
export const HOURS = "Lun – Sam · 9 h – 19 h";

export const SHOWROOM = {
  city: "Agadir",
  address: "Rue Al Khawarezmi, Quartier El Massira, Agadir",
  hours: HOURS,
  mapsEmbed:
    "https://maps.google.com/maps?q=Rue%20Al%20Khawarezmi%20Quartier%20El%20Massira%20Agadir%20Maroc&z=15&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Rue%20Al%20Khawarezmi%20Quartier%20El%20Massira%20Agadir%20Maroc",
};

export const SOCIALS = {
  instagram: "https://www.instagram.com/oasis_desk",
  facebook: "https://www.facebook.com/share/188mTxvh4C/",
  tiktok: "https://www.tiktok.com/@oasis.desk",
};

export const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram", href: SOCIALS.instagram },
  { key: "facebook", label: "Facebook", href: SOCIALS.facebook },
  { key: "tiktok", label: "TikTok", href: SOCIALS.tiktok },
];

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
