"use client";

import { FormEvent, useState } from "react";

export function ServiceCreateForm() {
  const [providerId, setProviderId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Riad");
  const [price, setPrice] = useState("0");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providerId,
        title,
        type,
        price: Number(price),
        currency: "MAD",
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      setMessage(data.message || "Creation impossible");
      setLoading(false);
      return;
    }

    setProviderId("");
    setTitle("");
    setPrice("0");
    setMessage("Service cree avec succes");
    setLoading(false);
    window.location.reload();
  }

  return (
    <form className="card" style={{ padding: 14, display: "grid", gap: 10 }} onSubmit={submit}>
      <h3 style={{ margin: 0 }}>Ajouter un service</h3>
      <input
        className="field"
        value={providerId}
        onChange={(e) => setProviderId(e.target.value)}
        placeholder="Provider ID"
        required
      />
      <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required />
      <input className="field" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" required />
      <input
        className="field"
        type="number"
        min="0"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Prix"
        required
      />

      {message ? <p style={{ margin: 0, color: "#6f7d89", fontSize: 13 }}>{message}</p> : null}

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Creation..." : "Creer"}
      </button>
    </form>
  );
}
