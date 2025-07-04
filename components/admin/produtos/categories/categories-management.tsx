"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CategoriesList } from "./categories-list";
import { CategoryForm } from "./category-form";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export interface Category {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  productsCount: number;
  createdAt: string;
  image?: string;
}

interface CategoriesManagementProps {
  mode: "list" | "add" | "edit";
  category?: Category;
  onEditCategory?: (category: Category) => void;
  onAddCategory?: () => void;
  onSaveCategory?: (category: Category) => void;
  onCancel?: () => void;
}

export function CategoriesManagement({
  mode,
  category,
  onEditCategory,
  onAddCategory,
  onSaveCategory,
  onCancel,
}: CategoriesManagementProps) {
  // Busca categorias reais da API
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    fetch("/api/categorias")
      .then((res) => res.json())
      .then((data) => {
        // Adapta para o formato esperado pelo componente
        setCategories(
          data.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            description: cat.description || "",
            status: cat.status || "active",
            productsCount: cat.products?.length || 0,
            createdAt: cat.createdAt ? new Date(cat.createdAt).toISOString().slice(0, 10) : "",
            image: "/placeholder.svg?height=40&width=40",
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao buscar categorias");
        toast.error("Erro ao buscar categorias");
        setLoading(false);
      });
  }, []);

  // Handlers agrupados (apenas para uso interno, se necessário)
  const handlers = {
    setSearchTerm: (value: string) => setSearchTerm(value),
    setStatusFilter: (value: "all" | "active" | "inactive") =>
      setStatusFilter(value),
    onDelete: async (id: string) => {
      // Remove da API e do estado local
      try {
        await fetch(`/api/categorias/${id}`, { method: "DELETE" });
        setCategories((prev) => prev.filter((c) => c.id !== id));
        toast.success("Categoria excluída com sucesso!");
      } catch {
        // fallback: só remove localmente
        setCategories((prev) => prev.filter((c) => c.id !== id));
        toast.success("Categoria excluída localmente.");
      }
    },
  };

  // Filtros e busca
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || category.status === statusFilter;
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
      {loading && (
        <div className="text-center text-gray-500">Carregando categorias...</div>
      )}
      {error && (
        <div className="text-center text-red-600">{error}</div>
      )}
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
      {mode === "list" && (
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
                      {statusFilter === "all"
                        ? "Todos"
                        : statusFilter === "active"
                          ? "Ativo"
                          : "Inativo"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handlers.setStatusFilter("all")}
                    >
                      Todos
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handlers.setStatusFilter("active")}
                    >
                      Ativo
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handlers.setStatusFilter("inactive")}
                    >
                      Inativo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {onAddCategory && (
                  <Button
                    onClick={onAddCategory}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Nova Categoria
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          {filteredCategories.length === 0 && !loading && !error ? (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Nenhuma categoria encontrada
                </h3>
                <p className="text-gray-500 mb-4">
                  Cadastre a primeira categoria para começar a organizar seus produtos.
                </p>
                {onAddCategory && (
                  <Button
                    onClick={onAddCategory}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Nova Categoria
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <CategoriesList
              categories={filteredCategories}
              onEdit={onEditCategory ?? (() => {})}
              onDelete={handlers.onDelete}
            />
          )}
        </>
      )}

      {/* Formulário de categoria ou mensagem amigável se não houver categoria selecionada para edição */}
      {mode === "add" && (
        <CategoryForm
          isEditing={false}
          onSave={(cat) => {
            const catWithId = {
              ...cat,
              id: cat.id || String(Date.now()),
              productsCount: cat.productsCount ?? 0,
              createdAt: cat.createdAt ?? new Date().toISOString(),
            };
            (onSaveCategory ?? (() => {}))(catWithId);
            // toast de sucesso já é disparado pelo backend e pelo CategoryForm
          }}
          onCancel={onCancel ?? (() => {})}
        />
      )}
      {mode === "edit" &&
        (category ? (
          <CategoryForm
            category={category}
            isEditing={true}
            onSave={(cat) => {
              const catWithId = {
                ...cat,
                id: cat.id || String(Date.now()),
                productsCount: cat.productsCount ?? 0,
                createdAt: cat.createdAt ?? new Date().toISOString(),
              };
              (onSaveCategory ?? (() => {}))(catWithId);
              // toast de sucesso já é disparado pelo backend e pelo CategoryForm
            }}
            onCancel={onCancel ?? (() => {})}
          />
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">
                Nenhuma categoria selecionada para edição
              </h3>
              <p className="text-gray-500 mb-4">
                Selecione uma categoria na lista para editar ou volte para a
                listagem.
              </p>
              <Link href="/admin/dashboard/categories" passHref>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Voltar para lista
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
