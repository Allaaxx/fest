"use client";
import { AdminOverviewContent } from "@/components/admin/dashboard/AdminOverviewContent";
import { ProductsManagement } from "@/components/admin/dashboard/products-management";
import { UsersManagement } from "@/components/admin/dashboard/users-management";
import { AdminAnalyticsContent } from "@/components/admin/dashboard/AdminAnalyticsContent";
import { SiteSettings } from "@/components/admin/dashboard/site-settings";
import { useState } from "react"
import { AdminSidebar } from "@/components/admin/dashboard/AdminSidebar"
import { CategoriesManagement } from "@/components/admin/dashboard/categories/categories-management"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

import type { TabType } from "@/types/admin-tabs";

interface Category {
  id?: string
  name: string
  description: string
  status: "active" | "inactive"
  productsCount?: number
  createdAt?: string
  image?: string
}

interface Product {
  id: string
  name: string
  description: string
  category: string
  type: "venda" | "locacao" | "servico" | ""
  price: number | string
  originalPrice?: number | string
  stock?: number | string
  status: "active" | "inactive" | "draft"
  sales: number
  views: number
  rating: number
  createdAt: string
  image: string
  images: File[]
  features: string[]
  vendor: {
    name: string
    id: string
  }
  availability?: boolean
  delivery?: boolean
  pickup?: boolean
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setActiveTab("categories-edit")
  }

  const handleAddCategory = () => {
    setEditingCategory(null)
    setActiveTab("categories-add")
  }

  const handleSaveCategory = (category: Category) => {
    console.log("Saving category:", category)
    setActiveTab("categories-list")
    setEditingCategory(null)
  }

  const handleCancelCategoryForm = () => {
    setActiveTab("categories-list")
    setEditingCategory(null)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    // Aqui você pode navegar para a página de edição de produto
    console.log("Edit product:", product)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    // Aqui você pode navegar para a página de criação de produto
    console.log("Add new product")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverviewContent />
      case "products":
      case "products-list":
        return <ProductsManagement />
      case "products-add": {
        const ProductPreviewPage = require("@/components/shared/product-preview-page").default;
        return (
          <ProductPreviewPage mode="add" />
        );
      }
      case "products-edit": {
        const ProductPreviewPage = require("@/components/shared/product-preview-page").default;
        return (
          <ProductPreviewPage mode="edit" initialProduct={editingProduct || undefined} />
        );
      }


      case "categories-list":
      case "categories-add":
      case "categories-edit":
        return <CategoriesManagement />
      case "users":
        return <UsersManagement />
      case "analytics":
        return <AdminAnalyticsContent />
      case "settings":
        return <SiteSettings />

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Página não encontrada</h2>
          </div>
        )
    }
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Visão Geral"
      case "users":
        return "Usuários"
      case "products":
        return "Produtos"
      case "analytics":
        return "Relatórios"
      case "categories-list":
        return "Categorias"
      case "categories-add":
        return "Nova Categoria"
      case "categories-edit":
        return "Editar Categoria"
      case "settings":
        return "Configurações"
      default:
        return "Dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

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
              <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6">{renderTabContent()}</main>
      </div>

    </div>
  )
}
