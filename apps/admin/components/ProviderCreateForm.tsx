"use client";

import { FormEvent, useState } from "react";

export function ProviderCreateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/admin/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, serviceType }),
    });

    const data = (await response.json().catch(() => ({}))) as { message?: string; tempPassword?: string };

    if (!response.ok) {
      setMessage(data.message || "Creation impossible");
      setLoading(false);
      return;
    }

    setName("");
    setEmail("");
    setPhone("");
    setServiceType("");
    setMessage(
      data.tempPassword
        ? `Prestataire cree. Mot de passe temporaire: ${data.tempPassword}`
        : "Prestataire cree avec succes",
    );
    setLoading(false);
    window.location.reload();
  }

  return (
    <form className="card" style={{ padding: 14, display: "grid", gap: 10 }} onSubmit={submit}>
      <h3 style={{ margin: 0 }}>Ajouter un prestataire</h3>
      <input
        className="field"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom / Raison sociale"
        required
      />
      <input
        className="field"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className="field"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telephone"
      />
      <input
        className="field"
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        placeholder="Type de service (ex: Hebergement, Restaurant)"
      />

      {message ? <p style={{ margin: 0, color: "#6f7d89", fontSize: 13 }}>{message}</p> : null}

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Creation..." : "Creer"}
      </button>
    </form>
  );
}
