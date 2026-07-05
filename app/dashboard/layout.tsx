import Sidebar from "../components/Sidebar";

// 1. This handles dashboard layout layout internally
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}

// 2. Export this wrapper function so tasks and team pages can wrap themselves instantly
export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}