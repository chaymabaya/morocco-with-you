import Link from "next/link";
import { cookies } from "next/headers";

type Booking = {
  id: string;
  status: string;
  amountPaid: number;
  currency: string;
  bookedAt: string;
  service: {
    title: string;
    type: string;
    provider: { companyName: string };
  };
};

async function getMyBookings(): Promise<{ data: Booking[]; error?: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return { data: [], error: "Vous devez vous connecter." };
  }

  const res = await fetch(`${apiUrl}/api/v1/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return { data: [], error: "Impossible de charger le dashboard." };
  }

  const data = (await res.json()) as Booking[];
  return { data };
}

function statusStyle(status: string) {
  const normalized = status.toUpperCase();
  if (normalized === "CONFIRMED") return "bg-green-100 text-green-700";
  if (normalized === "PENDING") return "bg-amber-100 text-amber-700";
  if (normalized === "CANCELLED") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
}

export default async function DashboardPage() {
  const { data, error } = await getMyBookings();
  const recent = data.slice(0, 5);

  const totalBookings = data.length;
  const confirmed = data.filter((b) => b.status.toUpperCase() === "CONFIRMED").length;
  const pending = data.filter((b) => b.status.toUpperCase() === "PENDING").length;
  const totalSpent = data.reduce((sum, b) => sum + b.amountPaid, 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Vue rapide de votre activite.</p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button type="submit" className="rounded-lg border px-3 py-2 text-sm hover:bg-muted">
            Se deconnecter
          </button>
        </form>
      </div>

      {error ? (
        <div className="rounded-xl border bg-white p-4">
          <p className="mb-3 text-sm text-red-600">{error}</p>
          <Link href="/login" className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">
            Aller a la connexion
          </Link>
        </div>
      ) : (
        <>
          <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Reservations</p>
              <p className="mt-2 text-2xl font-bold">{totalBookings}</p>
            </article>
            <article className="rounded-xl border bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Confirmees</p>
              <p className="mt-2 text-2xl font-bold text-green-700">{confirmed}</p>
            </article>
            <article className="rounded-xl border bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">En attente</p>
              <p className="mt-2 text-2xl font-bold text-amber-700">{pending}</p>
            </article>
            <article className="rounded-xl border bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Total depense</p>
              <p className="mt-2 text-2xl font-bold">{totalSpent.toFixed(2)} MAD</p>
            </article>
          </section>

          <section className="rounded-xl border bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="font-semibold">Dernieres reservations</h2>
              <Link href="/bookings" className="text-sm text-green-700 hover:underline">
                Voir tout
              </Link>
            </div>

            {recent.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune reservation pour le moment.</p>
            ) : (
              <div className="grid gap-3">
                {recent.map((booking) => (
                  <article key={booking.id} className="rounded-lg border p-3">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-medium">{booking.service.title}</h3>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {booking.service.provider.companyName} • {booking.service.type}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {booking.amountPaid} {booking.currency}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link href="/services" className="rounded-lg border px-4 py-2 text-center hover:bg-muted">
              Explorer services
            </Link>
            <Link href="/bookings" className="rounded-lg border px-4 py-2 text-center hover:bg-muted">
              Mes bookings
            </Link>
            <Link href="/account" className="rounded-lg border px-4 py-2 text-center hover:bg-muted">
              Mon compte
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
