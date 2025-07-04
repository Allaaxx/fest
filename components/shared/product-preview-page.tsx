"use client";
import * as yup from "yup";
// Schema de validação Yup para produto
const productSchema = yup.object().shape({
  name: yup.string().required("Nome do produto é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  categoryId: yup.string().required("Categoria é obrigatória"),
  type: yup
    .string()
    .oneOf(["venda", "locacao", "servico"], "Tipo inválido")
    .required("Tipo é obrigatório"),
  price: yup
    .number()
    .typeError("Preço deve ser um número")
    .min(0, "Preço não pode ser negativo")
    .required("Preço é obrigatório"),
  vendor: yup.object({
    id: yup.string().required("Vendedor é obrigatório"),
    name: yup.string().required("Nome do vendedor é obrigatório"),
  }),
  features: yup
    .array()
    .of(yup.string().required("Característica não pode ser vazia")),
});

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductImageCarousel from "@/components/shared/product-image-carousel";
import ProductPreviewPanelAdd from "@/components/shared/product-preview-panel-add";
import ProductPreviewPanelEdit from "@/components/shared/product-preview-panel-edit";

interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  type: "venda" | "locacao" | "servico" | "";
  price: number | string;
  originalPrice?: number | string;
  stock?: number | string;
  status: "active" | "inactive" | "draft" | "pending" | "approved" | "rejected";
  sales: number;
  views: number;
  rating: number;
  createdAt: string;
  image: string;
  images: File[];
  features: string[];
  vendor: {
    name: string;
    id: string;
  };
  availability?: boolean;
  delivery?: boolean;
  pickup?: boolean;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

type Mode = "add" | "edit";

interface ProductPreviewPageProps {
  mode: Mode;
  initialProduct?: Product;
  onSave?: (product: Product) => void;
  onCancel?: () => void;
}

// Painel de preview (carrossel + tabs)
function ProductPreviewPanel({
  productData,
  selectedImage,
  setSelectedImage,
}: {
  productData: Product;
  selectedImage: number;
  setSelectedImage: (idx: number) => void;
}) {
  return (
    <div className="flex flex-col items-center w-full lg:w-1/2 mb-5 mt-5 sm:p-5">
      <ProductImageCarousel
        images={productData.images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        productName={productData.name}
      />
      <div className="w-full lg:w-2/2 mt-6 lg:mt-10 sm:px-10 mx-auto mb-12 ">
        <Tabs
          defaultValue="description"
          className="w-full"
          orientation={
            typeof window !== "undefined" && window.innerWidth < 1024
              ? "vertical"
              : "horizontal"
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="features">Características</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: productData.description }}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">O que está incluso:</h3>
                <ul className="space-y-2">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-fest-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Painel de edição/criação (direita)
function ProductEditPanel({
  mode,
  productData,
  formatCurrency,
  handleInputChange,
  handleVendorChange,
  handleFeatureChange,
  addFeature,
  removeFeature,
  handleImageUpload,
  removeImage,
  onSave,
  categories = [],
  loadingCategories = false,
  errorCategories = null,
}: {
  mode: Mode;
  productData: Product;
  formatCurrency: (value: string) => string;
  handleInputChange: (field: string, value: any) => void;
  handleVendorChange: (field: string, value: string) => void;
  handleFeatureChange: (idx: number, value: string) => void;
  addFeature: () => void;
  removeFeature: (idx: number) => void;
  handleImageUpload: (files: FileList) => void;
  removeImage: (idx: number) => void;
  onSave?: (product: Product) => void;
  categories?: { id: string; name: string; slug: string }[];
  loadingCategories?: boolean;
  errorCategories?: string | null;
}) {
  if (mode === "add") {
    return (
      <ProductPreviewPanelAdd
        productData={productData}
        formatCurrency={formatCurrency}
        onFieldEdit={handleInputChange}
        onFeatureEdit={handleFeatureChange}
        onRemoveFeature={removeFeature}
        onAddFeature={addFeature}
        onImageUpload={handleImageUpload}
        onRemoveImage={removeImage}
        onSave={() => onSave && onSave(productData)}
        categories={categories}
        loadingCategories={loadingCategories}
        errorCategories={errorCategories}
      />
    );
  }
  return (
    <ProductPreviewPanelEdit
      productData={productData}
      formatCurrency={formatCurrency}
      onToggleEdit={() => {}}
      onFieldEdit={handleInputChange}
      onVendorEdit={handleVendorChange}
      onFeatureEdit={handleFeatureChange}
      onRemoveFeature={removeFeature}
      onAddFeature={addFeature}
      onImageUpload={handleImageUpload}
      onRemoveImage={removeImage}
      onSave={() => onSave && onSave(productData)}
      categories={categories}
      loadingCategories={loadingCategories}
      errorCategories={errorCategories}
    />
  );
}

import { useRouter } from "next/navigation";

export default function ProductPreviewPage({
  mode,
  initialProduct,
  onSave,
  onCancel,
}: ProductPreviewPageProps) {
  const router = useRouter();
  // Se for modo edição e não houver produto, mostra mensagem amigável
  if (mode === "edit" && !initialProduct) {
    return (
      <Card className="max-w-xl mx-auto mt-12">
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Nenhum produto selecionado para edição
          </h3>
          <p className="text-gray-500 mb-4">
            Selecione um produto na lista para editar ou volte para a listagem.
          </p>
          <button
            type="button"
            onClick={
              onCancel || (() => router.push("/admin/dashboard/products"))
            }
            className="mt-4 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Voltar para lista
          </button>
        </CardContent>
      </Card>
    );
  }

  const [productData, setProductData] = useState<Product>(
    initialProduct || {
      id: "",
      name: "",
      description: "",
      categoryId: "",
      category: null,
      type: "",
      price: "",
      originalPrice: "",
      stock: "",
      status: "active",
      sales: 0,
      views: 0,
      rating: 0,
      createdAt: "",
      image: "",
      vendor: { name: "", id: "" },
      features: [""],
      images: [],
      availability: true,
      delivery: false,
      pickup: false,
    }
  );
  // Hook para buscar categorias
  type Category = { id: string; name: string; slug: string };
  function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
      setLoading(true);
      fetch("/api/categorias")
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Erro ao buscar categorias");
          setLoading(false);
        });
    }, []);
    return { categories, loading, error };
  }
  const [selectedImage, setSelectedImage] = useState(0);

  // Handlers agrupados em um único objeto para passar facilmente aos subcomponentes
  const handlers = {
    handleInputChange: (field: string, value: any) => {
      setProductData((prev) => ({ ...prev, [field]: value }));
    },
    handleVendorChange: (field: string, value: string) => {
      setProductData((prev) => ({
        ...prev,
        vendor: { ...prev.vendor, [field]: value },
      }));
    },
    handleFeatureChange: (idx: number, value: string) => {
      setProductData((prev) => ({
        ...prev,
        features: prev.features.map((f, i) => (i === idx ? value : f)),
      }));
    },
    addFeature: () => {
      setProductData((prev) => ({ ...prev, features: [...prev.features, ""] }));
    },
    removeFeature: (idx: number) => {
      setProductData((prev) => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== idx),
      }));
    },
    handleImageUpload: (files: FileList) => {
      const newImages = Array.from(files).slice(
        0,
        5 - productData.images.length
      );
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    },
    removeImage: (index: number) => {
      setProductData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    },
    formatCurrency: (value: string) => {
      if (!value) return "";
      const clean = value.replace(/[^\d,]/g, "").replace(/,/g, ".");
      const numericValue = Number.parseFloat(clean);
      if (isNaN(numericValue)) return "";
      return numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  };

  // Busca categorias para o select
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  // Salvar produto (PUT na API)
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setValidationErrors([]);
    try {
      await productSchema.validate(productData, { abortEarly: false });
      const res = await fetch(`/api/produtos/${productData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Erro ao salvar produto");
      router.push("/admin/dashboard/products");
    } catch (err: any) {
      if (err.name === "ValidationError") {
        setValidationErrors(err.errors);
      } else {
        setSaveError(err.message || "Erro ao salvar produto");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="container mx-auto my-4 flex flex-col lg:flex-row">
      <ProductPreviewPanel
        productData={productData}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:p-5">
        <ProductEditPanel
          mode={mode}
          productData={productData}
          formatCurrency={handlers.formatCurrency}
          handleInputChange={handlers.handleInputChange}
          handleVendorChange={handlers.handleVendorChange}
          handleFeatureChange={handlers.handleFeatureChange}
          addFeature={handlers.addFeature}
          removeFeature={handlers.removeFeature}
          handleImageUpload={handlers.handleImageUpload}
          removeImage={handlers.removeImage}
          onSave={handleSave}
          categories={categories}
          loadingCategories={loadingCategories}
          errorCategories={errorCategories}
        />
        {validationErrors.length > 0 && (
          <div className="text-red-600 text-center space-y-1">
            {validationErrors.map((err, idx) => (
              <div key={idx}>{err}</div>
            ))}
          </div>
        )}
        {saveError && (
          <div className="text-red-600 text-center">{saveError}</div>
        )}
        {onCancel && (
          <button
            type="button"
            className="mt-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
        {saving && <div className="text-center text-gray-500">Salvando...</div>}
      </div>
    </section>
  );
}
