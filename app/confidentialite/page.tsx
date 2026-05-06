import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — OASIS Desk",
  description:
    "Politique de confidentialité d'OASIS Desk : données collectées, finalités, durée de conservation et droits CNDP au titre de la loi 09-08.",
};

export default function ConfidentialitePage() {
  return (
    <main className="wrap" style={{ paddingBlock: "6rem", maxWidth: "800px" }}>
      <p>
        <em>Dernière mise à jour : 6 mai 2026</em>
      </p>
      <h1>Politique de confidentialité</h1>

      <p>
        OASIS Desk, édité par [Raison sociale] (ICE [ICE], RC [RC]), accorde
        une attention particulière à la protection des données personnelles de
        ses visiteurs et clients, conformément à la loi n° 09-08 relative à la
        protection des personnes physiques à l&apos;égard du traitement des
        données à caractère personnel.
      </p>

      <h2>Données collectées</h2>
      <p>
        Nous collectons les données que vous nous transmettez volontairement
        via les formulaires de contact ou de demande de devis : nom, prénom,
        société, adresse e-mail, numéro de téléphone, ville et message. Des
        données techniques (adresse IP, type de navigateur, pages consultées)
        peuvent être collectées automatiquement à des fins statistiques.
      </p>

      <h2>Finalités</h2>
      <p>
        Les données sont utilisées pour répondre à vos demandes, établir des
        devis, assurer le suivi commercial et améliorer la qualité du site.
        Elles ne font l&apos;objet d&apos;aucune cession à des tiers à des
        fins commerciales.
      </p>

      <h2>Base légale</h2>
      <p>
        Le traitement repose sur votre consentement et sur l&apos;exécution de
        mesures précontractuelles ou contractuelles à votre demande.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données prospects sont conservées pendant 3 ans à compter du
        dernier contact. Les données clients sont conservées pendant la durée
        de la relation commerciale, augmentée des délais légaux de
        prescription.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément à la loi 09-08, vous disposez d&apos;un droit
        d&apos;accès, de rectification, d&apos;opposition et de suppression
        sur vos données. Vous pouvez les exercer en écrivant à
        contact@oasisdesk.ma. Vous pouvez également saisir la Commission
        Nationale de contrôle de la protection des Données à caractère
        Personnel (CNDP) à tout moment.
      </p>

      <h2>Délégué à la protection des données</h2>
      <p>
        Pour toute question relative au traitement de vos données, contactez
        notre délégué à : contact@oasisdesk.ma.
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
