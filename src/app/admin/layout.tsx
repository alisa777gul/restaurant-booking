import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#090909] text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}