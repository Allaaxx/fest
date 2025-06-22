"use client"

import { useState } from "react"
import {
  BarChart3,
  DollarSign,
  Home,
  Menu,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TabType = "overview" | "users" | "products" | "orders" | "analytics" | "settings"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: Home },
    { id: "users", label: "Usuários", icon: Users },
    { id: "products", label: "Produtos", icon: Package },
    { id: "orders", label: "Pedidos", icon: ShoppingBag },
    { id: "analytics", label: "Relatórios", icon: BarChart3 },
    { id: "settings", label: "Configurações", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverviewContent />
      case "users":
        return <AdminUsersContent />
      case "products":
        return <AdminProductsContent />
      case "orders":
        return <AdminOrdersContent />
      case "analytics":
        return <AdminAnalyticsContent />
      case "settings":
        return <AdminSettingsContent />
      default:
        return <AdminOverviewContent />
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
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
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
                    ? "bg-red-50 text-red-600 border-r-2 border-red-500"
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

// Admin Overview Content
function AdminOverviewContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900">R$ 125.430</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% vs mês anterior
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
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-gray-900">2.456</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Users className="h-3 w-3 mr-1" />
                  +156 novos este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produtos</p>
                <p className="text-2xl font-bold text-gray-900">1.234</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Package className="h-3 w-3 mr-1" />
                  89 pendentes aprovação
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
                <p className="text-sm font-medium text-gray-600">Pedidos Hoje</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <ShoppingBag className="h-3 w-3 mr-1" />
                  12 aguardando aprovação
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { acao: "Novo usuário registrado", usuario: "Maria Silva", tempo: "2 min atrás", tipo: "user" },
                { acao: "Produto aprovado", usuario: "Eventos Premium", tempo: "5 min atrás", tipo: "product" },
                { acao: "Pedido processado", usuario: "João Santos", tempo: "10 min atrás", tipo: "order" },
                { acao: "Relatório de problema", usuario: "Ana Costa", tempo: "15 min atrás", tipo: "report" },
              ].map((atividade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        atividade.tipo === "user"
                          ? "bg-blue-100"
                          : atividade.tipo === "product"
                            ? "bg-purple-100"
                            : atividade.tipo === "order"
                              ? "bg-green-100"
                              : "bg-red-100"
                      }`}
                    >
                      {atividade.tipo === "user" && <User className="h-5 w-5 text-blue-600" />}
                      {atividade.tipo === "product" && <Package className="h-5 w-5 text-purple-600" />}
                      {atividade.tipo === "order" && <ShoppingBag className="h-5 w-5 text-green-600" />}
                      {atividade.tipo === "report" && <Shield className="h-5 w-5 text-red-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{atividade.acao}</p>
                      <p className="text-sm text-gray-500">{atividade.usuario}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{atividade.tempo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Taxa de Aprovação</span>
                <span className="font-medium text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Tempo Médio de Resposta</span>
                <span className="font-medium text-blue-600">1.2h</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Satisfação Geral</span>
                <span className="font-medium text-yellow-600">4.7/5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Uptime do Sistema</span>
                <span className="font-medium text-purple-600">99.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Admin Users Content
function AdminUsersContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Gerenciar Usuários</h2>
          <p className="text-sm text-gray-500">Administre clientes e vendedores da plataforma</p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600">
          <User className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Usuário</th>
                  <th className="text-left p-4 font-medium text-gray-900">Email</th>
                  <th className="text-left p-4 font-medium text-gray-900">Tipo</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Cadastro</th>
                  <th className="text-left p-4 font-medium text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    nome: "Maria Silva",
                    email: "maria@email.com",
                    tipo: "Cliente",
                    status: "Ativo",
                    cadastro: "15/01/2024",
                    statusColor: "bg-green-100 text-green-800",
                  },
                  {
                    nome: "João Santos",
                    email: "joao@eventospremium.com",
                    tipo: "Vendedor",
                    status: "Ativo",
                    cadastro: "10/01/2024",
                    statusColor: "bg-green-100 text-green-800",
                  },
                  {
                    nome: "Ana Costa",
                    email: "ana@email.com",
                    tipo: "Cliente",
                    status: "Suspenso",
                    cadastro: "05/01/2024",
                    statusColor: "bg-red-100 text-red-800",
                  },
                  {
                    nome: "Carlos Lima",
                    email: "carlos@decoracoes.com",
                    tipo: "Vendedor",
                    status: "Pendente",
                    cadastro: "01/01/2024",
                    statusColor: "bg-yellow-100 text-yellow-800",
                  },
                ].map((usuario, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{usuario.nome}</div>
                    </td>
                    <td className="p-4 text-gray-500">{usuario.email}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          usuario.tipo === "Cliente" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {usuario.tipo}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${usuario.statusColor}`}
                      >
                        {usuario.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{usuario.cadastro}</td>
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

// Admin Products Content
function AdminProductsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Gerenciar Produtos</h2>
          <p className="text-sm text-gray-500">Aprovar e moderar produtos da plataforma</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Produto</th>
                  <th className="text-left p-4 font-medium text-gray-900">Vendedor</th>
                  <th className="text-left p-4 font-medium text-gray-900">Categoria</th>
                  <th className="text-left p-4 font-medium text-gray-900">Preço</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    produto: "Decoração Rústica",
                    vendedor: "Eventos Premium",
                    categoria: "Decoração",
                    preco: "R$ 1.200",
                    status: "Aprovado",
                    statusColor: "bg-green-100 text-green-800",
                  },
                  {
                    produto: "DJ Premium",
                    vendedor: "Som & Cia",
                    categoria: "Som",
                    preco: "R$ 800",
                    status: "Pendente",
                    statusColor: "bg-yellow-100 text-yellow-800",
                  },
                  {
                    produto: "Buffet Gourmet",
                    vendedor: "Sabores Especiais",
                    categoria: "Alimentação",
                    preco: "R$ 45/pessoa",
                    status: "Aprovado",
                    statusColor: "bg-green-100 text-green-800",
                  },
                  {
                    produto: "Iluminação LED",
                    vendedor: "Luz & Arte",
                    categoria: "Iluminação",
                    preco: "R$ 600",
                    status: "Rejeitado",
                    statusColor: "bg-red-100 text-red-800",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{item.produto}</div>
                    </td>
                    <td className="p-4 text-gray-500">{item.vendedor}</td>
                    <td className="p-4 text-gray-500">{item.categoria}</td>
                    <td className="p-4 font-medium text-gray-900">{item.preco}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.statusColor}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        Revisar
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

// Admin Orders Content
function AdminOrdersContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Todos os Pedidos</h2>
          <p className="text-sm text-gray-500">Monitore todos os pedidos da plataforma</p>
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
                  <th className="text-left p-4 font-medium text-gray-900">Vendedor</th>
                  <th className="text-left p-4 font-medium text-gray-900">Produto</th>
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
                    vendedor: "Eventos Premium",
                    produto: "Decoração Rústica",
                    status: "Concluído",
                    total: "R$ 1.200",
                    statusColor: "bg-green-100 text-green-800",
                  },
                  {
                    id: "002",
                    cliente: "João Santos",
                    vendedor: "Som & Cia",
                    produto: "DJ Premium",
                    status: "Em andamento",
                    total: "R$ 800",
                    statusColor: "bg-blue-100 text-blue-800",
                  },
                  {
                    id: "003",
                    cliente: "Ana Costa",
                    vendedor: "Sabores Especiais",
                    produto: "Buffet Gourmet",
                    status: "Disputado",
                    total: "R$ 450",
                    statusColor: "bg-red-100 text-red-800",
                  },
                ].map((pedido) => (
                  <tr key={pedido.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">#{pedido.id}</div>
                    </td>
                    <td className="p-4 text-gray-500">{pedido.cliente}</td>
                    <td className="p-4 text-gray-500">{pedido.vendedor}</td>
                    <td className="p-4 text-gray-500">{pedido.produto}</td>
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
                        Detalhes
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

// Admin Analytics Content
function AdminAnalyticsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Relatórios e Analytics</h2>
        <p className="text-sm text-gray-500">Visão completa da plataforma</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Receita por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Gráfico de receita seria exibido aqui</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorias Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { categoria: "Decoração", pedidos: 45, porcentagem: 35 },
                { categoria: "Som", pedidos: 32, porcentagem: 25 },
                { categoria: "Alimentação", pedidos: 28, porcentagem: 22 },
                { categoria: "Fotografia", pedidos: 23, porcentagem: 18 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">{item.categoria}</span>
                    <span className="text-sm text-gray-500">{item.pedidos} pedidos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${item.porcentagem}%` }}></div>
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

// Admin Settings Content
function AdminSettingsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Configurações do Sistema</h2>
        <p className="text-sm text-gray-500">Gerencie configurações globais da plataforma</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Plataforma</label>
              <Input defaultValue="Marketplace de Eventos" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contato</label>
              <Input defaultValue="admin@marketplace.com" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Taxa da Plataforma (%)</label>
              <Input defaultValue="5" type="number" />
            </div>
            <Button className="bg-red-500 hover:bg-red-600">Salvar Configurações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Autenticação de Dois Fatores</p>
                <p className="text-sm text-gray-500">Obrigatória para administradores</p>
              </div>
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Logs de Auditoria</p>
                <p className="text-sm text-gray-500">Registrar todas as ações</p>
              </div>
              <Button variant="outline" size="sm">
                Ver Logs
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Backup Automático</p>
                <p className="text-sm text-gray-500">Diário às 02:00</p>
              </div>
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
