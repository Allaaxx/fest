"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Eye,
  Heart,
  MapPin,
  Package,
  Star,
  TrendingUp,
  User,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  ExternalLink,
} from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  category: string
  type: "venda" | "locacao" | "servico"
  price: number
  originalPrice?: number
  stock?: number
  status: "pending" | "approved" | "rejected" | "active" | "inactive"
  vendor: {
    name: string
    id: string
    email?: string
    phone?: string
    location?: string
    rating?: number
    totalSales?: number
  }
  createdAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
  sales: number
  views: number
  rating: number
  totalReviews: number
  images?: string[]
  features?: string[]
  tags?: string[]
  analytics?: {
    dailyViews: number[]
    weeklyViews: number[]
    monthlyViews: number[]
    conversionRate: number
    averageTimeOnPage: number
    bounceRate: number
  }
}

interface ProductDetailsModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onEdit?: (product: Product) => void
  onApprove?: (product: Product) => void
  onReject?: (product: Product) => void
  onDelete?: (product: Product) => void
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onEdit,
  onApprove,
  onReject,
  onDelete,
}: ProductDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!product) return null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case "approved":
        return <Badge className="bg-blue-100 text-blue-800">Aprovado</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejeitado</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "venda":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Venda
          </Badge>
        )
      case "locacao":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Locação
          </Badge>
        )
      case "servico":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            Serviço
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
              <DialogDescription className="mt-2">Detalhes completos do produto #{product.id}</DialogDescription>
            </div>
            <div className="flex gap-2">
              {getStatusBadge(product.status)}
              {getTypeBadge(product.type)}
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="vendor">Vendedor</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações do Produto */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Informações do Produto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Categoria</p>
                      <p className="font-medium capitalize">{product.category.replace("-", " ")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Preço</p>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg">
                          {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                        {product.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            {product.originalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </p>
                        )}
                      </div>
                    </div>
                    {product.stock && (
                      <div>
                        <p className="text-sm text-gray-600">Estoque</p>
                        <p className="font-medium">{product.stock} unidades</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600">Criado em</p>
                      <p className="font-medium">{new Date(product.createdAt).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Descrição</p>
                    <div
                      className="text-sm text-gray-800 leading-relaxed max-h-32 overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>

                  {product.features && product.features.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Características</p>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Estatísticas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Eye className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">{product.views}</p>
                      <p className="text-sm text-gray-600">Visualizações</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">{product.sales}</p>
                      <p className="text-sm text-gray-600">Vendas</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-yellow-600">{product.rating.toFixed(1)}</p>
                      <p className="text-sm text-gray-600">Avaliação</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Heart className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">{product.totalReviews}</p>
                      <p className="text-sm text-gray-600">Reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Imagens do Produto */}
            {product.images && product.images.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Imagens do Produto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image || "/placeholder.svg?height=200&width=200"}
                          alt={`${product.name} - Imagem ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Taxa de Conversão</p>
                      <p className="text-2xl font-bold text-green-600">{product.analytics?.conversionRate || 2.5}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Tempo Médio na Página</p>
                      <p className="text-2xl font-bold text-blue-600">{product.analytics?.averageTimeOnPage || 45}s</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Taxa de Rejeição</p>
                      <p className="text-2xl font-bold text-orange-600">{product.analytics?.bounceRate || 35}%</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Visualizações nos Últimos 30 Dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Gráfico de visualizações seria exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações do Vendedor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nome</p>
                    <p className="font-medium">{product.vendor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ID do Vendedor</p>
                    <p className="font-medium">#{product.vendor.id}</p>
                  </div>
                  {product.vendor.email && (
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{product.vendor.email}</p>
                    </div>
                  )}
                  {product.vendor.phone && (
                    <div>
                      <p className="text-sm text-gray-600">Telefone</p>
                      <p className="font-medium">{product.vendor.phone}</p>
                    </div>
                  )}
                  {product.vendor.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{product.vendor.location}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{product.vendor.rating || 4.5}</p>
                    <p className="text-sm text-gray-600">Avaliação</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{product.vendor.totalSales || 156}</p>
                    <p className="text-sm text-gray-600">Total de Vendas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Histórico do Produto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Produto criado</p>
                      <p className="text-sm text-gray-600">
                        {new Date(product.createdAt).toLocaleDateString("pt-BR")} às{" "}
                        {new Date(product.createdAt).toLocaleTimeString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  {product.reviewedAt && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          product.status === "approved"
                            ? "bg-green-500"
                            : product.status === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium">
                          Produto{" "}
                          {product.status === "approved"
                            ? "aprovado"
                            : product.status === "rejected"
                              ? "rejeitado"
                              : "revisado"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(product.reviewedAt).toLocaleDateString("pt-BR")} às{" "}
                          {new Date(product.reviewedAt).toLocaleTimeString("pt-BR")}
                        </p>
                        {product.reviewedBy && <p className="text-sm text-gray-500">Por: {product.reviewedBy}</p>}
                        {product.rejectionReason && (
                          <p className="text-sm text-red-600 mt-1">Motivo: {product.rejectionReason}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Última atualização</p>
                      <p className="text-sm text-gray-600">
                        {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Ações */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          {onEdit && (
            <Button onClick={() => onEdit(product)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          )}

          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <ExternalLink className="h-4 w-4" />
            Ver na Loja
          </Button>

          {product.status === "pending" && onApprove && (
            <Button
              onClick={() => onApprove(product)}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Aprovar
            </Button>
          )}

          {product.status === "pending" && onReject && (
            <Button onClick={() => onReject(product)} variant="destructive" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rejeitar
            </Button>
          )}

          {onDelete && (
            <Button onClick={() => onDelete(product)} variant="destructive" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Excluir
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
