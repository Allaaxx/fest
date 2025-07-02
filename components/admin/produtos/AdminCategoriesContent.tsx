"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package, ShoppingBag, DollarSign } from "lucide-react";

export function AdminCategoriesContent() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const categorias = [
    {
      id: 1,
      nome: "Decoração",
      descricao: "Decoração para eventos em geral",
      produtos: 45,
      vendedores: 12,
      status: "Ativo",
      cor: "#ec4899",
      icone: "🎨",
      comissao: 8.5,
      criado: "15/01/2024",
    },
    {
      id: 2,
      nome: "Buffet & Catering",
      descricao: "Serviços de alimentação e bebidas",
      produtos: 32,
      vendedores: 8,
      status: "Ativo",
      cor: "#3b82f6",
      icone: "🍽️",
      comissao: 10.0,
      criado: "10/01/2024",
    },
    {
      id: 3,
      nome: "Som & Iluminação",
      descricao: "Equipamentos de som e iluminação",
      produtos: 28,
      vendedores: 6,
      status: "Ativo",
      cor: "#10b981",
      icone: "🎵",
      comissao: 7.5,
      criado: "05/01/2024",
    },
    {
      id: 4,
      nome: "Fotografia",
      descricao: "Serviços fotográficos profissionais",
      produtos: 23,
      vendedores: 15,
      status: "Ativo",
      cor: "#f59e0b",
      icone: "📸",
      comissao: 12.0,
      criado: "01/01/2024",
    },
    {
      id: 5,
      nome: "Transporte",
      descricao: "Serviços de transporte para eventos",
      produtos: 18,
      vendedores: 5,
      status: "Inativo",
      cor: "#8b5cf6",
      icone: "🚗",
      comissao: 6.0,
      criado: "28/12/2023",
    },
    {
      id: 6,
      nome: "Segurança",
      descricao: "Serviços de segurança e portaria",
      produtos: 12,
      vendedores: 4,
      status: "Pendente",
      cor: "#ef4444",
      icone: "🛡️",
      comissao: 9.0,
      criado: "20/12/2023",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Categorias
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {categorias.length}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Categorias Ativas
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {categorias.filter((c) => c.status === "Ativo").length}
                </p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Package className="h-3 w-3 mr-1" />
                  {Math.round(
                    (categorias.filter((c) => c.status === "Ativo").length /
                      categorias.length) *
                      100
                  )}
                  % do total
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Produtos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {categorias.reduce((acc, cat) => acc + cat.produtos, 0)}
                </p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <ShoppingBag className="h-3 w-3 mr-1" />
                  Distribuídos
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Comissão Média
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    categorias.reduce((acc, cat) => acc + cat.comissao, 0) /
                    categorias.length
                  ).toFixed(1)}
                  %
                </p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Por categoria
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Ações e Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Gerenciar Categorias
          </h2>
          <p className="text-sm text-gray-500">
            Organize e configure as categorias da plataforma
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <Package className="h-4 w-4 mr-2" />
            Nova Categoria
          </Button>
        </div>
      </div>
      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <Card
            key={categoria.id}
            className="relative overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: categoria.cor }}
            />
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${categoria.cor}20` }}
                  >
                    {categoria.icone}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {categoria.nome}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {categoria.descricao}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    categoria.status === "Ativo"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : categoria.status === "Inativo"
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                  variant="secondary"
                >
                  {categoria.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {categoria.produtos}
                  </p>
                  <p className="text-xs text-gray-500">Produtos</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {categoria.vendedores}
                  </p>
                  <p className="text-xs text-gray-500">Vendedores</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Comissão</p>
                  <p className="font-semibold text-gray-900">
                    {categoria.comissao}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Criado em</p>
                  <p className="font-semibold text-gray-900">
                    {categoria.criado}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setEditingCategory(categoria)}
                >
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Produtos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Modal de Adicionar/Editar Categoria */}
      {(showAddModal || editingCategory) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <Input
                  defaultValue={editingCategory?.nome || ""}
                  placeholder="Ex: Decoração"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <Input
                  defaultValue={editingCategory?.descricao || ""}
                  placeholder="Descrição da categoria"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ícone
                  </label>
                  <Input
                    defaultValue={editingCategory?.icone || ""}
                    placeholder="🎨"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cor
                  </label>
                  <Input
                    type="color"
                    defaultValue={editingCategory?.cor || "#ec4899"}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comissão (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  defaultValue={editingCategory?.comissao || ""}
                  placeholder="8.5"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                  }}
                >
                  {editingCategory ? "Salvar" : "Criar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
