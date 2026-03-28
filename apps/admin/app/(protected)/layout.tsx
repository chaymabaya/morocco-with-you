import { ensureAdminAccess } from "../../lib/admin-api";
import { AdminFrame } from "../../components/AdminFrame";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await ensureAdminAccess();
  return <AdminFrame>{children}</AdminFrame>;
}
