import { adminJson } from "../../../lib/admin-api";
import { AdminBookingsTable } from "../../../components/AdminBookingsTable";

type Booking = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "REFUNDED";
  amountPaid: number;
  currency: string;
  bookedAt: string;
  user: { name: string; email: string };
  service: {
    title: string;
    provider: { companyName: string };
  };
};

export default async function BookingsPage() {
  const bookings = await adminJson<Booking[]>("/api/v1/admin/bookings");

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <header>
        <h2 style={{ margin: 0, fontSize: 30 }}>Reservations</h2>
        <p style={{ marginTop: 6, color: "#6f7d89" }}>Pilotage et changement de statut.</p>
      </header>

      <AdminBookingsTable bookings={bookings} />
    </section>
  );
}
