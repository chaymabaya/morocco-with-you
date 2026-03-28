import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

async function getMyBookings(): Promise<{ data: Booking[]; error?: string; needsAuth?: boolean }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return { data: [], needsAuth: true };
  }

  try {
    const res = await fetch(`${apiUrl}/api/v1/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return { data: [], error: "Impossible de charger vos reservations." };
    }

    const data = (await res.json()) as Booking[];
    return { data };
  } catch {
    return { data: [], error: "Le serveur est temporairement indisponible. Reessayez plus tard." };
  }
}

export default async function BookingsPage() {
  const { data, error, needsAuth } = await getMyBookings();

  if (needsAuth) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Mes reservations</h1>
      <p className="mb-6 text-sm text-muted-foreground">Suivez vos bookings et leur statut en temps reel.</p>

      {error ? (
        <div className="rounded-xl border bg-white p-4">
          <p className="mb-3 text-sm text-red-600">{error}</p>
          <Link href="/login" className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">
            Aller a la connexion
          </Link>
        </div>
      ) : data.length === 0 ? (
        <div className="rounded-xl border bg-white p-4 text-sm text-muted-foreground">
          Aucune reservation pour le moment.
        </div>
      ) : (
        <div className="grid gap-4">
          {data.map((booking) => (
            <article key={booking.id} className="rounded-xl border bg-white p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold">{booking.service.title}</h2>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">{booking.status}</span>
              </div>
              <p className="text-sm text-muted-foreground">{booking.service.provider.companyName} • {booking.service.type}</p>
              <p className="mt-2 text-sm font-medium">{booking.amountPaid} {booking.currency}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
