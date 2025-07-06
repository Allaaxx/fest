"use client";

import type React from "react";

import { useState } from "react";
import * as yup from "yup";
// Schema de validação Yup para categoria (frontend)
const categorySchema = yup.object().shape({
  name: yup.string().required("Nome da categoria é obrigatório"),
  description: yup.string().nullable(),
  status: yup.string().oneOf(["active", "inactive"]).default("active"),
});
import { toast } from "sonner";
import { ArrowLeft, Upload, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { Category as CategoryType } from "./categories-management";
import { useEffect } from "react";

type Category = Omit<CategoryType, "id" | "productsCount" | "createdAt"> & {
  id?: string;
  productsCount?: number;
  createdAt?: string;
} & {
  parentId?: string | null;
};

interface CategoryFormProps {
  category?: Category;
  onSave: (category: Category) => void;
  onCancel: () => void;
  isEditing?: boolean;
  categoriesList?: CategoryType[]; // Para popular o select de pais
}

export function CategoryForm(props: CategoryFormProps) {
  const {
    category,
    onSave,
    onCancel,
    isEditing = false,
    categoriesList = [],
  } = props;
  const [formData, setFormData] = useState<Category>({
    name: category?.name || "",
    description: category?.description || "",
    status: category?.status || "active",
    image: category?.image || "",
    ...category,
    parentId: category?.parentId ? String(category.parentId) : "",
  });

  // Atualiza parentId ao editar categoria
  useEffect(() => {
    if (category) {
      setFormData((prev) => ({
        ...prev,
        parentId: category.parentId ? String(category.parentId) : "",
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const [imagePreview, setImagePreview] = useState<string>(
    category?.image || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    field: keyof Category,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Validação frontend com Yup
      await categorySchema.validate(formData, { abortEarly: false });
    } catch (err: any) {
      if (err.name === "ValidationError") {
        toast(
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Corrija os seguintes erros:</span>
            <ul className="list-disc list-inside text-sm text-red-600">
              {err.errors.map((msg: string, idx: number) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>,
          { style: { background: "#fee2e2", color: "#991b1b" } }
        );
      } else {
        toast(
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Erro de validação:</span>
            <span className="text-sm text-red-600">
              {err.message || "Erro de validação."}
            </span>
          </div>,
          { style: { background: "#fee2e2", color: "#991b1b" } }
        );
      }
      setIsLoading(false);
      return;
    }
    try {
      let savedCategory = formData;
      const slug = formData.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      if (!isEditing) {
        // Criação: POST na API
        const res = await fetch("/api/categorias", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            slug,
            description: formData.description,
            status: formData.status,
            parentId: formData.parentId || null,
            // image: formData.image, // se suportado, descomente
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          // Erro de unicidade ou outro erro customizado
          if (res.status === 409) {
            toast.error && typeof toast.error === "function"
              ? toast.error(data.error)
              : toast(data.error);
          } else {
            toast.error && typeof toast.error === "function"
              ? toast.error(data.error)
              : toast(data.error);
          }
          setIsLoading(false);
          return;
        }
        savedCategory = data.categoria;
        if (data.success && data.message) {
          toast.success && typeof toast.success === "function"
            ? toast.success(data.message)
            : toast(data.message);
        }
        // Limpar campos após criar categoria
        setFormData({ name: "", description: "", status: "active", image: "" });
        setImagePreview("");
      } else {
        // Edição: PUT na API
        const res = await fetch(`/api/categorias/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            slug,
            description: formData.description,
            status: formData.status,
            parentId: formData.parentId || null,
            image: formData.image,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 409) {
            toast.error && typeof toast.error === "function"
              ? toast.error(data.error)
              : toast(data.error);
          } else {
            toast.error && typeof toast.error === "function"
              ? toast.error(data.error)
              : toast(data.error);
          }
          setIsLoading(false);
          return;
        }
        savedCategory = data;
        if (data.success && data.message) {
          toast.success && typeof toast.success === "function"
            ? toast.success(data.message)
            : toast(data.message);
        }
      }
      onSave(savedCategory);
    } catch (error: any) {
      toast.error && typeof toast.error === "function"
        ? toast.error(error.message)
        : toast(error.message);
      // O erro HTTP (409, 500, etc) continuará aparecendo no console do navegador, mas não será mais logado manualmente aqui.
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
  };

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
              <h2 className="text-3xl font-bold text-gray-900">
                {isEditing ? "Editar Categoria" : "Nova Categoria"}
              </h2>
              {isEditing && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  Editando
                </Badge>
              )}
              {!isEditing && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
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
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Descreva o tipo de produtos desta categoria..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Categoria Pai</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="parentId">
                  Selecione a categoria pai (opcional)
                </Label>
                <select
                  id="parentId"
                  className="w-full border rounded px-2 py-2 mt-1"
                  value={formData.parentId ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      parentId: value === "" ? null : value,
                    }));
                  }}
                >
                  <option value="">Nenhuma (categoria principal)</option>
                  {categoriesList
                    .filter(
                      (cat) =>
                        !cat.parentId &&
                        (!formData.id || cat.id !== formData.id)
                    )
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="status">Categoria Ativa</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Categorias ativas aparecem na loja
                    </p>
                  </div>
                  <Switch
                    id="status"
                    checked={formData.status === "active"}
                    onCheckedChange={(checked: boolean) => {
                      setFormData((prev) => ({
                        ...prev,
                        status: checked ? "active" : "inactive",
                      }));
                    }}
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
                    <span className="font-medium">
                      {category?.productsCount || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Criado em:</span>
                    <span className="font-medium">
                      {category?.createdAt
                        ? new Date(category.createdAt).toLocaleDateString(
                            "pt-BR"
                          )
                        : "-"}
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
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
