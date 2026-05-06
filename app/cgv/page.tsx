import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente — OASIS Desk",
  description:
    "Conditions générales de vente d'OASIS Desk : produits, prix, commande, livraison, garanties et droit applicable au Maroc.",
};

export default function CgvPage() {
  return (
    <main className="wrap" style={{ paddingBlock: "6rem", maxWidth: "800px" }}>
      <p>
        <em>Dernière mise à jour : 6 mai 2026</em>
      </p>
      <h1>Conditions générales de vente</h1>

      <p>
        Les présentes conditions générales de vente régissent les relations
        contractuelles entre [Raison sociale] (ICE [ICE], RC [RC], siège
        social [Adresse]), ci-après « le Vendeur », et toute personne physique
        ou morale, ci-après « le Client », souhaitant acquérir des produits
        proposés par OASIS Desk. Elles sont conformes à la loi n° 31-08
        édictant des mesures de protection du consommateur.
      </p>

      <h2>Produits</h2>
      <p>
        OASIS Desk commercialise des chaises de bureau, fauteuils, bureaux et
        rangements pour entreprises et particuliers. Les caractéristiques
        essentielles des produits sont présentées sur le site. Les
        photographies ont une valeur indicative.
      </p>

      <h2>Prix</h2>
      <p>
        Les prix sont indiqués en dirhams marocains (MAD), toutes taxes
        comprises, hors frais de livraison. Le Vendeur se réserve la
        possibilité de modifier ses prix à tout moment ; les produits seront
        toutefois facturés sur la base du tarif en vigueur lors de la
        validation de la commande.
      </p>

      <h2>Commande</h2>
      <p>
        Les commandes sont passées par téléphone, e-mail ou via le formulaire
        de devis. Toute commande est ferme après confirmation écrite du
        Vendeur et, le cas échéant, versement d&apos;un acompte.
      </p>

      <h2>Livraison</h2>
      <p>
        La livraison est assurée à Agadir et dans tout le Maroc selon les
        modalités convenues lors de la commande. Les délais sont communiqués
        à titre indicatif.
      </p>

      <h2>Garanties</h2>
      <p>
        Les produits bénéficient de la garantie légale de conformité ainsi
        que, le cas échéant, de la garantie commerciale du fabricant. Les
        durées et conditions sont précisées par référence.
      </p>

      <h2>Droit de rétractation et retour</h2>
      <p>
        Conformément à la loi 31-08, le Client consommateur dispose d&apos;un
        droit de rétractation de sept (7) jours à compter de la réception du
        produit, dans les conditions prévues par la loi. Les produits doivent
        être retournés neufs, dans leur emballage d&apos;origine.
      </p>

      <h2>Droit applicable et règlement des litiges</h2>
      <p>
        Les présentes CGV sont soumises au droit marocain. À défaut de
        règlement amiable, tout litige sera porté devant les tribunaux
        compétents d&apos;Agadir.
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
