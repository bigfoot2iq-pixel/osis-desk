import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — OASIS Desk",
  description:
    "Mentions légales du site OASIS Desk : éditeur, hébergeur, directeur de la publication et coordonnées.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="wrap" style={{ paddingBlock: "6rem", maxWidth: "800px" }}>
      <p>
        <em>Dernière mise à jour : 6 mai 2026</em>
      </p>
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        Le site osisdesk.ma est édité par [Raison sociale], société de droit
        marocain, dont le siège social est situé à [Adresse], Agadir, Maroc.
      </p>
      <ul>
        <li>ICE : [ICE]</li>
        <li>RC : [RC]</li>
        <li>IF : [IF]</li>
        <li>Patente : [Patente]</li>
        <li>Téléphone : +212 624 828 155</li>
        <li>E-mail : contact@oasisdesk.ma</li>
      </ul>

      <h2>Directeur de la publication</h2>
      <p>
        Le directeur de la publication est [Nom du directeur de la
        publication], en qualité de représentant légal de [Raison sociale].
      </p>

      <h2>Hébergeur</h2>
      <p>
        Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina,
        CA 91723, États-Unis. Site web : vercel.com.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur le site (textes, images,
        photographies, logos, marques, mises en page) sont la propriété
        exclusive d&apos;OASIS Desk ou de ses partenaires. Toute reproduction,
        représentation ou diffusion, totale ou partielle, sans autorisation
        écrite préalable est interdite.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative aux présentes mentions légales, vous
        pouvez nous écrire à contact@oasisdesk.ma.
      </p>

      <p>
        <em>
          Ces informations sont des modèles à compléter par l&apos;éditeur du
          site avant mise en ligne définitive.
        </em>
      </p>
    </main>
  );
}
