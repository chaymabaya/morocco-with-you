import Link from "next/link";

type SuccessPageProps = {
  searchParams?: Promise<{ bookingId?: string }>;
};

export default async function BookingSuccessPage({ searchParams }: SuccessPageProps) {
  const params = (await searchParams) ?? {};

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <section className="rounded-2xl border bg-card p-6 text-center">
        <h1 className="mb-2 text-3xl font-bold text-green-700">Paiement reussi</h1>
        <p className="mb-4 text-muted-foreground">Votre reservation a ete enregistree. La confirmation finale arrive via webhook Stripe.</p>
        {params.bookingId && <p className="mb-6 text-sm text-muted-foreground">Booking ID: {params.bookingId}</p>}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/services" className="rounded-lg border px-4 py-2 hover:bg-muted">
            Retour au catalogue
          </Link>
          <Link href="/dashboard" className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
            Aller au dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
