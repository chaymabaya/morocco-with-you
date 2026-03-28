interface Service {
  id: string;
  title: string;
  type: string;
  price: number;
  currency: string;
  provider: { companyName: string };
  metadata?: {
    images?: string[];
    r2Images?: string[];
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

function getCardImage(service: Service) {
  const rawImages = [
    ...(service.metadata?.r2Images || []),
    ...(service.metadata?.images || []),
  ];

  const firstImage = rawImages.map(normalizeR2Image).find(Boolean);
  if (firstImage) return firstImage;

  const isDarZitoun = service.provider.companyName.toLowerCase().includes("dar zitoun");
  if (isDarZitoun) {
    return process.env.NEXT_PUBLIC_DAR_ZITOUN_IMAGE_URL || "/images/dar-zitoun.jpg";
  }

  return "";
}

function toCssImageUrl(url: string) {
  // Encode spaces and special characters in filenames used in CSS background-image.
  return `url("${encodeURI(url)}")`;
}

export default function ServiceCard({ service }: { service: Service }) {
  const typeColors: Record<string, string> = {
    Restaurant: "bg-orange-100 text-orange-700",
    Activite: "bg-blue-100 text-blue-700",
    Hebergement: "bg-green-100 text-green-700",
  };

  const cardImage = getCardImage(service);

  return (
    <div className="rounded-xl border p-5 transition hover:shadow-md bg-white">
      <div
        className="mb-4 h-32 rounded-lg border bg-gradient-to-br from-orange-200/60 via-amber-100 to-emerald-200/60"
        style={
          cardImage
            ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12)), ${toCssImageUrl(cardImage)}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      />

      <div className="mb-3 flex items-start justify-between">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            typeColors[service.type] || "bg-gray-100 text-gray-600"
          }`}
        >
          {service.type}
        </span>
        <span className="text-lg font-bold text-green-700">
          {service.price} {service.currency}
        </span>
      </div>

      <h3 className="mb-1 line-clamp-2 font-semibold text-gray-900">{service.title}</h3>
      <p className="mb-4 text-sm text-gray-500">{service.provider.companyName}</p>

      <a
        href={`/services/${service.id}`}
        className="block w-full rounded-lg bg-green-600 py-2 text-center text-sm font-medium text-white transition hover:bg-green-700"
      >
        Voir et reserver
      </a>
    </div>
  );
}
