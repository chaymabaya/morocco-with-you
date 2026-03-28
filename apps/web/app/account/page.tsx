import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const userName = cookieStore.get("user_name")?.value;

  if (!userName) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <section className="rounded-2xl border bg-card p-6">
        <h1 className="mb-2 text-3xl font-bold">Mon compte</h1>
        <p className="mb-6 text-muted-foreground">Connecte en tant que <span className="font-medium text-foreground">{userName}</span>.</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/bookings" className="rounded-lg border px-4 py-2 text-center hover:bg-muted">
            Voir mes reservations
          </Link>
          <Link href="/dashboard" className="rounded-lg border px-4 py-2 text-center hover:bg-muted">
            Ouvrir dashboard
          </Link>
        </div>

        <form action="/api/auth/logout" method="post" className="mt-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-2.5 font-medium text-white hover:bg-red-700"
          >
            Se deconnecter
          </button>
        </form>
      </section>
    </main>
  );
}
