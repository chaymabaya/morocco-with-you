import { adminJson } from "../../../lib/admin-api";
import { ProviderCreateForm } from "../../../components/ProviderCreateForm";
import { ProviderRowActions } from "../../../components/ProviderRowActions";

type ProviderRow = {
  id: string;
  companyName: string;
  commissionRate: number;
  status: string;
  serviceType?: string | null;
  user: { name: string; email: string; phone?: string | null };
};

export default async function ProvidersPage() {
  const providers = await adminJson<ProviderRow[]>("/api/v1/admin/providers");

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <header>
        <h2 style={{ margin: 0, fontSize: 30 }}>Gestion des prestataires</h2>
        <p style={{ marginTop: 6, color: "#6f7d89" }}>{providers.length} prestataires inscrits</p>
      </header>

      <ProviderCreateForm />

      <article className="card" style={{ padding: 14 }}>
        <h3 style={{ marginTop: 0 }}>Liste des prestataires</h3>
        <div style={{ display: "grid", gap: 10 }}>
          {providers.map((p) => (
            <div key={p.id} className="card" style={{ padding: 10 }}>
              <ProviderRowActions
                id={p.id}
                name={p.companyName}
                email={p.user.email}
                phone={p.user.phone}
                serviceType={p.serviceType}
                status={p.status}
                commissionRate={p.commissionRate}
              />
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
