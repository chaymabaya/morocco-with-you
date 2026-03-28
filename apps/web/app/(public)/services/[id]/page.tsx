import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceGallery from "@/components/ServiceGallery";

interface ServiceDetail {
  id: string;
  title: string;
  type: string;
  price: number;
  currency: string;
  provider: { companyName: string };
  metadata?: {
    images?: string[];
    r2Images?: string[];
    bedrooms?: number;
    bathrooms?: number;
    amenities?: string[];
    capacity?: string;
    description?: string;
    menu?: Array<{ name: string; price: number; description: string }>;
    cuisine?: string;
    averageRating?: number;
  } | null;
}

function normalizeR2Image(keyOrUrl: string) {
  if (!keyOrUrl) return "";
  if (/^https?:\/\//i.test(keyOrUrl)) return keyOrUrl;

  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";
  if (!base) return keyOrUrl;

  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanKey = keyOrUrl.startsWith("/") ? keyOrUrl.slice(1) : keyOrUrl;
  return `${cleanBase}/${cleanKey}`;
}

function getDefaultServiceImage(service: ServiceDetail) {
  const isDarZitoun = service.provider.companyName.toLowerCase().includes("dar zitoun");
  if (!isDarZitoun) return "";
  return process.env.NEXT_PUBLIC_DAR_ZITOUN_IMAGE_URL || "/images/dar-zitoun.jpg";
}

async function getService(id: string): Promise<ServiceDetail | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
  try {
    const res = await fetch(`${apiUrl}/api/v1/services/${id}`, { cache: "no-store" });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

type ServiceDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    notFound();
  }

  const rawImages = [
    ...(service.metadata?.r2Images || []),
    ...(service.metadata?.images || []),
  ];
  const normalizedImages = rawImages.map(normalizeR2Image).filter(Boolean);
  const fallbackImage = getDefaultServiceImage(service);
  const galleryImages = Array.from(new Set([...(fallbackImage ? [fallbackImage] : []), ...normalizedImages]));

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/services" className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground">
        {"<- Retour au catalogue"}
      </Link>

      <article className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <ServiceGallery images={galleryImages} title={service.title} />
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            {service.type}
          </span>
          <p className="text-2xl font-bold text-green-700">
            {service.price} {service.currency}
          </p>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-gray-900">{service.title}</h1>
        <p className="mb-8 text-sm text-gray-500">Prestataire: {service.provider.companyName}</p>

        {/* ACCOMMODATION DETAILS */}
        {service.type === "Hébergement" && service.metadata && (
          <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Caractéristiques du logement</h2>

            {service.metadata.description && (
              <p className="mb-4 text-gray-700">{service.metadata.description}</p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {service.metadata.bedrooms && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <span className="text-lg">🛏️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chambres</p>
                    <p className="font-semibold text-gray-900">{service.metadata.bedrooms}</p>
                  </div>
                </div>
              )}

              {service.metadata.bathrooms && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <span className="text-lg">🚿</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Salles de bain</p>
                    <p className="font-semibold text-gray-900">{service.metadata.bathrooms}</p>
                  </div>
                </div>
              )}

              {service.metadata.capacity && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <span className="text-lg">👥</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Capacité</p>
                    <p className="font-semibold text-gray-900">{service.metadata.capacity}</p>
                  </div>
                </div>
              )}
            </div>

            {service.metadata.amenities && service.metadata.amenities.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 font-semibold text-gray-900">Équipements</p>
                <div className="flex flex-wrap gap-2">
                  {service.metadata.amenities.map((amenity) => (
                    <span key={amenity} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      ✓ {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* RESTAURANT MENU */}
        {service.type === "Restaurant" && service.metadata && (
          <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Menu</h2>

            <div className="mb-4 flex flex-wrap items-center gap-4">
              {service.metadata.cuisine && (
                <div>
                  <p className="text-sm text-gray-600">Cuisine</p>
                  <p className="font-semibold text-gray-900">{service.metadata.cuisine}</p>
                </div>
              )}
              {service.metadata.averageRating && (
                <div>
                  <p className="text-sm text-gray-600">Évaluation</p>
                  <p className="font-semibold text-gray-900">⭐ {service.metadata.averageRating}</p>
                </div>
              )}
              {service.metadata.capacity && (
                <div>
                  <p className="text-sm text-gray-600">Capacité</p>
                  <p className="font-semibold text-gray-900">{service.metadata.capacity}</p>
                </div>
              )}
            </div>

            {service.metadata.menu && service.metadata.menu.length > 0 && (
              <div className="space-y-3">
                {service.metadata.menu.map((item) => (
                  <div key={item.name} className="flex items-start justify-between rounded-lg bg-white p-3">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <p className="ml-4 whitespace-nowrap font-semibold text-green-700">{item.price} MAD</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Link
          href={`/services/${service.id}/book`}
          className="block w-full rounded-lg bg-green-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Reserver
        </Link>
      </article>
    </main>
  );
}
