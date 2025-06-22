"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Overview from "./components/Overview"
import Orders from "./components/Orders"
import Favorites from "./components/Favorites"
import Loyalty from "./components/Loyalty"
import Profile from "./components/Profile"
import { Menu } from "lucide-react"

export default function ClienteDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "favorites" | "loyalty" | "profile"
  >("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />
      case "orders":
        return <Orders />
      case "favorites":
        return <Favorites />
      case "loyalty":
        return <Loyalty />
      case "profile":
        return <Profile />
      default:
        return <Overview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex pt-16">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {(() => {
                  switch (activeTab) {
                    case "overview":
                      return "Visão Geral"
                    case "orders":
                      return "Meus Pedidos"
                    case "favorites":
                      return "Favoritos"
                    case "loyalty":
                      return "Pontos de Fidelidade"
                    case "profile":
                      return "Meu Perfil"
                    default:
                      return "Visão Geral"
                  }
                })()}
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
