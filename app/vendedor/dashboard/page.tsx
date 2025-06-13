"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  MessageCircle,
  DollarSign,
  Users,
  Star,
  Plus,
  Edit,
  Trash2,
  QrCode,
  FileText,
  Eye,
  TrendingUp,
  ShoppingCart,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function VendorDashboard() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("overview")



  const stats = {
    totalProducts: 45,
    activeRentals: 12,
    monthlyRevenue: 15420.5,
    rating: 4.8,
    totalReviews: 156,
    pendingOrders: 8,
    totalSales: 234,
  }

  const products = [
    {
      id: 1,
      name: "Decoração Mesa Ben 10",
      type: "locacao",
      price: 99.9,
      stock: 5,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
      views: 1250,
      sales: 23,
    },
    {
      id: 2,
      name: "Kit Festa Princesa",
      type: "venda",
      price: 1250.0,
      stock: 8,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
      views: 890,
      sales: 15,
    },
    {
      id: 3,
      name: "Buffet Premium",
      type: "servico",
      price: 2500.0,
      stock: null,
      status: "pending",
      image: "/placeholder.svg?height=60&width=60",
      views: 456,
      sales: 7,
    },
  ]

  const rentals = [
    {
      id: 1,
      product: "Decoração Mesa Ben 10",
      customer: "Maria Silva",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      status: "active",
      value: 199.8,
    },
    {
      id: 2,
      product: "Kit Iluminação LED",
      customer: "João Santos",
      startDate: "2024-01-25",
      endDate: "2024-01-27",
      status: "pending",
      value: 400.0,
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Ana Costa",
      product: "Kit Festa Princesa",
      value: 1250.0,
      status: "pending",
      date: "2024-01-15",
      type: "venda",
    },
    {
      id: "ORD-002",
      customer: "Carlos Silva",
      product: "Decoração Mesa Ben 10",
      value: 199.8,
      status: "confirmed",
      date: "2024-01-14",
      type: "locacao",
    },
  ]

  return (
    <div className="min-h-screen ">
     

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#051922] mb-2">Painel do Vendedor</h1>
                <p className="text-[#394d58]">
                  Bem-vindo, Vendedor! Gerencie seus produtos e vendas
                </p>
              </div>
              <div className="flex space-x-3">
                <Link href="/vendedor/produtos/novo">
                  <Button className="bg-[#f0739f] hover:bg-[#f53377] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                  </Button>
                </Link>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mensagens
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#394d58]">Produtos</p>
                    <p className="text-2xl font-bold text-[#051922]">{stats.totalProducts}</p>
                    <p className="text-xs text-green-600">+3 este mês</p>
                  </div>
                  <Package className="w-8 h-8 text-[#f0739f]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#394d58]">Receita Mensal</p>
                    <p className="text-2xl font-bold text-[#051922]">
                      R$ {stats.monthlyRevenue.toFixed(2).replace(".", ",")}
                    </p>
                    <p className="text-xs text-green-600">+12% vs mês anterior</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-[#f0739f]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#394d58]">Pedidos Pendentes</p>
                    <p className="text-2xl font-bold text-[#051922]">{stats.pendingOrders}</p>
                    <p className="text-xs text-orange-600">Requer atenção</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-[#f0739f]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#394d58]">Avaliação</p>
                    <div className="flex items-center space-x-1">
                      <p className="text-2xl font-bold text-[#051922]">{stats.rating}</p>
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-xs text-[#394d58]">{stats.totalReviews} avaliações</p>
                  </div>
                  <Users className="w-8 h-8 text-[#f0739f]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="products">Produtos</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="rentals">Locações</TabsTrigger>
              <TabsTrigger value="analytics">Relatórios</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Produtos em Destaque
                      <Link href="/vendedor/produtos">
                        <Button size="sm" variant="outline">
                          Ver Todos
                        </Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-[#051922]">{product.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-[#394d58]">
                              <Badge
                                variant={
                                  product.type === "locacao"
                                    ? "default"
                                    : product.type === "venda"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {product.type === "locacao"
                                  ? "Locação"
                                  : product.type === "venda"
                                    ? "Venda"
                                    : "Serviço"}
                              </Badge>
                              <span>R$ {product.price.toFixed(2).replace(".", ",")}</span>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-[#394d58]">{product.views} visualizações</p>
                            <p className="text-[#051922] font-medium">{product.sales} vendas</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Pedidos Recentes
                      <Link href="/vendedor/pedidos">
                        <Button size="sm" variant="outline">
                          Ver Todos
                        </Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium text-[#051922]">Pedido {order.id}</h4>
                            <p className="text-sm text-[#394d58]">{order.customer}</p>
                            <p className="text-sm text-[#394d58]">{order.product}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#051922]">R$ {order.value.toFixed(2).replace(".", ",")}</p>
                            <Badge variant={order.status === "confirmed" ? "default" : "secondary"}>
                              {order.status === "confirmed" ? "Confirmado" : "Pendente"}
                            </Badge>
                            <p className="text-xs text-[#394d58]">{order.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance do Mês</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#394d58]">Vendas</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#f0739f] h-2 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#394d58]">Locações</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#394d58] h-2 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#394d58]">Serviços</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#f53377] h-2 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/vendedor/produtos/novo">
                        <Button variant="outline" className="w-full h-16 flex flex-col">
                          <Plus className="w-5 h-5 mb-1" />
                          <span className="text-xs">Novo Produto</span>
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full h-16 flex flex-col">
                        <TrendingUp className="w-5 h-5 mb-1" />
                        <span className="text-xs">Relatórios</span>
                      </Button>
                      <Button variant="outline" className="w-full h-16 flex flex-col">
                        <MessageCircle className="w-5 h-5 mb-1" />
                        <span className="text-xs">Mensagens</span>
                      </Button>
                      <Button variant="outline" className="w-full h-16 flex flex-col">
                        <Star className="w-5 h-5 mb-1" />
                        <span className="text-xs">Avaliações</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Gerenciar Produtos
                    <Link href="/vendedor/produtos/novo">
                      <Button className="bg-[#f0739f] hover:bg-[#f53377]">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Produto
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-[#051922]">{product.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant={
                                  product.type === "locacao"
                                    ? "default"
                                    : product.type === "venda"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {product.type === "locacao"
                                  ? "Locação"
                                  : product.type === "venda"
                                    ? "Venda"
                                    : "Serviço"}
                              </Badge>
                              <span className="text-sm text-[#394d58]">
                                R$ {product.price.toFixed(2).replace(".", ",")}
                              </span>
                              {product.stock !== null && (
                                <span className="text-sm text-[#394d58]">Estoque: {product.stock}</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-[#394d58]">
                              <span>{product.views} visualizações</span>
                              <span>{product.sales} vendas</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={product.status === "active" ? "default" : "secondary"}>
                            {product.status === "active" ? "Ativo" : "Pendente"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <QrCode className="w-4 h-4 mr-2" />
                            QR Code
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-[#051922]">Pedido {order.id}</h4>
                          <p className="text-sm text-[#394d58]">Cliente: {order.customer}</p>
                          <p className="text-sm text-[#394d58]">Produto: {order.product}</p>
                          <p className="text-sm text-[#394d58]">Data: {order.date}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-bold text-[#051922]">R$ {order.value.toFixed(2).replace(".", ",")}</p>
                            <Badge variant={order.status === "confirmed" ? "default" : "secondary"}>
                              {order.status === "confirmed" ? "Confirmado" : "Pendente"}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Detalhes
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rentals" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendário de Locações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rentals.map((rental) => (
                      <div key={rental.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-[#051922]">{rental.product}</h4>
                          <p className="text-sm text-[#394d58]">Cliente: {rental.customer}</p>
                          <p className="text-sm text-[#394d58]">
                            Período: {rental.startDate} até {rental.endDate}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-bold text-[#051922]">R$ {rental.value.toFixed(2).replace(".", ",")}</p>
                            <Badge variant={rental.status === "active" ? "default" : "secondary"}>
                              {rental.status === "active" ? "Em Andamento" : "Agendado"}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Contrato
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendas por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#394d58]">Locação</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#f0739f] h-2 rounded-full" style={{ width: "70%" }}></div>
                          </div>
                          <span className="text-sm font-medium">70%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#394d58]">Venda</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#394d58] h-2 rounded-full" style={{ width: "25%" }}></div>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#394d58]">Serviços</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#f53377] h-2 rounded-full" style={{ width: "5%" }}></div>
                          </div>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Receita Mensal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#394d58]">Janeiro</span>
                        <span className="font-bold text-[#051922]">R$ 15.420,50</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#394d58]">Dezembro</span>
                        <span className="font-bold text-[#051922]">R$ 18.750,00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#394d58]">Novembro</span>
                        <span className="font-bold text-[#051922]">R$ 12.300,25</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
