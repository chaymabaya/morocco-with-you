"use client";

import { useState } from "react";

type Props = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  serviceType?: string | null;
  status: string;
  commissionRate: number;
};

export function ProviderRowActions(props: Props) {
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone || "");
  const [serviceType, setServiceType] = useState(props.serviceType || "");
  const [status, setStatus] = useState(props.status);
  const [commissionRate, setCommissionRate] = useState(String(props.commissionRate));
  const [saving, setSaving] = useState(false);

  async function update() {
    setSaving(true);
    await fetch(`/api/admin/providers/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, serviceType, status, commissionRate: Number(commissionRate) }),
    });
    setSaving(false);
    window.location.reload();
  }

  async function remove() {
    if (!confirm("Supprimer definitivement ce prestataire ?")) return;
    setSaving(true);
    await fetch(`/api/admin/providers/${props.id}`, { method: "DELETE" });
    setSaving(false);
    window.location.reload();
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.1fr 1fr 1fr 0.7fr auto", gap: 8, alignItems: "center" }}>
      <input className="field" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="field" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className="field" value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
      <div style={{ display: "flex", gap: 6 }}>
        <select className="field" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="pending">En attente</option>
          <option value="suspended">Suspendue</option>
        </select>
        <input
          className="field"
          type="number"
          min="0"
          max="100"
          value={commissionRate}
          onChange={(e) => setCommissionRate(e.target.value)}
          style={{ width: 80 }}
        />
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <button className="btn" onClick={update} disabled={saving}>
          Mettre a jour
        </button>
        <button className="btn btn-danger" onClick={remove} disabled={saving}>
          Supprimer
        </button>
      </div>
    </div>
  );
}
