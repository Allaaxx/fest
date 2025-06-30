"use client"

import { useState } from "react"
import { BarChart3, Home, Menu, Package, ShoppingBag, User, X } from "lucide-react"
import dynamic from "next/dynamic"
import OverviewTab from "@/components/vendedor/dashboard/OverviewTab"
import ProductsTab from "@/components/vendedor/dashboard/ProductsTab"
import OrdersTab from "@/components/vendedor/dashboard/OrdersTab"
import AnalyticsTab from "@/components/vendedor/dashboard/AnalyticsTab"
import ProfileTab from "@/components/vendedor/dashboard/ProfileTab"


type TabType = "overview" | "products" | "orders" | "analytics" | "profile"

export default function VendedorDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: Home },
    { id: "products", label: "Meus Produtos", icon: Package },
    { id: "orders", label: "Pedidos", icon: ShoppingBag },
    { id: "analytics", label: "Análises", icon: BarChart3 },
    { id: "profile", label: "Perfil da Loja", icon: User },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "products":
        return <ProductsTab />
      case "orders":
        return <OrdersTab />
      case "analytics":
        return <AnalyticsTab />
      case "profile":
        return <ProfileTab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex pt-16">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 mt-16 lg:mt-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Vendedor</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as TabType)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center px-3 py-3 mb-1 text-left rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700 mr-4">
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.find((item) => item.id === activeTab)?.label}
              </h1>
            </div>
          </div>
        </div>

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
  )
}
