import { Menu } from "lucide-react";
import React from "react";

interface AdminHeaderProps {
  activeTabLabel: string;
  setSidebarOpen: (open: boolean) => void;
}

export function AdminHeader({
  activeTabLabel,
  setSidebarOpen,
}: AdminHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{activeTabLabel}</h1>
        </div>
      </div>
    </div>
  );
}
