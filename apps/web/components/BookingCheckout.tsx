"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

type BookingCheckoutProps = {
  serviceId: string;
};

type BookingApiResponse = {
  booking: { id: string };
  clientSecret: string;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

function CheckoutForm({
  clientSecret,
  bookingId,
  serviceId,
}: {
  clientSecret: string;
  bookingId: string;
  serviceId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  async function handlePay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setError(null);
    setIsPaying(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Carte indisponible");
      setIsPaying(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    setIsPaying(false);

    if (result.error) {
      setError(result.error.message || "Paiement echoue");
      return;
    }

    router.push(`/services/${serviceId}/book/success?bookingId=${bookingId}`);
  }

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <div className="rounded-lg border bg-white p-3">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || isPaying}
        className="w-full rounded-lg bg-green-600 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {isPaying ? "Paiement en cours..." : "Payer maintenant"}
      </button>
    </form>
  );
}

export default function BookingCheckout({ serviceId }: BookingCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);

  const stripeReady = useMemo(() => !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, []);

  async function preparePayment() {
    setError(null);
    setIsPreparing(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId }),
    });

    const data = (await res.json().catch(() => ({}))) as Partial<BookingApiResponse> & { message?: string };
    setIsPreparing(false);

    if (!res.ok || !data.clientSecret || !data.booking?.id) {
      setError(data.message || "Impossible de preparer le paiement.");
      return;
    }

    setClientSecret(data.clientSecret);
    setBookingId(data.booking.id);
  }

  if (!stripeReady) {
    return <p className="text-sm text-red-600">Stripe non configure. Verifie NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.</p>;
  }

  return (
    <div className="space-y-4">
      {!clientSecret || !bookingId ? (
        <>
          <p className="text-sm text-muted-foreground">Cliquez pour creer la reservation et obtenir le formulaire de carte.</p>
          <button
            type="button"
            onClick={preparePayment}
            disabled={isPreparing}
            className="w-full rounded-lg bg-green-600 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {isPreparing ? "Preparation..." : "Continuer vers le paiement"}
          </button>
          {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</p>}
        </>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} bookingId={bookingId} serviceId={serviceId} />
        </Elements>
      )}
    </div>
  );
}
