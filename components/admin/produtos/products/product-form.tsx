"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

export interface ProductFormValues {
  id?: string;
  name: string;
  description: string;
  categoryId: string;
  type: "venda" | "locacao" | "servico";
  price: number;
}

import type { Category } from "../categories/categories-management";

interface ProductFormProps {
  product?: ProductFormValues;
  onSave: (product: ProductFormValues) => void;
  onCancel: () => void;
  categoriesList: Category[];
}

export function ProductForm({
  product,
  onSave,
  onCancel,
  categoriesList,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormValues>({
    name: product?.name || "",
    description: product?.description || "",
    categoryId: product?.categoryId || "",
    type: product?.type || "venda",
    price: product?.price || 0,
    ...product,
  });

  // Autocomplete categoria
  const [categorySearch, setCategorySearch] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedCategory = categoriesList.find(cat => cat.id === formData.categoryId);
  // O valor do input: sempre o texto digitado, exceto ao selecionar uma sugestão
  const inputValue = showSuggestions ? categorySearch : (selectedCategory ? selectedCategory.name : categorySearch);
  const filteredCategories =
    categorySearch.length > 0
      ? categoriesList.filter((cat) =>
          cat.name.toLowerCase().includes(categorySearch.toLowerCase())
        )
      : categoriesList;

  const handleChange = (field: keyof ProductFormValues, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {product && product.id ? "Editar Produto" : "Novo Produto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="mt-1"
            />
          </div>
          <div className="relative">
            <Label htmlFor="categoryId">Categoria</Label>
            <div className="flex items-center gap-2 relative">
              <Input
                id="categoryId"
                ref={inputRef}
                autoComplete="off"
                placeholder="Busque por categoria..."
                value={inputValue}
                onChange={e => {
                  setCategorySearch(e.target.value);
                  setShowSuggestions(true);
                  // Se apagar tudo, remove seleção
                  if (e.target.value === "") {
                    setFormData(prev => ({ ...prev, categoryId: "" }));
                  }
                }}
                onFocus={() => {
                  setShowSuggestions(true);
                  setCategorySearch("");
                }}
                required
              />
              {selectedCategory && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
                  title="Limpar seleção"
                  tabIndex={-1}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, categoryId: "" }));
                    setCategorySearch("");
                    setShowSuggestions(true);
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                >
                  ×
                </Button>
              )}
              {showSuggestions && (
                <div className="absolute z-10 bg-white border rounded w-full max-h-48 overflow-y-auto shadow-lg mt-1 left-0">
                  {filteredCategories.length === 0 && (
                    <div className="p-2 text-gray-500">Nenhuma categoria encontrada</div>
                  )}
                  {filteredCategories.map(cat => (
                    <div
                      key={cat.id}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${cat.id === formData.categoryId ? "bg-gray-100" : ""}`}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, categoryId: cat.id }));
                        setCategorySearch(cat.name);
                        setShowSuggestions(false);
                        setTimeout(() => inputRef.current?.blur(), 100);
                      }}
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <select
              id="type"
              className="w-full border rounded px-2 py-2 mt-1"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              required
            >
              <option value="venda">Venda</option>
              <option value="locacao">Locação</option>
              <option value="servico">Serviço</option>
            </select>
          </div>
          <div>
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              className="mt-1"
              min={0}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Salvar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
