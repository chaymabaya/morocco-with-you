"use client";

import { useMemo, useState } from "react";

type CommissionRow = {
  id: string;
  amount: number;
  rate: number;
  period: string;
  paidStatus: string;
  provider: { companyName: string; slug: string };
  booking: { id: string; amountPaid: number; status: string; service: { title: string } };
};

export function AdminCommissionsDashboard({ rows }: { rows: CommissionRow[] }) {
  const [periodFilter, setPeriodFilter] = useState<string>("ALL");

  const periods = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => set.add(r.period));
    return Array.from(set).sort().reverse();
  }, [rows]);

  const filtered = useMemo(() => {
    return periodFilter === "ALL" ? rows : rows.filter((r) => r.period === periodFilter);
  }, [rows, periodFilter]);

  const perProvider = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((r) => {
      const key = r.provider.companyName;
      map.set(key, (map.get(key) || 0) + r.amount);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  const totalFiltered = filtered.reduce((sum, r) => sum + r.amount, 0);

  return (
    <>
      <div className="card" style={{ padding: 14, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", color: "#6f7d89", letterSpacing: "0.08em" }}>
              Commissions filtrees
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 700 }}>{totalFiltered.toFixed(2)} MAD</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#6f7d89" }}>Periode</span>
            <select
              className="field"
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              style={{ width: 180 }}
            >
              <option value="ALL">Toutes les periodes</option>
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
          {perProvider.map(([name, total]) => (
            <div
              key={name}
              className="card"
              style={{ padding: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>{name}</span>
              <span style={{ fontSize: 14 }}>{total.toFixed(2)} MAD</span>
            </div>
          ))}
          {perProvider.length === 0 && (
            <p style={{ margin: 0, fontSize: 13, color: "#6f7d89" }}>Aucune commission pour cette periode.</p>
          )}
        </div>
      </div>

      <article className="card" style={{ padding: 14 }}>
        <h3 style={{ marginTop: 0 }}>Detail des commissions</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Service</th>
              <th>Booking</th>
              <th>Taux</th>
              <th>Montant</th>
              <th>Periode</th>
              <th>Paiement</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td>{row.provider.companyName}</td>
                <td>{row.booking.service.title}</td>
                <td>{row.booking.id.slice(0, 8)}</td>
                <td>{row.rate}%</td>
                <td>{row.amount.toFixed(2)} MAD</td>
                <td>{row.period}</td>
                <td>{row.paidStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}
