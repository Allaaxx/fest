"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
} from "lucide-react";
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
} from "recharts";
import Link from "next/link";

// Dados para os gráficos
const gastosData = [
  { mes: "Jan", valor: 1200, pedidos: 8 },
  { mes: "Fev", valor: 1800, pedidos: 12 },
  { mes: "Mar", valor: 2100, pedidos: 15 },
  { mes: "Abr", valor: 1600, pedidos: 10 },
  { mes: "Mai", valor: 2450, pedidos: 18 },
  { mes: "Jun", valor: 2200, pedidos: 16 },
];

const categoriaData = [
  { name: "Decoração", value: 35, color: "#ec4899" },
  { name: "Buffet", value: 28, color: "#3b82f6" },
  { name: "Som/Luz", value: 20, color: "#10b981" },
  { name: "Fotografia", value: 17, color: "#f59e0b" },
];

const satisfacaoData = [
  { categoria: "Qualidade", valor: 92 },
  { categoria: "Entrega", valor: 88 },
  { categoria: "Atendimento", valor: 95 },
  { categoria: "Preço", valor: 85 },
];

const metasData = [
  { name: "Eventos", atual: 75, meta: 100, color: "#ec4899" },
  { name: "Gastos", atual: 60, meta: 100, color: "#3b82f6" },
  { name: "Pontos", atual: 85, meta: 100, color: "#10b981" },
];

export default function Overview() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Cards de Estatísticas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-600/5" />
          <CardContent className="p-4 sm:p-6 relative">
            <div className="flex flex-col md:flex-col items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gasto</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  R$ 2.450
                </p>
                <div className="flex items-center mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 hover:bg-green-100"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15%
                  </Badge>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">
                    vs mês anterior
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-xl flex items-center justify-center self-end mt-2">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5" />
          <CardContent className="p-4 sm:p-6 relative">
            <div className="flex flex-col md:flex-col items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  18
                </p>
                <div className="flex items-center mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                  >
                    <Package className="h-3 w-3 mr-1" />3 ativos
                  </Badge>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">
                    este mês
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center self-end mt-2">
                <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5" />
          <CardContent className="p-4 sm:p-6 relative">
            <div className="flex flex-col md:flex-col items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pontos Fidelidade
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  1.250
                </p>
                <div className="flex items-center mt-2">
                  <Progress value={83} className="w-16 h-2" />
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">
                    83% para VIP
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center self-end mt-2">
                <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/5" />
          <CardContent className="p-4 sm:p-6 relative">
            <div className="flex flex-col md:flex-col items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Favoritos</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  12
                </p>
                <div className="flex items-center mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700 hover:bg-red-100"
                  >
                    <Heart className="h-3 w-3 mr-1" />5 promoções
                  </Badge>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center self-end mt-2">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Gráfico de Gastos ao Longo do Tempo */}
        <Card className="xl:col-span-2 w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Evolução dos Gastos</CardTitle>
              <p className="text-sm text-gray-500">Últimos 6 meses</p>
            </div>
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
              className="h-[220px] sm:h-[300px] md:h-[350px] xl:h-[380px] w-full"
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
              className="h-[220px] sm:h-[300px] md:h-[350px] xl:h-[380px] w-full"
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
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-600">{item.name}</span>
                  <span className="text-xs font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Atividade Recente */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
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
            <div className="flex flex-col gap-3">
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
                const IconComponent = pedido.icon;
                return (
                  <div
                    key={pedido.id}
                    className="flex flex-col items-start p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-sm"
                  >
                    <div className="flex items-center space-x-3 mb-1">
                      <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <IconComponent className="h-4 w-4 text-gray-600" />
                      </div>
                      <p className="font-medium text-gray-900 text-sm">
                        {pedido.item}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge
                        className={pedido.statusColor + " text-xs"}
                        variant="secondary"
                      >
                        {pedido.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {pedido.tempo}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-gray-900">
                        {pedido.valor}
                      </span>
                      <span className="text-xs text-gray-500">
                        #{pedido.id}
                      </span>
                    </div>
                  </div>
                );
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
            <div className="flex flex-col gap-3">
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
                  className="flex flex-col items-start p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100 text-sm"
                >
                  <div className="flex items-center space-x-3 mb-1">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        evento.urgencia === "alta"
                          ? "bg-red-100"
                          : evento.urgencia === "media"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    >
                      <Calendar
                        className={`h-4 w-4 ${
                          evento.urgencia === "alta"
                            ? "text-red-600"
                            : evento.urgencia === "media"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      />
                    </div>
                    <p className="font-medium text-gray-900 text-sm">
                      {evento.nome}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {evento.tipo}
                    </Badge>
                    <span className="text-xs text-gray-500">{evento.data}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold ${
                        evento.dias <= 15
                          ? "text-red-600"
                          : evento.dias <= 30
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {evento.dias} dias
                    </span>
                    <span className="text-xs text-gray-500">restantes</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
