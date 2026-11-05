import DashboardShell from "@/components/DashboardShell";
import RequireAuth from "@/components/RequireAuth";

export default function PortalLayout({ children }) {
  return (
    <RequireAuth>
      <DashboardShell>{children}</DashboardShell>
    </RequireAuth>
  );
}
