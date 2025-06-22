"use client"

import { useState } from "react"
import { Calendar, CreditCard, Gift, Heart, Home, Menu, Package, ShoppingBag, TrendingUp, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TabType = "overview" | "orders" | "favorites" | "loyalty" | "profile"

export default function ClienteDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: Home },
    { id: "orders", label: "Meus Pedidos", icon: Package },
    { id: "favorites", label: "Favoritos", icon: Heart },
    { id: "loyalty", label: "Pontos de Fidelidade", icon: Gift },
    { id: "profile", label: "Meu Perfil", icon: User },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ClienteOverviewContent />
      case "orders":
        return <ClienteOrdersContent />
      case "favorites":
        return <ClienteFavoritesContent />
      case "loyalty":
        return <ClienteLoyaltyContent />
      case "profile":
        return <ClienteProfileContent />
      default:
        return <ClienteOverviewContent />
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
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Cliente</span>
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
                    ? "bg-pink-50 text-pink-600 border-r-2 border-pink-500"
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

// Cliente Overview Content
function ClienteOverviewContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gasto</p>
                <p className="text-2xl font-bold text-gray-900">R$ 2.450</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-pink-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Package className="h-3 w-3 mr-1" />2 em andamento
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
                <p className="text-sm font-medium text-gray-600">Pontos</p>
                <p className="text-2xl font-bold text-gray-900">1.250</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Gift className="h-3 w-3 mr-1" />
                  250 para próxima recompensa
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Gift className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favoritos</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <Heart className="h-3 w-3 mr-1" />3 com desconto
                </p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-500" />
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
                { id: "001", item: "Decoração Casamento", status: "Entregue", valor: "R$ 1.200" },
                { id: "002", item: "Som e Iluminação", status: "Em andamento", valor: "R$ 800" },
                { id: "003", item: "Buffet Premium", status: "Confirmado", valor: "R$ 450" },
              ].map((pedido) => (
                <div key={pedido.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{pedido.item}</p>
                      <p className="text-sm text-gray-500">Pedido #{pedido.id}</p>
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
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: "Casamento Ana & Carlos", data: "15 de Fev, 2024", dias: "Em 10 dias" },
                { nome: "Aniversário 50 anos", data: "28 de Fev, 2024", dias: "Em 23 dias" },
                { nome: "Formatura Medicina", data: "15 de Mar, 2024", dias: "Em 38 dias" },
              ].map((evento, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{evento.nome}</p>
                      <p className="text-sm text-gray-500">{evento.data}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-600 font-medium">{evento.dias}</p>
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

// Cliente Orders Content
function ClienteOrdersContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Meus Pedidos</h2>
          <p className="text-sm text-gray-500">Acompanhe todos os seus pedidos</p>
        </div>
        <Button className="bg-pink-500 hover:bg-pink-600">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Pedido</th>
                  <th className="text-left p-4 font-medium text-gray-900">Item</th>
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
                    item: "Decoração Casamento",
                    data: "15/01/2024",
                    status: "Entregue",
                    total: "R$ 1.200,00",
                    statusColor: "bg-green-100 text-green-800",
                  },
                  {
                    id: "002",
                    item: "Som e Iluminação",
                    data: "10/01/2024",
                    status: "Em andamento",
                    total: "R$ 800,00",
                    statusColor: "bg-blue-100 text-blue-800",
                  },
                  {
                    id: "003",
                    item: "Buffet Premium",
                    data: "05/01/2024",
                    status: "Confirmado",
                    total: "R$ 450,00",
                    statusColor: "bg-yellow-100 text-yellow-800",
                  },
                ].map((pedido) => (
                  <tr key={pedido.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">#{pedido.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{pedido.item}</div>
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
                        Ver detalhes
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

// Cliente Favorites Content
function ClienteFavoritesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Meus Favoritos</h2>
        <p className="text-sm text-gray-500">Produtos e serviços que você salvou</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { nome: "Decoração Rústica", categoria: "Decoração", preco: "R$ 1.200", desconto: "10% OFF", imagem: "🌿" },
          { nome: "DJ Premium", categoria: "Som", preco: "R$ 800", desconto: null, imagem: "🎵" },
          { nome: "Buffet Gourmet", categoria: "Alimentação", preco: "R$ 45/pessoa", desconto: "15% OFF", imagem: "🍽️" },
          { nome: "Fotografia Profissional", categoria: "Fotografia", preco: "R$ 1.500", desconto: null, imagem: "📸" },
          { nome: "Flores Tropicais", categoria: "Decoração", preco: "R$ 300", desconto: "20% OFF", imagem: "🌺" },
          { nome: "Iluminação LED", categoria: "Iluminação", preco: "R$ 600", desconto: null, imagem: "💡" },
        ].map((item, index) => (
          <Card key={index} className="relative">
            {item.desconto && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {item.desconto}
              </div>
            )}
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{item.imagem}</div>
                <h3 className="font-semibold text-gray-900">{item.nome}</h3>
                <p className="text-sm text-gray-500">{item.categoria}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-600">{item.preco}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </Button>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    Contratar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Cliente Loyalty Content
function ClienteLoyaltyContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Programa de Fidelidade</h2>
        <p className="text-sm text-gray-500">Seus pontos e recompensas</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-12 w-12 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1.250 Pontos</h3>
            <p className="text-gray-500 mb-4">Você precisa de mais 250 pontos para a próxima recompensa</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div className="bg-yellow-500 h-3 rounded-full" style={{ width: "83%" }}></div>
            </div>
            <p className="text-sm text-gray-500">83% para o próximo nível</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recompensas Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: "Desconto 10%", pontos: 500, disponivel: true },
                { nome: "Frete Grátis", pontos: 300, disponivel: true },
                { nome: "Desconto 20%", pontos: 1000, disponivel: true },
                { nome: "Serviço Grátis", pontos: 1500, disponivel: false },
              ].map((recompensa, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{recompensa.nome}</p>
                    <p className="text-sm text-gray-500">{recompensa.pontos} pontos</p>
                  </div>
                  <Button
                    size="sm"
                    disabled={!recompensa.disponivel}
                    className={recompensa.disponivel ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                  >
                    {recompensa.disponivel ? "Resgatar" : "Bloqueado"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pontos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { acao: "Compra realizada", pontos: "+120", data: "15/01/2024" },
                { acao: "Avaliação produto", pontos: "+50", data: "10/01/2024" },
                { acao: "Indicação amigo", pontos: "+200", data: "05/01/2024" },
                { acao: "Desconto resgatado", pontos: "-500", data: "01/01/2024" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.acao}</p>
                    <p className="text-sm text-gray-500">{item.data}</p>
                  </div>
                  <span className={`font-medium ${item.pontos.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {item.pontos}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Cliente Profile Content
function ClienteProfileContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Meu Perfil</h2>
        <p className="text-sm text-gray-500">Gerencie suas informações pessoais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <Input defaultValue="Maria Silva" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                <Input defaultValue="Santos" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input defaultValue="maria@email.com" type="email" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <Input defaultValue="(11) 99999-9999" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <Input defaultValue="Rua das Flores, 123 - São Paulo, SP" />
            </div>

            <Button className="bg-pink-500 hover:bg-pink-600">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Foto do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-pink-600" />
            </div>
            <Button variant="outline" className="mb-2">
              Alterar Foto
            </Button>
            <p className="text-xs text-gray-500">JPG, PNG até 2MB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
