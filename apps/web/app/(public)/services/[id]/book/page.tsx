import Link from "next/link";
import BookingCheckout from "@/components/BookingCheckout";

type BookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href={`/services/${id}`} className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground">
        {"<- Retour au service"}
      </Link>

      <section className="rounded-2xl border bg-card p-6">
        <h1 className="mb-2 text-2xl font-bold">Finaliser votre reservation</h1>
        <p className="mb-6 text-sm text-muted-foreground">Paiement securise via Stripe Elements.</p>

        <BookingCheckout serviceId={id} />
      </section>
    </main>
  );
}
