"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <form onSubmit={onSubmit} className="card" style={{ padding: 24, display: "grid", gap: 12 }}>
          <h1 style={{ fontSize: 24, margin: 0 }}>Mot de passe oublié</h1>
          <p style={{ margin: 0, color: "#6f7d89", fontSize: 14 }}>
            Saisis ton email et, si un compte existe, tu recevras les instructions pour r&eacute;initialiser ton mot de passe.
          </p>

          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 13, color: "#6f7d89" }}>Email</span>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {submitted ? (
            <p style={{ color: "#15803d", margin: 0, fontSize: 14 }}>
              Si un compte existe avec cet email, un lien de r&eacute;initialisation a &eacute;t&eacute; envoy&eacute;.
            </p>
          ) : null}

          <button className="btn btn-primary" type="submit" disabled={submitted}>
            Envoyer le lien
          </button>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
            <Link href="/login" style={{ fontSize: 13, color: "#6f7d89" }}>
              Retour &agrave; la connexion
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
