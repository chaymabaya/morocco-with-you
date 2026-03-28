"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@mwy.com");
  const [password, setPassword] = useState("Test1234!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        setError(data.message || "Connexion impossible");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Erreur reseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ padding: 24, display: "grid", gap: 12 }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>Connexion Admin</h1>
      <p style={{ margin: 0, color: "#6f7d89", fontSize: 14 }}>Utilise un compte avec role ADMIN.</p>

      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 13, color: "#6f7d89" }}>Email</span>
        <input className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 13, color: "#6f7d89" }}>Mot de passe</span>
        <input
          className="field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          href="/login/forgot-password"
          style={{ fontSize: 13, color: "#2563eb", textDecoration: "underline", cursor: "pointer" }}
        >
          Mot de passe oublié ?
        </Link>
      </div>

      {error ? <p style={{ color: "#b91c1c", margin: 0, fontSize: 14 }}>{error}</p> : null}

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
