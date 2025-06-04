"use client"

import { useState } from "react"
import { Users, Package, DollarSign, TrendingUp, UserCheck, AlertCircle, Settings, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const adminStats = [
  {
    title: "Receita Total",
    value: "R$ 45.230",
    change: "+18%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Vendedores Ativos",
    value: "127",
    change: "+12",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Produtos Cadastrados",
    value: "1.234",
    change: "+89",
    icon: Package,
    color: "text-purple-600",
  },
  {
    title: "Taxa de Conversão",
    value: "3.2%",
    change: "+0.5%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const pendingVendors = [
  {
    id: 1,
    name: "Decorações Premium",
    email: "contato@decorpremium.com",
    cnpj: "12.345.678/0001-90",
    date: "2024-01-15",
    status: "pendente",
  },
  {
    id: 2,
    name: "Eventos & Cia",
    email: "eventos@eventosecia.com",
    cnpj: "98.765.432/0001-10",
    date: "2024-01-14",
    status: "pendente",
  },
]

const recentTransactions = [
  {
    id: 1,
    vendor: "Decorações Encantadas",
    product: "Kit Casamento Rústico",
    value: 299.99,
    fee: 14.99,
    date: "2024-01-15",
    type: "locacao",
  },
  {
    id: 2,
    vendor: "Móveis & Eventos",
    product: "Mesa Redonda Branca",
    value: 45.0,
    fee: 2.25,
    date: "2024-01-15",
    type: "locacao",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-fest-black2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie a plataforma Fest</p>
        </div>
        <Button className="btn-primary">
          <Settings className="h-4 w-4 mr-2" />
          Configurações
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, index) => (
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
          <TabsTrigger value="vendors">Vendedores</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                  Aprovações Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium">Vendedores</p>
                      <p className="text-sm text-gray-600">2 aguardando aprovação</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revisar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Produtos</p>
                      <p className="text-sm text-gray-600">5 aguardando aprovação</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revisar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-fest-primary" />
                  Métricas do Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Novos Vendedores</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Produtos Cadastrados</span>
                    <span className="font-bold">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Transações</span>
                    <span className="font-bold">234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxa da Plataforma</span>
                    <span className="font-bold text-fest-primary">R$ 2.261</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendedores Pendentes de Aprovação</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>{vendor.email}</TableCell>
                      <TableCell>{vendor.cnpj}</TableCell>
                      <TableCell>{new Date(vendor.date).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{vendor.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="text-green-600">
                            <UserCheck className="h-4 w-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            Rejeitar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Taxa (5%)</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.vendor}</TableCell>
                      <TableCell>{transaction.product}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.type === "locacao" ? "Locação" : "Venda"}</Badge>
                      </TableCell>
                      <TableCell>R$ {transaction.value.toFixed(2)}</TableCell>
                      <TableCell className="text-fest-primary font-medium">R$ {transaction.fee.toFixed(2)}</TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString("pt-BR")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Plataforma</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Taxa da Plataforma (%)</span>
                  <span className="font-bold">5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Aprovação Automática</span>
                  <Badge variant="secondary">Desabilitado</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Modo Manutenção</span>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <Button className="w-full btn-primary">Editar Configurações</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestão de Conteúdo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Gerenciar Categorias
                </Button>
                <Button variant="outline" className="w-full">
                  Gerenciar Banners
                </Button>
                <Button variant="outline" className="w-full">
                  Gerenciar Blog
                </Button>
                <Button variant="outline" className="w-full">
                  Cupons de Desconto
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
