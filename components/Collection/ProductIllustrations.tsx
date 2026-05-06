import type { IllustrationKey } from "@/sanity/types";

type ProductIllustrationProps = {
  type?: IllustrationKey;
};

const meshRows = [44, 56, 68, 80, 92];
const meshColumns = [62, 78, 94];
const compactRows = [50, 62, 74, 86];

export default function ProductIllustration({
  type = "chair1",
}: ProductIllustrationProps) {
  if (type === "chair2") {
    return (
      <svg viewBox="0 0 160 200" width="120" height="150" fill="none">
        <rect x="46" y="26" width="68" height="82" rx="6" fill="none" stroke="#0E5F55" strokeWidth="1.4" />
        {meshRows.map((y) => (
          <line key={y} x1="46" y1={y} x2="114" y2={y} stroke="#0E5F55" strokeWidth=".6" opacity=".4" />
        ))}
        {meshColumns.map((x) => (
          <line key={x} x1={x} y1="26" x2={x} y2="108" stroke="#0E5F55" strokeWidth=".6" opacity=".4" />
        ))}
        <rect x="38" y="100" width="84" height="20" rx="4" fill="#D9D3C5" stroke="#0E5F55" strokeWidth="1.4" />
        <line x1="80" y1="120" x2="80" y2="154" stroke="#6E6E68" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="80" cy="156" rx="34" ry="6.5" stroke="#6E6E68" strokeWidth="1.4" fill="none" />
        <line x1="46" y1="156" x2="36" y2="178" stroke="#6E6E68" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="114" y1="156" x2="124" y2="178" stroke="#6E6E68" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="60" y1="156" x2="50" y2="178" stroke="#6E6E68" strokeWidth="2" strokeLinecap="round" />
        <line x1="100" y1="156" x2="110" y2="178" stroke="#6E6E68" strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="156" x2="80" y2="178" stroke="#6E6E68" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "chair3") {
    return (
      <svg viewBox="0 0 160 200" width="120" height="150" fill="none">
        <rect x="42" y="44" width="76" height="62" rx="6" fill="#E5E0D4" stroke="#0E5F55" strokeWidth="1.4" />
        <rect x="36" y="96" width="88" height="18" rx="4" fill="#D9D3C5" stroke="#0E5F55" strokeWidth="1.4" />
        <path d="M44 114 L30 162 L18 162" stroke="#6E6E68" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M116 114 L130 162 L142 162" stroke="#6E6E68" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="30" y="72" width="10" height="32" rx="2" fill="#D9D3C5" stroke="#0E5F55" strokeWidth="1.2" />
        <rect x="120" y="72" width="10" height="32" rx="2" fill="#D9D3C5" stroke="#0E5F55" strokeWidth="1.2" />
      </svg>
    );
  }

  if (type === "chair4") {
    return (
      <svg viewBox="0 0 160 200" width="120" height="150" fill="none">
        <rect x="48" y="38" width="64" height="56" rx="4" fill="none" stroke="#0E5F55" strokeWidth="1.4" />
        {compactRows.map((y) => (
          <line key={y} x1="48" y1={y} x2="112" y2={y} stroke="#0E5F55" strokeWidth=".6" opacity=".4" />
        ))}
        <rect x="40" y="90" width="80" height="16" rx="3" fill="#D9D3C5" stroke="#0E5F55" strokeWidth="1.4" />
        <line x1="48" y1="106" x2="36" y2="156" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="112" y1="106" x2="124" y2="156" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="156" x2="24" y2="156" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="124" y1="156" x2="136" y2="156" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "stool") {
    return (
      <svg viewBox="0 0 160 200" width="120" height="150" fill="none">
        <ellipse cx="80" cy="50" rx="44" ry="18" fill="#E5E0D4" stroke="#0E5F55" strokeWidth="1.4" />
        <line x1="80" y1="68" x2="80" y2="148" stroke="#6E6E68" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="80" cy="150" rx="26" ry="6" stroke="#6E6E68" strokeWidth="1.4" fill="none" />
        <line x1="56" y1="150" x2="46" y2="180" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="104" y1="150" x2="114" y2="180" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="80" y1="150" x2="80" y2="180" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "bench") {
    return (
      <svg viewBox="0 0 160 200" width="120" height="150" fill="none">
        <rect x="16" y="66" width="128" height="50" rx="14" fill="#E5E0D4" stroke="#0E5F55" strokeWidth="1.4" />
        <rect x="16" y="46" width="128" height="26" rx="8" fill="#D9D3C5" stroke="#0E5F55" strokeWidth="1.4" />
        <line x1="32" y1="116" x2="32" y2="152" stroke="#6E6E68" strokeWidth="3" strokeLinecap="round" />
        <line x1="128" y1="116" x2="128" y2="152" stroke="#6E6E68" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="116" x2="80" y2="152" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 200" width="120" height="150" fill="none">
      <rect x="38" y="22" width="84" height="94" rx="8" fill="#E5E0D4" stroke="#0E5F55" strokeWidth="1.4" />
      <rect x="32" y="104" width="96" height="22" rx="5" fill="#D9D3C5" stroke="#0E5F55" strokeWidth="1.4" />
      <line x1="80" y1="126" x2="80" y2="158" stroke="#6E6E68" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="80" cy="160" rx="38" ry="8" stroke="#6E6E68" strokeWidth="1.4" fill="none" />
      <line x1="42" y1="160" x2="32" y2="184" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="118" y1="160" x2="128" y2="184" stroke="#6E6E68" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="56" y1="160" x2="46" y2="184" stroke="#6E6E68" strokeWidth="2" strokeLinecap="round" />
      <line x1="104" y1="160" x2="114" y2="184" stroke="#6E6E68" strokeWidth="2" strokeLinecap="round" />
      <line x1="80" y1="160" x2="80" y2="184" stroke="#6E6E68" strokeWidth="2" strokeLinecap="round" />
      <rect x="22" y="78" width="14" height="40" rx="4" fill="#D9D3C5" stroke="#0E5F55" strokeWidth="1.2" />
      <rect x="124" y="78" width="14" height="40" rx="4" fill="#D9D3C5" stroke="#0E5F55" strokeWidth="1.2" />
    </svg>
  );
}
