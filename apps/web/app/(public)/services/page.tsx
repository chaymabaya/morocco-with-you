import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";

interface Service {
  id: string;
  title: string;
  type: string;
  price: number;
  currency: string;
  provider: { companyName: string; slug: string };
  metadata?: {
    images?: string[];
    r2Images?: string[];
  } | null;
}

interface ServicesResponse {
  data: Service[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function getServices(search?: string, type?: string, page = 1): Promise<ServicesResponse | null> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (type) params.set("type", type);
  params.set("page", String(page));
  params.set("limit", "12");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
  try {
    const res = await fetch(`${apiUrl}/api/v1/services?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function buildHref(
  current: { search?: string; type?: string },
  next: { search?: string; type?: string; page?: number }
) {
  const params = new URLSearchParams();
  const search = next.search ?? current.search;
  const type = next.type ?? current.type;

  if (search) params.set("search", search);
  if (type) params.set("type", type);
  if (next.page && next.page > 1) params.set("page", String(next.page));

  const qs = params.toString();
  return qs ? `/services?${qs}` : "/services";
}

type ServicesPageProps = {
  searchParams?: Promise<{ search?: string; type?: string; page?: string }>;
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = (await searchParams) ?? {};
  const currentPage = params.page ? parseInt(params.page, 10) : 1;

  const data = await getServices(params.search, params.type, currentPage);

  const types = ["Restaurant", "Activite", "Hebergement"];

  if (!data) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">Decouvrez le Maroc</h1>
        <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
          <p className="text-lg font-semibold text-orange-800">Serveur temporairement indisponible</p>
          <p className="mt-1 text-sm text-orange-700">L&apos;API n&apos;est pas accessible. Veuillez demarrer le serveur backend ou reessayer plus tard.</p>
          <a href="/" className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Retour a l&apos;accueil</a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Decouvrez le Maroc</h1>
      <p className="mb-6 text-sm text-muted-foreground">{data.meta.total} experiences disponibles</p>

      <Suspense fallback={<div className="mb-6 h-10 rounded-xl border bg-card" />}>
        <div className="mb-6">
          <SearchBar initialValue={params.search || ""} />
        </div>
      </Suspense>

      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          href={buildHref(params, { type: undefined, page: 1 })}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            !params.type ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"
          }`}
        >
          Tous
        </Link>
        {types.map((t) => (
          <Link
            key={t}
            href={buildHref(params, { type: t, page: 1 })}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              params.type === t ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" id="catalog">
        {data.data.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>

      <div className="mt-10 flex justify-center gap-4">
        {data.meta.page > 1 && (
          <Link
            href={buildHref(params, { page: data.meta.page - 1 })}
            className="rounded-md border px-4 py-2 hover:bg-muted"
          >
            Precedent
          </Link>
        )}
        {data.meta.page < data.meta.totalPages && (
          <Link
            href={buildHref(params, { page: data.meta.page + 1 })}
            className="rounded-md border px-4 py-2 hover:bg-muted"
          >
            Suivant
          </Link>
        )}
      </div>
    </main>
  );
}
