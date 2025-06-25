"use client";

import { useState } from "react";
import {
  BarChart3,
  DollarSign,
  Home,
  Menu,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin/dashboard/AdminSidebar";
import { AdminHeader } from "@/components/admin/dashboard/AdminHeader";
import { AdminOverviewContent } from "@/components/admin/dashboard/AdminOverviewContent";
import { AdminUsersContent } from "@/components/admin/dashboard/AdminUsersContent";
import { AdminProductsContent } from "@/components/admin/dashboard/AdminProductsContent";
import { AdminOrdersContent } from "@/components/admin/dashboard/AdminOrdersContent";
import { AdminAnalyticsContent } from "@/components/admin/dashboard/AdminAnalyticsContent";
import { AdminSettingsContent } from "@/components/admin/dashboard/AdminSettingsContent";

type TabType =
  | "overview"
  | "users"
  | "products"
  | "orders"
  | "analytics"
  | "settings";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: Home },
    { id: "users", label: "Usuários", icon: Users },
    { id: "products", label: "Produtos", icon: Package },
    { id: "orders", label: "Pedidos", icon: ShoppingBag },
    { id: "analytics", label: "Relatórios", icon: BarChart3 },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverviewContent />;
      case "users":
        return <AdminUsersContent />;
      case "products":
        return <AdminProductsContent />;
      case "orders":
        return <AdminOrdersContent />;
      case "analytics":
        return <AdminAnalyticsContent />;
      case "settings":
        return <AdminSettingsContent />;
      default:
        return <AdminOverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex pt-16">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <AdminHeader
          activeTabLabel={
            menuItems.find((item) => item.id === activeTab)?.label || ""
          }
          setSidebarOpen={setSidebarOpen}
        />
        <main className="p-6">{renderContent()}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          style={{ top: "64px" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
