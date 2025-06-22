"use client"

import { useState } from "react"
import { BarChart3, DollarSign, Home, Menu, Package, Plus, ShoppingBag, Star, TrendingUp, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
        return <VendedorOverviewContent />
      case "products":
        return <VendedorProductsContent />
      case "orders":
        return <VendedorOrdersContent />
      case "analytics":
        return <VendedorAnalyticsContent />
      case "profile":
        return <VendedorProfileContent />
      default:
        return <VendedorOverviewContent />
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

// Vendedor Overview Content
function VendedorOverviewContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vendas do Mês</p>
                <p className="text-2xl font-bold text-gray-900">R$ 12.450</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +22% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">34</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <ShoppingBag className="h-3 w-3 mr-1" />5 pendentes
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produtos</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Package className="h-3 w-3 mr-1" />3 em destaque
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avaliação</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1" />
                  127 avaliações
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "001",
                  cliente: "Maria Silva",
                  produto: "Decoração Rústica",
                  valor: "R$ 1.200",
                  status: "Confirmado",
                },
                { id: "002", cliente: "João Santos", produto: "DJ Premium", valor: "R$ 800", status: "Em andamento" },
                { id: "003", cliente: "Ana Costa", produto: "Buffet Gourmet", valor: "R$ 450", status: "Entregue" },
              ].map((pedido) => (
                <div key={pedido.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{pedido.produto}</p>
                      <p className="text-sm text-gray-500">
                        {pedido.cliente} - #{pedido.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{pedido.valor}</p>
                    <p className="text-sm text-green-600">{pedido.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: "Decoração Rústica", vendas: 12, receita: "R$ 14.400" },
                { nome: "DJ Premium", vendas: 8, receita: "R$ 6.400" },
                { nome: "Buffet Gourmet", vendas: 15, receita: "R$ 6.750" },
              ].map((produto, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{produto.nome}</p>
                      <p className="text-sm text-gray-500">{produto.vendas} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{produto.receita}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Vendedor Products Content
function VendedorProductsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Meus Produtos</h2>
          <p className="text-sm text-gray-500">Gerencie seus produtos e serviços</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            nome: "Decoração Rústica",
            categoria: "Decoração",
            preco: "R$ 1.200",
            status: "Ativo",
            vendas: 12,
            imagem: "🌿",
          },
          { nome: "DJ Premium", categoria: "Som", preco: "R$ 800", status: "Ativo", vendas: 8, imagem: "🎵" },
          {
            nome: "Buffet Gourmet",
            categoria: "Alimentação",
            preco: "R$ 45/pessoa",
            status: "Ativo",
            vendas: 15,
            imagem: "🍽️",
          },
          {
            nome: "Fotografia Profissional",
            categoria: "Fotografia",
            preco: "R$ 1.500",
            status: "Pausado",
            vendas: 3,
            imagem: "📸",
          },
          {
            nome: "Flores Tropicais",
            categoria: "Decoração",
            preco: "R$ 300",
            status: "Ativo",
            vendas: 7,
            imagem: "🌺",
          },
          {
            nome: "Iluminação LED",
            categoria: "Iluminação",
            preco: "R$ 600",
            status: "Ativo",
            vendas: 5,
            imagem: "💡",
          },
        ].map((produto, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{produto.imagem}</div>
                <h3 className="font-semibold text-gray-900">{produto.nome}</h3>
                <p className="text-sm text-gray-500">{produto.categoria}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Preço:</span>
                  <span className="font-medium text-blue-600">{produto.preco}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Vendas:</span>
                  <span className="font-medium">{produto.vendas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span
                    className={`text-sm font-medium ${produto.status === "Ativo" ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {produto.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Vendedor Orders Content
function VendedorOrdersContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Pedidos Recebidos</h2>
          <p className="text-sm text-gray-500">Gerencie todos os pedidos dos seus produtos</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Pedido</th>
                  <th className="text-left p-4 font-medium text-gray-900">Cliente</th>
                  <th className="text-left p-4 font-medium text-gray-900">Produto</th>
                  <th className="text-left p-4 font-medium text-gray-900">Data</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Total</th>
                  <th className="text-left p-4 font-medium text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "001",
                    cliente: "Maria Silva",
                    produto: "Decoração Rústica",
                    data: "15/01/2024",
                    status: "Confirmado",
                    total: "R$ 1.200,00",
                    statusColor: "bg-green-100 text-green-800",
                  },
                  {
                    id: "002",
                    cliente: "João Santos",
                    produto: "DJ Premium",
                    data: "10/01/2024",
                    status: "Em andamento",
                    total: "R$ 800,00",
                    statusColor: "bg-blue-100 text-blue-800",
                  },
                  {
                    id: "003",
                    cliente: "Ana Costa",
                    produto: "Buffet Gourmet",
                    data: "05/01/2024",
                    status: "Pendente",
                    total: "R$ 450,00",
                    statusColor: "bg-yellow-100 text-yellow-800",
                  },
                ].map((pedido) => (
                  <tr key={pedido.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">#{pedido.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{pedido.cliente}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{pedido.produto}</div>
                    </td>
                    <td className="p-4 text-gray-500">{pedido.data}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pedido.statusColor}`}
                      >
                        {pedido.status}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-900">{pedido.total}</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        Gerenciar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Vendedor Analytics Content
function VendedorAnalyticsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Análises de Vendas</h2>
        <p className="text-sm text-gray-500">Acompanhe o desempenho dos seus produtos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Vendas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Gráfico de vendas seria exibido aqui</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorias Mais Vendidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { categoria: "Decoração", vendas: 19, porcentagem: 45 },
                { categoria: "Som", vendas: 12, porcentagem: 30 },
                { categoria: "Alimentação", vendas: 8, porcentagem: 20 },
                { categoria: "Iluminação", vendas: 3, porcentagem: 5 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">{item.categoria}</span>
                    <span className="text-sm text-gray-500">{item.vendas} vendas</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.porcentagem}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Avaliações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { cliente: "Maria Silva", produto: "Decoração Rústica", nota: 5, comentario: "Excelente trabalho!" },
                { cliente: "João Santos", produto: "DJ Premium", nota: 4, comentario: "Muito bom, recomendo." },
                { cliente: "Ana Costa", produto: "Buffet Gourmet", nota: 5, comentario: "Superou expectativas!" },
              ].map((avaliacao, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{avaliacao.cliente}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < avaliacao.nota ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{avaliacao.produto}</p>
                  <p className="text-sm text-gray-500">"{avaliacao.comentario}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Taxa de Conversão</span>
                <span className="font-medium text-green-600">12.5%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Tempo Médio de Resposta</span>
                <span className="font-medium text-blue-600">2.3h</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Satisfação do Cliente</span>
                <span className="font-medium text-yellow-600">4.8/5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Taxa de Recompra</span>
                <span className="font-medium text-purple-600">35%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Vendedor Profile Content
function VendedorProfileContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Perfil da Loja</h2>
        <p className="text-sm text-gray-500">Gerencie as informações da sua loja</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações da Loja</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Loja</label>
              <Input defaultValue="Eventos Premium" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                defaultValue="Especialistas em eventos de alta qualidade com mais de 10 anos de experiência no mercado."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input defaultValue="contato@eventospremium.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <Input defaultValue="(11) 99999-9999" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <Input defaultValue="Av. Paulista, 1000 - São Paulo, SP" />
            </div>

            <Button className="bg-blue-500 hover:bg-blue-600">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo da Loja</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">EP</span>
            </div>
            <Button variant="outline" className="mb-2">
              Alterar Logo
            </Button>
            <p className="text-xs text-gray-500">JPG, PNG até 2MB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
