"use client";

import { useState } from "react";

type Props = {
  id: string;
  title: string;
  type: string;
  price: number;
  currency: string;
  isActive: boolean;
};

export function ServiceRowActions(props: Props) {
  const [title, setTitle] = useState(props.title);
  const [type, setType] = useState(props.type);
  const [price, setPrice] = useState(String(props.price));
  const [saving, setSaving] = useState(false);

  async function update() {
    setSaving(true);
    await fetch(`/api/admin/services/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, type, price: Number(price), currency: props.currency }),
    });
    setSaving(false);
    window.location.reload();
  }

  async function disable() {
    setSaving(true);
    await fetch(`/api/admin/services/${props.id}`, { method: "DELETE" });
    setSaving(false);
    window.location.reload();
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr auto auto", gap: 8 }}>
      <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="field" value={type} onChange={(e) => setType(e.target.value)} />
      <input className="field" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button className="btn" onClick={update} disabled={saving}>
        Modifier
      </button>
      <button className="btn btn-danger" onClick={disable} disabled={saving || !props.isActive}>
        {props.isActive ? "Desactiver" : "Inactif"}
      </button>
    </div>
  );
}
