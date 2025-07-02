
"use client";
import { AdminOverviewContent } from "@/components/admin/dashboard/AdminOverviewContent";
import { ProductsManagement } from "@/components/admin/dashboard/products-management";
import { UsersManagement } from "@/components/admin/dashboard/users-management";
import { AdminAnalyticsContent } from "@/components/admin/dashboard/AdminAnalyticsContent";
import { SiteSettings } from "@/components/admin/dashboard/AdminSettingsContent";

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/dashboard/AdminSidebar"
import { CategoriesList } from "@/components/admin/dashboard/categories/categories-list"
import { CategoryForm } from "@/components/admin/dashboard/categories/category-form"

// O ProductsTab está definido neste próprio arquivo, não precisa importar
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Package, ShoppingBag, TrendingUp, Menu } from "lucide-react"

type TabType =
  | "overview"
  | "users"
  | "products"
  | "analytics"
  | "categories"
  | "categories-list"
  | "categories-add"
  | "categories-edit"
  | "settings"

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
  type: "venda" | "locacao" | "servico"
  price: number
  originalPrice?: number
  stock?: number
  status: "active" | "inactive" | "draft"
  sales: number
  views: number
  rating: number
  createdAt: string
  image: string
  vendor: {
    name: string
    id: string
  }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

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
        // Use seu componente de overview
        return <AdminOverviewContent />
      case "products":
        return <ProductsManagement />
      case "categories-list":
        return <CategoriesList onEdit={handleEditCategory} onAdd={handleAddCategory} />
      case "categories-add":
        return <CategoryForm onSave={handleSaveCategory} onCancel={handleCancelCategoryForm} isEditing={false} />
      case "categories-edit":
        return (
          <CategoryForm
            category={editingCategory || undefined}
            onSave={handleSaveCategory}
            onCancel={handleCancelCategoryForm}
            isEditing={true}
          />
        )
      case "users":
        return <UsersManagement />
      case "analytics":
        return <AdminAnalyticsContent />
      case "settings":
        return <SiteSettings />
      case "categories-list":
        return <CategoriesList onEdit={handleEditCategory} onAdd={handleAddCategory} />

      case "categories-add":
        return <CategoryForm onSave={handleSaveCategory} onCancel={handleCancelCategoryForm} isEditing={false} />

      case "categories-edit":
        return (
          <CategoryForm
            category={editingCategory || undefined}
            onSave={handleSaveCategory}
            onCancel={handleCancelCategoryForm}
            isEditing={true}
          />
        )

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
