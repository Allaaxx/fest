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
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { TabType } from "@/types/admin-tabs";


interface AdminSidebarProps {
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
  {
    id: "products",
    label: "Produtos",
    icon: Package,
    submenu: [
      { id: "products-list", label: "Listar Produtos", icon: List },
      { id: "products-add", label: "Adicionar Produto", icon: Plus },
      { id: "products-edit", label: "Editar Produto", icon: Edit },
    ],
  },
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

export function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const pathname = usePathname();

  // Mapeamento de ids para rotas
  const routeMap: Record<string, string> = {
    overview: "/admin/dashboard/overview",
    users: "/admin/dashboard/users",
    products: "/admin/dashboard/products",
    "products-list": "/admin/dashboard/products",
    "products-add": "/admin/dashboard/products/add",
    "products-edit": "/admin/dashboard/products/edit",
    analytics: "/admin/dashboard/analytics",
    categories: "/admin/dashboard/categories",
    "categories-list": "/admin/dashboard/categories",
    "categories-add": "/admin/dashboard/categories/add",
    "categories-edit": "/admin/dashboard/categories/edit",
    settings: "/admin/dashboard/settings",
  };

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (id: string) => {
    const route = routeMap[id];
    if (!route) return false;
    return pathname === route || pathname.startsWith(route + "/");
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
          const hasSubmenu = !!item.submenu;
          return (
            <div key={item.id} className="mb-1">
              {/* Menu Principal */}
              {hasSubmenu ? (
                <button
                  onClick={() => toggleSubmenu(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 text-left rounded-lg transition-colors ${
                    isActive(item.id)
                      ? "bg-red-50 text-red-600 border-r-2 border-red-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </div>
                  <div className="ml-auto">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </button>
              ) : (
                <Link
                  href={routeMap[item.id]}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
                    isActive(item.id)
                      ? "bg-red-50 text-red-600 border-r-2 border-red-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </div>
                </Link>
              )}

              {/* Submenu */}
              {item.submenu && isExpanded && (
                <div className="ml-6 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-700">
                  {item.submenu.map((subItem) => {
                    const SubIcon = subItem.icon;
                    return (
                      <Link
                        key={subItem.id}
                        href={routeMap[subItem.id]}
                        className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors text-sm ${
                          isActive(subItem.id)
                            ? "bg-red-100 text-red-700 font-medium border-l-2 border-red-500"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <SubIcon className="h-4 w-4 mr-3" />
                        {subItem.label}
                      </Link>
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
