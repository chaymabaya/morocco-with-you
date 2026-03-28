import Link from "next/link";
import { cookies } from "next/headers";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/providers", label: "Prestataires" },
  { href: "/services", label: "Services" },
  { href: "/bookings", label: "Reservations" },
  { href: "/commissions", label: "Commissions" },
];

export async function AdminFrame({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const userName = cookieStore.get("user_name")?.value || "Admin";

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.08em", color: "#6f7d89", textTransform: "uppercase" }}>
            Morocco With You
          </p>
          <h1 style={{ fontSize: 24, marginTop: 4 }}>Back Office</h1>
          <p style={{ marginTop: 8, color: "#6f7d89", fontSize: 14 }}>Connecte: {userName}</p>
        </div>

        <nav style={{ display: "grid", gap: 8 }}>
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card"
              style={{ padding: "10px 12px", fontWeight: 600, fontSize: 14 }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form action="/api/auth/logout" method="post" style={{ marginTop: 18 }}>
          <button className="btn btn-danger" type="submit" style={{ width: "100%" }}>
            Deconnexion
          </button>
        </form>
      </aside>
      <main className="admin-content">{children}</main>
    </div>
  );
}
