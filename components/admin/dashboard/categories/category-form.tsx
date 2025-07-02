"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Category {
  id?: string
  name: string
  description: string
  status: "active" | "inactive"
  productsCount?: number
  createdAt?: string
  image?: string
}

interface CategoryFormProps {
  category?: Category
  onSave: (category: Category) => void
  onCancel: () => void
  isEditing?: boolean
}

export function CategoryForm({ category, onSave, onCancel, isEditing = false }: CategoryFormProps) {
  const [formData, setFormData] = useState<Category>({
    name: category?.name || "",
    description: category?.description || "",
    status: category?.status || "active",
    image: category?.image || "",
    ...category,
  })

  const [imagePreview, setImagePreview] = useState<string>(category?.image || "")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof Category, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSave(formData)
    } catch (error) {
      console.error("Erro ao salvar categoria:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeImage = () => {
    setImagePreview("")
    setFormData((prev) => ({ ...prev, image: "" }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onCancel} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-3xl font-bold text-gray-900">{isEditing ? "Editar Categoria" : "Nova Categoria"}</h2>
              {isEditing && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Editando
                </Badge>
              )}
              {!isEditing && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Criando
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mt-1">
              {isEditing
                ? `Atualize as informações da categoria "${category?.name}"`
                : "Crie uma nova categoria para organizar seus produtos"}
            </p>
          </div>
        </div>
        {isEditing && category?.id && (
          <Badge variant="outline" className="text-sm font-mono">
            ID: {category.id}
          </Badge>
        )}
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome da Categoria *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ex: Decoração, Som e Iluminação..."
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Descreva o tipo de produtos desta categoria..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Imagem da Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-2 right-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Clique para fazer upload da imagem</p>
                      <p className="text-sm text-gray-400">PNG, JPG até 5MB</p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      {imagePreview ? "Alterar Imagem" : "Fazer Upload"}
                    </Button>
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="status">Categoria Ativa</Label>
                    <p className="text-sm text-gray-600 mt-1">Categorias ativas aparecem na loja</p>
                  </div>
                  <Switch
                    id="status"
                    checked={formData.status === "active"}
                    onCheckedChange={(checked) => handleInputChange("status", checked ? "active" : "inactive")}
                  />
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Produtos:</span>
                    <span className="font-medium">{category?.productsCount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Criado em:</span>
                    <span className="font-medium">
                      {category?.createdAt ? new Date(category.createdAt).toLocaleDateString("pt-BR") : "-"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={isLoading || !formData.name.trim()}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {isEditing ? "Atualizando..." : "Criando..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Atualizar Categoria" : "Criar Categoria"}
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="w-full">
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
