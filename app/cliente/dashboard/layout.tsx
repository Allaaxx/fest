import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Detecta a rota para destacar o item correto na sidebar
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  let activeTab: any = "overview";
  if (pathname.includes("/messages")) activeTab = "messages";
  else if (pathname.includes("/favorites")) activeTab = "favorites";
  else if (pathname.includes("/orders")) activeTab = "orders";
  else if (pathname.includes("/loyalty")) activeTab = "loyalty";
  else if (pathname.includes("/profile")) activeTab = "profile";

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={() => {}}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 p-4 lg:ml-64 mt-16 lg:mt-0">{/* Ajuste conforme seu header */}
        {children}
      </main>
    </div>
  );
}

// Este arquivo foi removido para evitar duplicidade de layouts (Navbar/Footer) na dashboard do vendedor.
