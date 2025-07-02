"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Download } from "lucide-react"
import { useState } from "react"

// Mock data para os gráficos
const revenueData = [
  { month: "Jan", revenue: 12500, orders: 45, users: 120 },
  { month: "Fev", revenue: 15800, orders: 52, users: 145 },
  { month: "Mar", revenue: 18200, orders: 68, users: 180 },
  { month: "Abr", revenue: 22100, orders: 75, users: 210 },
  { month: "Mai", revenue: 19800, orders: 63, users: 195 },
  { month: "Jun", revenue: 25400, orders: 89, users: 250 },
  { month: "Jul", revenue: 28900, orders: 95, users: 280 },
  { month: "Ago", revenue: 31200, orders: 108, users: 320 },
  { month: "Set", revenue: 27800, orders: 92, users: 295 },
  { month: "Out", revenue: 33500, orders: 115, users: 350 },
  { month: "Nov", revenue: 36200, orders: 125, users: 380 },
  { month: "Dez", revenue: 42800, orders: 145, users: 420 },
]

const categoryData = [
  { categoria: "Decoração", pedidos: 145, porcentagem: 35, revenue: 45000, color: "#ef4444" },
  { categoria: "Som", pedidos: 102, porcentagem: 25, revenue: 32000, color: "#f97316" },
  { categoria: "Alimentação", pedidos: 89, porcentagem: 22, revenue: 28000, color: "#eab308" },
  { categoria: "Fotografia", pedidos: 73, porcentagem: 18, revenue: 23000, color: "#22c55e" },
  { categoria: "Iluminação", pedidos: 45, porcentagem: 12, revenue: 15000, color: "#3b82f6" },
  { categoria: "Móveis", pedidos: 32, porcentagem: 8, revenue: 12000, color: "#8b5cf6" },
]

const dailyViewsData = [
  { day: "Seg", views: 1200, clicks: 180, conversions: 12 },
  { day: "Ter", views: 1450, clicks: 220, conversions: 18 },
  { day: "Qua", views: 1680, clicks: 280, conversions: 25 },
  { day: "Qui", views: 1890, clicks: 320, conversions: 32 },
  { day: "Sex", views: 2100, clicks: 380, conversions: 45 },
  { day: "Sáb", views: 2450, clicks: 420, conversions: 52 },
  { day: "Dom", views: 1980, clicks: 350, conversions: 38 },
]

const topProductsData = [
  { name: "Kit Decoração Infantil", sales: 89, revenue: 12500, growth: 15.2 },
  { name: "DJ Premium", sales: 67, revenue: 9800, growth: 8.7 },
  { name: "Buffet Gourmet", sales: 54, revenue: 8200, growth: -2.1 },
  { name: "Fotografia Casamento", sales: 43, revenue: 7100, growth: 12.5 },
  { name: "Iluminação LED", sales: 38, revenue: 5900, growth: 6.8 },
]

export function AdminAnalyticsContent() {
  const [timeRange, setTimeRange] = useState("12months")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0)
  const totalUsers = revenueData[revenueData.length - 1].users
  const avgOrderValue = totalRevenue / totalOrders

  const currentMonth = revenueData[revenueData.length - 1]
  const previousMonth = revenueData[revenueData.length - 2]
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100
  const ordersGrowth = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders) * 100

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics & Relatórios</h2>
          <p className="text-sm text-gray-500 mt-1">Visão completa do desempenho da plataforma</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="12months">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
                <div className="flex items-center mt-2">
                  {revenueGrowth > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${revenueGrowth > 0 ? "text-green-600" : "text-red-600"}`}>
                    {Math.abs(revenueGrowth).toFixed(1)}% vs mês anterior
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalOrders}</p>
                <div className="flex items-center mt-2">
                  {ordersGrowth > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${ordersGrowth > 0 ? "text-green-600" : "text-red-600"}`}>
                    {Math.abs(ordersGrowth).toFixed(1)}% vs mês anterior
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalUsers}</p>
                <div className="flex items-center mt-2">
                  <Users className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm font-medium text-blue-600">+12% este mês</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {avgOrderValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-600">+5.2% vs mês anterior</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Receita por Mês</span>
              <Badge variant="outline" className="text-xs">
                {timeRange === "12months" ? "12 meses" : timeRange}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} />
                  <YAxis
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: any) => [
                      value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                      "Receita",
                    ]}
                    labelStyle={{ color: "#666" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Categories Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Categorias Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="pedidos"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any, props: any) => [`${value} pedidos`, props.payload.categoria]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryData.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.categoria}</span>
                  </div>
                  <span className="text-gray-500">{item.pedidos}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Daily Views */}
        <Card>
          <CardHeader>
            <CardTitle>Visualizações Diárias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyViewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} name="Visualizações" />
                  <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} name="Cliques" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProductsData.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} vendas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      {product.revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </p>
                    <div className="flex items-center justify-end">
                      {product.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                        {Math.abs(product.growth).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">Categoria</th>
                  <th className="text-left p-3 font-medium text-gray-600">Pedidos</th>
                  <th className="text-left p-3 font-medium text-gray-600">Receita</th>
                  <th className="text-left p-3 font-medium text-gray-600">Participação</th>
                  <th className="text-left p-3 font-medium text-gray-600">Tendência</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((category, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.categoria}</span>
                      </div>
                    </td>
                    <td className="p-3">{category.pedidos}</td>
                    <td className="p-3 font-medium">
                      {category.revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${category.porcentagem}%`,
                              backgroundColor: category.color,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{category.porcentagem}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">+{(Math.random() * 10 + 2).toFixed(1)}%</span>
                      </div>
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
