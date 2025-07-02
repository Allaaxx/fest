
"use client";
import type React from "react";
import { AdminSidebar } from "@/components/admin/produtos/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-0 pt-16">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <Menu className="h-6 w-6" />
              </Button>
              {/* O título pode ser dinâmico por página se necessário */}
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </div>
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
