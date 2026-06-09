"use client";

import { useState } from "react";

import { whatsappUrl } from "@/lib/contact";

type Mode = "particulier" | "entreprise";

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.06 24l1.69-6.16a11.87 11.87 0 01-1.6-5.95C.16 5.34 5.5 0 12.07 0a11.82 11.82 0 018.41 3.49 11.82 11.82 0 013.48 8.41c0 6.57-5.34 11.91-11.9 11.91a11.9 11.9 0 01-5.7-1.45L.06 24zm6.6-3.8c1.68.99 3.28 1.59 5.4 1.59 5.45 0 9.9-4.44 9.9-9.9 0-5.46-4.43-9.9-9.9-9.9-5.46 0-9.9 4.44-9.9 9.9 0 2.23.65 3.9 1.74 5.64l-.99 3.6 3.75-.98zM17.4 14.6c-.07-.12-.26-.2-.55-.34-.29-.15-1.7-.84-1.96-.94-.26-.1-.46-.14-.65.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.45.12-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.65-1.57-.89-2.15-.24-.56-.47-.48-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.51.07-.77.36-.26.29-1.01.99-1.01 2.41 0 1.42 1.03 2.79 1.18 2.98.14.19 2.04 3.11 4.94 4.36.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.7-.7 1.94-1.36.24-.67.24-1.24.17-1.36z" />
  </svg>
);

export default function QuoteForm({
  defaultProduct = "",
}: {
  defaultProduct?: string;
}) {
  const [mode, setMode] = useState<Mode>("particulier");
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [produit, setProduit] = useState(defaultProduct);
  const [qte, setQte] = useState("");
  const [msg, setMsg] = useState("");
  const [touched, setTouched] = useState(false);

  const telDigits = tel.replace(/\D/g, "");
  const telValid = telDigits.length >= 6;
  const nomValid = nom.trim().length > 1;
  const valid = nomValid && telValid;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (!valid) return;

    const lines = [
      "Bonjour OASIS Desk,",
      mode === "entreprise"
        ? "Demande de devis *entreprise / gros*."
        : "Demande de devis.",
      `Nom : ${nom.trim()}`,
      `Téléphone : ${tel.trim()}`,
      produit.trim() ? `Produit : ${produit.trim()}` : null,
      qte.trim() ? `Quantité : ${qte.trim()}` : null,
      msg.trim() ? `Message : ${msg.trim()}` : null,
    ].filter(Boolean) as string[];

    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
  };

  return (
    <form className="qf" onSubmit={submit} noValidate>
      <div className="qf-modes" role="tablist" aria-label="Type de demande">
        {(["particulier", "entreprise"] as Mode[]).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            className={`qf-mode${mode === value ? " on" : ""}`}
            onClick={() => setMode(value)}
          >
            {value === "particulier" ? "Particulier" : "Entreprise · Gros"}
          </button>
        ))}
      </div>

      <p className="qf-hint">
        {mode === "entreprise"
          ? "Tarifs dégressifs dès 5 unités. Devis volume sous 24 h."
          : "Réponse sous 24 h, sans engagement."}
      </p>

      <label className="qf-field">
        <span className="qf-label">Nom *</span>
        <input
          className="qf-input"
          type="text"
          name="nom"
          autoComplete="name"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Votre nom"
        />
      </label>

      <label className="qf-field">
        <span className="qf-label">Téléphone *</span>
        <input
          className="qf-input"
          type="tel"
          name="tel"
          autoComplete="tel"
          inputMode="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          placeholder="06 12 34 56 78"
        />
      </label>

      <div className="qf-row">
        <label className="qf-field qf-grow">
          <span className="qf-label">Produit</span>
          <input
            className="qf-input"
            type="text"
            name="produit"
            value={produit}
            onChange={(e) => setProduit(e.target.value)}
            placeholder="Ex. Fauteuil de direction"
          />
        </label>
        <label className="qf-field qf-qte">
          <span className="qf-label">Quantité</span>
          <input
            className="qf-input"
            type="number"
            name="qte"
            min={1}
            value={qte}
            onChange={(e) => setQte(e.target.value)}
            placeholder="1"
          />
        </label>
      </div>

      {mode === "entreprise" ? (
        <label className="qf-field">
          <span className="qf-label">Message (optionnel)</span>
          <textarea
            className="qf-input qf-textarea"
            name="msg"
            rows={2}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Besoin, délai, lieu de livraison…"
          />
        </label>
      ) : null}

      {touched && !valid ? (
        <p className="qf-err" role="alert">
          Renseignez votre nom et un numéro de téléphone valide.
        </p>
      ) : null}

      <button type="submit" className="btn qf-submit">
        <WaIcon />
        Envoyer sur WhatsApp
      </button>
      <p className="qf-note">
        Ouvre WhatsApp avec votre demande déjà pré-remplie.
      </p>
    </form>
  );
}
