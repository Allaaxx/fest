"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye, Filter, MoreHorizontal, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Category {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  productsCount: number
  createdAt: string
  image?: string
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Decoração",
    description: "Itens decorativos para festas e eventos",
    status: "active",
    productsCount: 45,
    createdAt: "2024-01-15",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Som e Iluminação",
    description: "Equipamentos de áudio e iluminação profissional",
    status: "active",
    productsCount: 23,
    createdAt: "2024-01-10",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Mobiliário",
    description: "Mesas, cadeiras e móveis para eventos",
    status: "inactive",
    productsCount: 67,
    createdAt: "2024-01-08",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Buffet",
    description: "Serviços de alimentação e bebidas",
    status: "active",
    productsCount: 12,
    createdAt: "2024-01-05",
    image: "/placeholder.svg?height=40&width=40",
  },
]

interface CategoriesListProps {
  onEdit: (category: Category) => void
  onAdd: () => void
}

export function CategoriesList({ onEdit, onAdd }: CategoriesListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")

  const filteredCategories = mockCategories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || category.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: string) => {
    // Implementar lógica de exclusão
    console.log("Delete category:", id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Categorias</h2>
          <p className="text-gray-600 mt-1">Gerencie as categorias dos seus produtos</p>
        </div>
        <Button onClick={onAdd} className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px]">
                  <Filter className="h-4 w-4 mr-2" />
                  {statusFilter === "all" ? "Todos" : statusFilter === "active" ? "Ativo" : "Inativo"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>Todos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>Ativo</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Inativo</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Categorias</p>
                <p className="text-2xl font-bold text-gray-900">{mockCategories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categorias Ativas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCategories.filter((c) => c.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Produtos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCategories.reduce((acc, cat) => acc + cat.productsCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-gray-600 max-w-xs truncate">{category.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={category.status === "active" ? "default" : "secondary"}
                      className={category.status === "active" ? "bg-green-100 text-green-800" : ""}
                    >
                      {category.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{category.productsCount}</span>
                  </TableCell>
                  <TableCell>{new Date(category.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(category)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(category.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
