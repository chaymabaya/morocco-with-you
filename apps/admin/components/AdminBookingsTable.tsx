"use client";

import { useMemo, useState } from "react";
import { BookingStatusSelect } from "./BookingStatusSelect";

type Booking = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "REFUNDED";
  amountPaid: number;
  currency: string;
  bookedAt: string;
  user: { name: string; email: string };
  service: { title: string; provider: { companyName: string } };
};

const PAGE_SIZE = 10;

export function AdminBookingsTable({ bookings }: { bookings: Booking[] }) {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return statusFilter === "ALL" ? bookings : bookings.filter((b) => b.status === statusFilter);
  }, [bookings, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleChangeStatusFilter(next: string) {
    setStatusFilter(next);
    setPage(1);
  }

  function exportCsv() {
    if (!filtered.length) return;
    const header = ["BookingId", "Service", "Provider", "Client", "Amount", "Currency", "Status", "BookedAt"];
    const rows = filtered.map((b) => [
      b.id,
      b.service.title,
      b.service.provider.companyName,
      b.user.name || b.user.email,
      String(b.amountPaid),
      b.currency,
      b.status,
      new Date(b.bookedAt).toISOString(),
    ]);

    const csv = [header, ...rows]
      .map((cols) =>
        cols
          .map((value) => {
            const v = value.replace(/"/g, '""');
            return `"${v}"`;
          })
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bookings-export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <article className="card" style={{ padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { value: "ALL", label: "Tous" },
            { value: "PENDING", label: "En attente" },
            { value: "CONFIRMED", label: "Confirmes" },
            { value: "CANCELLED", label: "Annules" },
            { value: "REFUNDED", label: "Rembourses" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleChangeStatusFilter(opt.value)}
              className="btn"
              style={{
                padding: "6px 10px",
                fontSize: 13,
                background: statusFilter === opt.value ? "var(--brand)" : "#fff",
                color: statusFilter === opt.value ? "#fff" : "inherit",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button type="button" className="btn" onClick={exportCsv}>
          Export CSV
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Provider</th>
            <th>Client</th>
            <th>Montant</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {current.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.service.title}</td>
              <td>{booking.service.provider.companyName}</td>
              <td>{booking.user.name || booking.user.email}</td>
              <td>
                {booking.amountPaid} {booking.currency}
              </td>
              <td>{new Date(booking.bookedAt).toLocaleString("fr-FR")}</td>
              <td>
                <BookingStatusSelect id={booking.id} status={booking.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#6f7d89" }}>
          Page {page} / {pageCount} — {filtered.length} reservations
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" type="button" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Prec.
          </button>
          <button
            className="btn"
            type="button"
            disabled={page >= pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          >
            Suiv.
          </button>
        </div>
      </div>
    </article>
  );
}
