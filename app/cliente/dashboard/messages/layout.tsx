"use client";

import React from "react";
import Sidebar from "../components/Sidebar";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  // Força o destaque do menu em "messages"
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeTab="messages"
        setActiveTab={() => {}}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 p-4 lg:ml-64 mt-16 lg:mt-0">
        {children}
      </main>
    </div>
  );
}
