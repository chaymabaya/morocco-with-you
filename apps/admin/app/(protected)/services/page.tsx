import { adminJson } from "../../../lib/admin-api";
import { ServiceCreateForm } from "../../../components/ServiceCreateForm";
import { ServiceRowActions } from "../../../components/ServiceRowActions";

type ServiceRow = {
  id: string;
  title: string;
  type: string;
  price: number;
  currency: string;
  isActive: boolean;
  provider: { companyName: string; slug: string };
};

type ServicesResponse = {
  data: ServiceRow[];
  meta: { total: number };
};

export default async function ServicesPage() {
  const response = await adminJson<ServicesResponse>("/api/v1/admin/services?limit=50");

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <header>
        <h2 style={{ margin: 0, fontSize: 30 }}>Gestion des services</h2>
        <p style={{ marginTop: 6, color: "#6f7d89" }}>{response.meta.total} services trouves</p>
      </header>

      <ServiceCreateForm />

      <article className="card" style={{ padding: 14 }}>
        <h3 style={{ marginTop: 0 }}>Catalogue</h3>
        <div style={{ display: "grid", gap: 10 }}>
          {response.data.map((service) => (
            <div key={service.id} className="card" style={{ padding: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                <strong>{service.provider.companyName}</strong>
                <span style={{ color: service.isActive ? "#0f766e" : "#b91c1c", fontSize: 13 }}>
                  {service.isActive ? "Actif" : "Inactif"}
                </span>
              </div>
              <ServiceRowActions
                id={service.id}
                title={service.title}
                type={service.type}
                price={service.price}
                currency={service.currency}
                isActive={service.isActive}
              />
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
