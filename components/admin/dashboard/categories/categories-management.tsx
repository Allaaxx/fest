"use client";

import { useState } from "react";
import { CategoriesList } from "./categories-list";
import { CategoryForm } from "./category-form";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export interface Category {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  productsCount: number;
  createdAt: string;
  image?: string;
}

export function CategoriesManagement() {
  // Mock inicial, em produção viria de API
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Decoração",
      description: "Itens decorativos para festas e eventos",
      status: "active",
      productsCount: 45,
      createdAt: "2024-01-15",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Som e Iluminação",
      description: "Equipamentos de áudio e iluminação profissional",
      status: "active",
      productsCount: 23,
      createdAt: "2024-01-10",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Mobiliário",
      description: "Mesas, cadeiras e móveis para eventos",
      status: "inactive",
      productsCount: 67,
      createdAt: "2024-01-08",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Buffet",
      description: "Serviços de alimentação e bebidas",
      status: "active",
      productsCount: 12,
      createdAt: "2024-01-05",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]);

  const [formState, setFormState] = useState<{
    open: boolean;
    editing?: boolean;
    category?: Category;
  }>({ open: false });

  // Handlers agrupados
  const handlers = {
    onAdd: () => setFormState({ open: true, editing: false }),
    onEdit: (category: Category) =>
      setFormState({ open: true, editing: true, category }),
    onCancel: () => setFormState({ open: false }),
    onSave: (cat: Partial<Category>) => {
      if (formState.editing && cat.id) {
        setCategories((prev) =>
          prev.map((c) => (c.id === cat.id ? { ...c, ...cat } : c))
        );
      } else {
        setCategories((prev) => [
          ...prev,
          {
            ...cat,
            id: String(Date.now()),
            createdAt: new Date().toISOString(),
            productsCount: 0,
          } as Category,
        ]);
      }
      setFormState({ open: false });
    },
    setSearchTerm: (value: string) => setSearchTerm(value),
    setStatusFilter: (value: "all" | "active" | "inactive") => setStatusFilter(value),
    onDelete: (id: string) => setCategories((prev) => prev.filter((c) => c.id !== id)),
  };

  // Filtros e busca
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Estatísticas
  const total = categories.length;
  const active = categories.filter((c) => c.status === "active").length;
  const totalProducts = categories.reduce(
    (acc, c) => acc + (c.productsCount || 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Painel de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Categorias
              </p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Categorias Ativas
              </p>
              <p className="text-2xl font-bold text-gray-900">{active}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Produtos
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalProducts}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Filtros e Busca */}
      {!formState.open && (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    placeholder="Buscar categorias..."
                    value={searchTerm}
                    onChange={(e) => handlers.setSearchTerm(e.target.value)}
                    className="pl-10 border rounded h-10 w-full"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-w-[120px]">
                      <Filter className="h-4 w-4 mr-2" />
                      {statusFilter === "all" ? "Todos" : statusFilter === "active" ? "Ativo" : "Inativo"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handlers.setStatusFilter("all")}>Todos</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlers.setStatusFilter("active")}>Ativo</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlers.setStatusFilter("inactive")}>Inativo</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
          <CategoriesList
            categories={filteredCategories}
            onEdit={handlers.onEdit}
            onDelete={handlers.onDelete}
          />
        </>
      )}

      {/* Formulário de categoria */}
      {formState.open && (
        <CategoryForm
          category={formState.category}
          isEditing={formState.editing}
          onSave={handlers.onSave}
          onCancel={handlers.onCancel}
        />
      )}
    </div>
  );
}
