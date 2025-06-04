"use client"

import { useState } from "react"
import { ShoppingBag, Calendar, Heart, CreditCard, Settings, User, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Dados simulados para os gráficos
const spendingData = [
  { month: "Jan", valor: 450 },
  { month: "Fev", valor: 320 },
  { month: "Mar", valor: 650 },
  { month: "Abr", valor: 890 },
  { month: "Mai", valor: 1200 },
  { month: "Jun", valor: 750 },
]

const categoryData = [
  { name: "Decoração", value: 45, color: "#f0739f" },
  { name: "Móveis", value: 30, color: "#ebaabd" },
  { name: "Iluminação", value: 15, color: "#f53377" },
  { name: "Outros", value: 10, color: "#394d58" },
]

const monthlyOrders = [
  { month: "Jan", pedidos: 2 },
  { month: "Fev", pedidos: 1 },
  { month: "Mar", pedidos: 4 },
  { month: "Abr", pedidos: 3 },
  { month: "Mai", valor: 6 },
  { month: "Jun", pedidos: 2 },
]

export default function ClienteDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "Total Gasto",
      value: "R$ 4.257,00",
      change: "+12%",
      icon: CreditCard,
      color: "text-green-600",
    },
    {
      title: "Pedidos Realizados",
      value: "18",
      change: "+3",
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      title: "Locações Ativas",
      value: "2",
      change: "+1",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Itens Favoritos",
      value: "24",
      change: "+8",
      icon: Heart,
      color: "text-red-600",
    },
  ]

  const recentOrders = [
    {
      id: "#1001",
      product: "Kit Decoração Casamento",
      type: "locacao",
      date: "15/01/2024",
      status: "confirmado",
      value: 299.99,
    },
    {
      id: "#1002",
      product: "Mesa Redonda Branca",
      type: "locacao",
      date: "12/01/2024",
      status: "entregue",
      value: 45.0,
    },
    {
      id: "#1003",
      product: "Conjunto Taças",
      type: "venda",
      date: "10/01/2024",
      status: "entregue",
      value: 159.99,
    },
  ]

  const loyaltyPoints = 2450
  const nextRewardAt = 3000

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-fest-black2">Minha Conta</h1>
          <p className="text-gray-600">Bem-vindo de volta, João Silva!</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configurações
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-fest-black2">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="loyalty">Fidelidade</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gastos Mensais */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Gastos nos Últimos 6 Meses</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value}`, "Valor"]} />
                    <Line type="monotone" dataKey="valor" stroke="#f0739f" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pedidos Recentes */}
            <Card>
              <CardHeader>
                <CardTitle>Últimos Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{order.product}</p>
                        <p className="text-xs text-gray-600">
                          {order.id} - {order.date}
                        </p>
                        <Badge variant={order.status === "entregue" ? "default" : "secondary"} className="text-xs mt-1">
                          {order.status}
                        </Badge>
                      </div>
                      <span className="font-bold text-fest-primary text-sm">R$ {order.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categorias Mais Compradas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Categorias Mais Compradas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Nível: Cliente Gold</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pedidos realizados</span>
                    <span className="font-semibold">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total investido</span>
                    <span className="font-semibold">R$ 4.257,00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pontos acumulados</span>
                    <span className="font-semibold text-fest-primary">{loyaltyPoints}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...recentOrders, ...recentOrders].map((order, index) => (
                  <div
                    key={`${order.id}-${index}`}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-fest-primary/10 rounded-lg flex items-center justify-center">
                        {order.type === "locacao" ? (
                          <Calendar className="h-6 w-6 text-fest-primary" />
                        ) : (
                          <ShoppingBag className="h-6 w-6 text-fest-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{order.product}</h4>
                        <p className="text-sm text-gray-600">
                          {order.id} - {order.date}
                        </p>
                        <Badge
                          variant={
                            order.status === "entregue"
                              ? "default"
                              : order.status === "confirmado"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-fest-primary">R$ {order.value.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.type === "locacao" ? "Locação" : "Venda"}</p>
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
                <CardTitle>Pedidos por Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyOrders}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pedidos" fill="#f0739f" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise de Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Maior gasto mensal</span>
                    <span className="font-bold text-fest-primary">R$ 1.200,00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Média mensal</span>
                    <span className="font-bold">R$ 709,50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Economia total com ofertas</span>
                    <span className="font-bold text-green-600">R$ 485,00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Categoria favorita</span>
                    <span className="font-bold">Decoração</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Programa de Fidelidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Pontos Atuais</span>
                      <span className="text-2xl font-bold text-fest-primary">{loyaltyPoints}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Próxima recompensa em</span>
                      <span>{nextRewardAt - loyaltyPoints} pontos</span>
                    </div>
                    <Progress value={(loyaltyPoints / nextRewardAt) * 100} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Como ganhar pontos:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Cada R$ 1 gasto</span>
                        <span className="text-fest-primary">+1 ponto</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avaliação de produto</span>
                        <span className="text-fest-primary">+10 pontos</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Indicação de amigo</span>
                        <span className="text-fest-primary">+50 pontos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recompensas Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Desconto de 10%</h4>
                      <p className="text-sm text-gray-600">Válido para qualquer produto</p>
                    </div>
                    <div className="text-right">
                      <p className="text-fest-primary font-bold">500 pontos</p>
                      <Button size="sm" className="mt-1">
                        Resgatar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Frete Grátis</h4>
                      <p className="text-sm text-gray-600">Para próxima compra</p>
                    </div>
                    <div className="text-right">
                      <p className="text-fest-primary font-bold">300 pontos</p>
                      <Button size="sm" className="mt-1">
                        Resgatar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg opacity-50">
                    <div>
                      <h4 className="font-medium">Desconto de 20%</h4>
                      <p className="text-sm text-gray-600">Válido para locações</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 font-bold">1000 pontos</p>
                      <Button size="sm" disabled className="mt-1">
                        Indisponível
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-fest-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    JS
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">João Silva</h3>
                    <p className="text-gray-600">Cliente desde Janeiro 2023</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>joão.silva@email.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>São Paulo, SP</span>
                  </div>
                </div>

                <Button className="w-full bg-fest-primary hover:bg-fest-dark text-white">Editar Perfil</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferências</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Notificações</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Ofertas e promoções</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Atualizações de pedidos</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Newsletter semanal</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Categorias de Interesse</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Decoração</Badge>
                    <Badge variant="outline">Móveis</Badge>
                    <Badge variant="outline">Iluminação</Badge>
                    <Badge variant="secondary">Buffet</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
