import Image from "next/image";

type LogoProps = {
  className?: string;
};

// Brand mark: side-profile office chair tucked into an open desk frame, drawn
// in `currentColor` so it recolors per context (teal in the nav, white on the
// dark footer). Paired with the OASIS / DESK wordmark.
export default function Logo({ className }: LogoProps) {
  return (
    <span className={`logo-lockup${className ? ` ${className}` : ""}`}>
      <Image
        className="logo-img"
        src="/icon.png"
        alt="osis logo"
        width={72}
        height={72}
        priority
      />
    </span>
  );
}
