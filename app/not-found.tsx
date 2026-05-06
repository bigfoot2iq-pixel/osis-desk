import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable — OASIS Desk",
};

export default function NotFound() {
  return (
    <main className="wrap" style={{ paddingBlock: "8rem", textAlign: "center", maxWidth: "640px" }}>
      <h1 className="h2">Page introuvable</h1>
      <p>La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
      <a href="/" className="btn btn-primary">
        Retour à l&apos;accueil ↗
      </a>
    </main>
  );
}
