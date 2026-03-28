import { adminJson } from "../../../lib/admin-api";

type Overview = {
  metrics: {
    services: number;
    bookings: number;
    commissionsAmount: number;
  };
  recentBookings: Array<{
    id: string;
    status: string;
    amountPaid: number;
    bookedAt: string;
    user: { name: string; email: string };
    service: { title: string; provider: { companyName: string } };
  }>;
};

export default async function DashboardPage() {
  const data = await adminJson<Overview>("/api/v1/admin/overview");

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <header>
        <h2 style={{ margin: 0, fontSize: 30 }}>Dashboard Admin</h2>
        <p style={{ marginTop: 6, color: "#6f7d89" }}>Vue globale de l'activite commerciale.</p>
      </header>

      <div className="grid-4">
        <article className="card" style={{ padding: 16 }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", color: "#6f7d89" }}>Services</p>
          <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 700 }}>{data.metrics.services}</p>
        </article>
        <article className="card" style={{ padding: 16 }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", color: "#6f7d89" }}>Reservations</p>
          <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 700 }}>{data.metrics.bookings}</p>
        </article>
        <article className="card" style={{ padding: 16 }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", color: "#6f7d89" }}>Commissions</p>
          <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 700 }}>{data.metrics.commissionsAmount.toFixed(2)} MAD</p>
        </article>
        <article className="card" style={{ padding: 16 }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", color: "#6f7d89" }}>Taux moyen</p>
          <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 700 }}>10%</p>
        </article>
      </div>

      <article className="card" style={{ padding: 14 }}>
        <h3 style={{ marginTop: 0 }}>Dernieres reservations</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Client</th>
              <th>Provider</th>
              <th>Montant</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.recentBookings.map((row) => (
              <tr key={row.id}>
                <td>{row.service.title}</td>
                <td>{row.user.name || row.user.email}</td>
                <td>{row.service.provider.companyName}</td>
                <td>{row.amountPaid} MAD</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
