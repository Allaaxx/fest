"use client";

import {
  Home,
  Users,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  X,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  List,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

type TabType =
  | "overview"
  | "users"
  | "products"
  | "orders"
  | "analytics"
  | "categories"
  | "categories-list"
  | "categories-add"
  | "categories-edit"
  | "settings";

interface AdminSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  submenu?: {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
  }[];
}

const menuItems: MenuItem[] = [
  { id: "overview", label: "Visão Geral", icon: Home },
  { id: "users", label: "Usuários", icon: Users },
  { id: "products", label: "Produtos", icon: Package },
  { id: "orders", label: "Pedidos", icon: ShoppingBag },
  { id: "analytics", label: "Relatórios", icon: BarChart3 },
  {
    id: "categories",
    label: "Categorias",
    icon: Package,
    submenu: [
      { id: "categories-list", label: "Listar Categorias", icon: List },
      { id: "categories-add", label: "Adicionar Categoria", icon: Plus },
      { id: "categories-edit", label: "Editar Categorias", icon: Edit },
    ],
  },
  { id: "settings", label: "Configurações", icon: Settings },
];

export function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
  // Estado inicial sempre igual entre SSR e client
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.submenu) {
      toggleSubmenu(item.id);
    } else {
      setActiveTab(item.id as TabType);
      setSidebarOpen(false);
    }
  };

  const handleSubmenuClick = (submenuId: string) => {
    setActiveTab(submenuId as TabType);
    setSidebarOpen(false);
  };

  const isSubmenuActive = (parentId: string) => {
    const parentItem = menuItems.find((item) => item.id === parentId);
    if (!parentItem?.submenu) return false;
    return parentItem.submenu.some((sub) => sub.id === activeTab);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 mt-16 lg:mt-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-6 px-3 overflow-y-auto h-full pb-20">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedMenus.includes(item.id);
          const isActive = activeTab === item.id || isSubmenuActive(item.id);

          return (
            <div key={item.id} className="mb-1">
              {/* Menu Principal */}
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center justify-between px-3 py-3 text-left rounded-lg transition-colors ${
                  isActive
                    ? "bg-red-50 text-red-600 border-r-2 border-red-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center">
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </div>
                {item.submenu && (
                  <div className="ml-auto">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && isExpanded && (
                <div className="ml-6 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-700">
                  {item.submenu.map((subItem) => {
                    const SubIcon = subItem.icon;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubmenuClick(subItem.id)}
                        className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-sm ${
                          activeTab === subItem.id
                            ? "bg-red-100 text-red-700 font-medium border-l-2 border-red-500"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                      >
                        <SubIcon className="h-4 w-4 mr-3" />
                        {subItem.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
