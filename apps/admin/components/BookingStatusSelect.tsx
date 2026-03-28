"use client";

import { useState } from "react";

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "REFUNDED"] as const;

type BookingStatus = (typeof STATUSES)[number];

export function BookingStatusSelect({ id, status }: { id: string; status: BookingStatus }) {
  const [value, setValue] = useState<BookingStatus>(status);
  const [saving, setSaving] = useState(false);

  async function save(nextStatus: BookingStatus) {
    setSaving(true);
    setValue(nextStatus);

    await fetch(`/api/admin/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    setSaving(false);
    window.location.reload();
  }

  return (
    <select
      className="field"
      value={value}
      disabled={saving}
      onChange={(e) => save(e.target.value as BookingStatus)}
      style={{ minWidth: 140 }}
    >
      {STATUSES.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
