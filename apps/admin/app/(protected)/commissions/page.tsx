import { adminJson } from "../../../lib/admin-api";
import { AdminCommissionsDashboard } from "../../../components/AdminCommissionsDashboard";

type CommissionRow = {
  id: string;
  amount: number;
  rate: number;
  period: string;
  paidStatus: string;
  provider: { companyName: string; slug: string };
  booking: {
    id: string;
    amountPaid: number;
    status: string;
    service: { title: string };
  };
};

type CommissionsResponse = {
  data: CommissionRow[];
  summary: { totalAmount: number };
};

export default async function CommissionsPage() {
  const response = await adminJson<CommissionsResponse>("/api/v1/admin/commissions");

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <header>
        <h2 style={{ margin: 0, fontSize: 30 }}>Commissions</h2>
        <p style={{ marginTop: 6, color: "#6f7d89" }}>Total cumule: {response.summary.totalAmount.toFixed(2)} MAD</p>
      </header>

      <AdminCommissionsDashboard rows={response.data} />
    </section>
  );
}
