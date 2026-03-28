import { AdminLoginForm } from "../../components/AdminLoginForm";

export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <AdminLoginForm />
      </div>
    </main>
  );
}
