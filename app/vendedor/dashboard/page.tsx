"use client"

import type React from "react"

import { useState } from "react"
import { Package, Calendar, MessageSquare, DollarSign, Star, Plus, Eye, Edit, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const stats = [
  {
    title: "Vendas do Mês",
    value: "R$ 12.450",
    change: "+12%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Produtos Ativos",
    value: "48",
    change: "+3",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Locações Ativas",
    value: "12",
    change: "+5",
    icon: Calendar,
    color: "text-purple-600",
  },
  {
    title: "Avaliação Média",
    value: "4.8",
    change: "+0.2",
    icon: Star,
    color: "text-yellow-600",
  },
]

const products = [
  {
    id: 1,
    name: "Kit Decoração Casamento",
    type: "locacao",
    price: 299.99,
    stock: 5,
    status: "ativo",
    views: 234,
  },
  {
    id: 2,
    name: "Mesa Redonda Branca",
    type: "locacao",
    price: 45.0,
    stock: 8,
    status: "ativo",
    views: 156,
  },
  {
    id: 3,
    name: "Conjunto Taças Cristal",
    type: "venda",
    price: 159.99,
    stock: 12,
    status: "ativo",
    views: 89,
  },
  {
    id: 4,
    name: "Iluminação LED Ambiente",
    type: "locacao",
    price: 199.99,
    stock: 3,
    status: "pausado",
    views: 67,
  },
]

const rentals = [
  {
    id: 1,
    product: "Kit Decoração Casamento",
    client: "Maria Silva",
    startDate: "2024-02-15",
    endDate: "2024-02-16",
    status: "confirmado",
    value: 299.99,
  },
  {
    id: 2,
    product: "Mesa Redonda Branca",
    client: "João Santos",
    startDate: "2024-02-20",
    endDate: "2024-02-21",
    status: "pendente",
    value: 45.0,
  },
]

export default function VendedorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false)
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    type: "",
    stock: "",
    images: [] as File[],
    features: [] as string[],
    newFeature: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setProductForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5), // Máximo 5 imagens
    }))
  }

  const removeImage = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addFeature = () => {
    if (productForm.newFeature.trim()) {
      setProductForm((prev) => ({
        ...prev,
        features: [...prev.features, prev.newFeature.trim()],
        newFeature: "",
      }))
    }
  }

  const removeFeature = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simular criação do produto
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Produto criado com sucesso!")
      setIsCreateProductOpen(false)
      setProductForm({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        type: "",
        stock: "",
        images: [],
        features: [],
        newFeature: "",
      })
    } catch (error) {
      toast.error("Erro ao criar produto. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-fest-black2">Dashboard do Vendedor</h1>
          <p className="text-gray-600">Gerencie seus produtos, locações e vendas</p>
        </div>
        <Dialog open={isCreateProductOpen} onOpenChange={setIsCreateProductOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Produto</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmitProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações Básicas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Básicas</h3>

                  <div>
                    <Label htmlFor="name">Nome do Produto *</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Kit Decoração Casamento Rústico"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Descreva seu produto em detalhes..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Preço *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice">Preço Original</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={productForm.originalPrice}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, originalPrice: e.target.value }))}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Categoria *</Label>
                      <Select
                        value={productForm.category}
                        onValueChange={(value) => setProductForm((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="decoracao">Decoração</SelectItem>
                          <SelectItem value="moveis">Móveis</SelectItem>
                          <SelectItem value="utensilios">Utensílios</SelectItem>
                          <SelectItem value="iluminacao">Iluminação</SelectItem>
                          <SelectItem value="som">Som</SelectItem>
                          <SelectItem value="buffet">Buffet</SelectItem>
                          <SelectItem value="fotografia">Fotografia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Tipo *</Label>
                      <Select
                        value={productForm.type}
                        onValueChange={(value) => setProductForm((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="venda">Venda</SelectItem>
                          <SelectItem value="locacao">Locação</SelectItem>
                          <SelectItem value="servico">Serviço</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="stock">Estoque/Disponibilidade *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, stock: e.target.value }))}
                      placeholder="Quantidade disponível"
                      required
                    />
                  </div>
                </div>

                {/* Imagens e Características */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Imagens e Características</h3>

                  <div>
                    <Label htmlFor="images">Imagens do Produto (máx. 5)</Label>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-1"
                    />

                    {productForm.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {productForm.images.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file) || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Características/Itens Inclusos</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={productForm.newFeature}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, newFeature: e.target.value }))}
                        placeholder="Ex: 20 arranjos florais"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                      />
                      <Button type="button" onClick={addFeature} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {productForm.features.length > 0 && (
                      <div className="space-y-2 mt-3">
                        {productForm.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{feature}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(index)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Configurações Adicionais</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="featured" />
                        <Label htmlFor="featured" className="text-sm">
                          Produto em destaque
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delivery" />
                        <Label htmlFor="delivery" className="text-sm">
                          Oferece entrega
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="assembly" />
                        <Label htmlFor="assembly" className="text-sm">
                          Inclui montagem
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateProductOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-fest-primary hover:bg-fest-dark text-white"
                  disabled={
                    isSubmitting ||
                    !productForm.name ||
                    !productForm.description ||
                    !productForm.price ||
                    !productForm.category ||
                    !productForm.type
                  }
                >
                  {isSubmitting ? "Criando..." : "Criar Produto"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="rentals">Locações</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Kit Decoração Casamento</p>
                        <p className="text-sm text-gray-600">Maria Silva - Hoje</p>
                      </div>
                      <span className="font-bold text-fest-primary">R$ 299,99</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximas Locações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rentals.map((rental) => (
                    <div key={rental.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{rental.product}</p>
                        <p className="text-sm text-gray-600">
                          {rental.client} - {rental.startDate}
                        </p>
                      </div>
                      <Badge variant={rental.status === "confirmado" ? "default" : "secondary"}>{rental.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Meus Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Visualizações</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.type === "locacao" ? "Locação" : "Venda"}</Badge>
                      </TableCell>
                      <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge variant={product.status === "ativo" ? "default" : "secondary"}>{product.status}</Badge>
                      </TableCell>
                      <TableCell>{product.views}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="rentals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Locações</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data Início</TableHead>
                    <TableHead>Data Fim</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rentals.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell className="font-medium">{rental.product}</TableCell>
                      <TableCell>{rental.client}</TableCell>
                      <TableCell>{new Date(rental.startDate).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{new Date(rental.endDate).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge variant={rental.status === "confirmado" ? "default" : "secondary"}>
                          {rental.status}
                        </Badge>
                      </TableCell>
                      <TableCell>R$ {rental.value.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
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

        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mensagens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Sistema de chat em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
