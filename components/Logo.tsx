type LogoProps = {
  className?: string;
};

// Brand mark: side-profile office chair tucked into an open desk frame, drawn
// in `currentColor` so it recolors per context (teal in the nav, white on the
// dark footer). Paired with the OASIS / DESK wordmark.
export default function Logo({ className }: LogoProps) {
  return (
    <span className={`logo-lockup${className ? ` ${className}` : ""}`}>
      <svg
        className="logo-glyph"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <g
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M24 14C18 15 17 24 20 31" />
          <path d="M19 32H37" />
          <path d="M22 33L18 50" />
          <path d="M34 33L37 50" />
          <path d="M41 22H53V50H41" />
        </g>
      </svg>
      <span className="logo-word">
        <strong>OASIS</strong>
        <span>DESK</span>
      </span>
    </span>
  );
}
