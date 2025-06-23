"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  CreditCard,
  Package,
  ShoppingBag,
  Gift,
  Heart,
  Calendar,
  ArrowUpRight,
  DollarSign,
  Star,
  Clock,
  Target,
  Zap,
} from "lucide-react"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts"

// Dados para os gráficos
const gastosData = [
  { mes: "Jan", valor: 1200, pedidos: 8 },
  { mes: "Fev", valor: 1800, pedidos: 12 },
  { mes: "Mar", valor: 2100, pedidos: 15 },
  { mes: "Abr", valor: 1600, pedidos: 10 },
  { mes: "Mai", valor: 2450, pedidos: 18 },
  { mes: "Jun", valor: 2200, pedidos: 16 },
]

const categoriaData = [
  { name: "Decoração", value: 35, color: "#ec4899" },
  { name: "Buffet", value: 28, color: "#3b82f6" },
  { name: "Som/Luz", value: 20, color: "#10b981" },
  { name: "Fotografia", value: 17, color: "#f59e0b" },
]

const satisfacaoData = [
  { categoria: "Qualidade", valor: 92 },
  { categoria: "Entrega", valor: 88 },
  { categoria: "Atendimento", valor: 95 },
  { categoria: "Preço", valor: 85 },
]

const metasData = [
  { name: "Eventos", atual: 75, meta: 100, color: "#ec4899" },
  { name: "Gastos", atual: 60, meta: 100, color: "#3b82f6" },
  { name: "Pontos", atual: 85, meta: 100, color: "#10b981" },
]

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-600/5" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gasto</p>
                <p className="text-2xl font-bold text-gray-900">R$ 2.450</p>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15%
                  </Badge>
                  <span className="text-xs text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    <Package className="h-3 w-3 mr-1" />3 ativos
                  </Badge>
                  <span className="text-xs text-gray-500 ml-2">este mês</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pontos Fidelidade</p>
                <p className="text-2xl font-bold text-gray-900">1.250</p>
                <div className="flex items-center mt-2">
                  <Progress value={83} className="w-16 h-2" />
                  <span className="text-xs text-gray-500 ml-2">83% para VIP</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Gift className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/5" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favoritos</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100">
                    <Heart className="h-3 w-3 mr-1" />5 promoções
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Gastos ao Longo do Tempo */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Evolução dos Gastos</CardTitle>
              <p className="text-sm text-gray-500">Últimos 6 meses</p>
            </div>
            <Button variant="outline" size="sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              Ver detalhes
            </Button>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                valor: {
                  label: "Valor Gasto",
                  color: "hsl(var(--chart-1))",
                },
                pedidos: {
                  label: "Pedidos",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gastosData}>
                  <defs>
                    <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="mes" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="valor"
                    stroke="#ec4899"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
            <p className="text-sm text-gray-500">Distribuição atual</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                decoracao: { label: "Decoração", color: "#ec4899" },
                buffet: { label: "Buffet", color: "#3b82f6" },
                som: { label: "Som/Luz", color: "#10b981" },
                foto: { label: "Fotografia", color: "#f59e0b" },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoriaData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoriaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoriaData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                  <span className="text-xs font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Satisfação por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              Satisfação por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {satisfacaoData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.categoria}</span>
                    <span className="text-sm font-bold text-gray-900">{item.valor}%</span>
                  </div>
                  <Progress value={item.valor} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metas do Mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 text-green-500 mr-2" />
              Metas do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                atual: { label: "Atual", color: "hsl(var(--chart-1))" },
                meta: { label: "Meta", color: "hsl(var(--chart-2))" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={metasData}>
                  <RadialBar dataKey="atual" cornerRadius={10} fill="#8884d8" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Atividade Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedidos Recentes com Status Visual */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Atividade Recente</CardTitle>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Tempo real
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "001",
                  item: "Decoração Casamento Premium",
                  status: "Entregue",
                  valor: "R$ 1.200",
                  tempo: "2h atrás",
                  statusColor: "bg-green-100 text-green-700",
                  icon: Package,
                },
                {
                  id: "002",
                  item: "Sistema Som Profissional",
                  status: "Em andamento",
                  valor: "R$ 800",
                  tempo: "1 dia atrás",
                  statusColor: "bg-blue-100 text-blue-700",
                  icon: Zap,
                },
                {
                  id: "003",
                  item: "Buffet Executivo",
                  status: "Confirmado",
                  valor: "R$ 450",
                  tempo: "3 dias atrás",
                  statusColor: "bg-yellow-100 text-yellow-700",
                  icon: DollarSign,
                },
              ].map((pedido) => {
                const IconComponent = pedido.icon
                return (
                  <div
                    key={pedido.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{pedido.item}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={pedido.statusColor} variant="secondary">
                            {pedido.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{pedido.tempo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{pedido.valor}</p>
                      <p className="text-xs text-gray-500">#{pedido.id}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Próximos Eventos com Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  nome: "Casamento Ana & Carlos",
                  data: "15 de Fev, 2024",
                  dias: 10,
                  tipo: "Casamento",
                  urgencia: "alta",
                },
                {
                  nome: "Aniversário 50 anos",
                  data: "28 de Fev, 2024",
                  dias: 23,
                  tipo: "Aniversário",
                  urgencia: "media",
                },
                {
                  nome: "Formatura Medicina",
                  data: "15 de Mar, 2024",
                  dias: 38,
                  tipo: "Formatura",
                  urgencia: "baixa",
                },
              ].map((evento, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        evento.urgencia === "alta"
                          ? "bg-red-100"
                          : evento.urgencia === "media"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    >
                      <Calendar
                        className={`h-5 w-5 ${
                          evento.urgencia === "alta"
                            ? "text-red-600"
                            : evento.urgencia === "media"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{evento.nome}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {evento.tipo}
                        </Badge>
                        <span className="text-xs text-gray-500">{evento.data}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        evento.dias <= 15 ? "text-red-600" : evento.dias <= 30 ? "text-yellow-600" : "text-green-600"
                      }`}
                    >
                      {evento.dias} dias
                    </p>
                    <p className="text-xs text-gray-500">restantes</p>
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
