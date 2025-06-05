"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SwiperCore from "swiper";
import "swiper/css";
import ProductImageCarousel from "@/components/shared/product-image-carousel";
import ProductPreviewPanelAdd from "@/components/shared/product-preview-panel-add";

export default function NewProductPreviewEditable() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    type: "",
    price: "",
    dailyPrice: "",
    weeklyPrice: "",
    stock: "",
    images: [] as File[],
    features: [""],
    tags: "",
    availability: true,
    delivery: false,
    pickup: true,
    vendor: { name: "", location: "" },
    rating: 0,
    reviews: 0,
    originalPrice: "",
    id: "",
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };
  const handleVendorChange = (field: string, value: string) => {
    setProductData((prev) => ({
      ...prev,
      vendor: { ...prev.vendor, [field]: value },
    }));
  };
  const handleFeatureChange = (idx: number, value: string) => {
    setProductData((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === idx ? value : f)),
    }));
  };
  const addFeature = () => {
    setProductData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };
  const removeFeature = (idx: number) => {
    setProductData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };
  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).slice(0, 5 - productData.images.length);
    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };
  const removeImage = (index: number) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  const formatCurrency = (value: string) => {
    if (!value) return "";
    // Remove tudo que não for número ou vírgula
    const clean = value.replace(/[^\d,]/g, "").replace(/,/g, ".");
    const numericValue = Number.parseFloat(clean);
    if (isNaN(numericValue)) return "";
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <section className="container mx-auto my-4 mt-16 flex flex-col lg:flex-row">
        {/* Painel esquerdo: carrossel funcional */}
        <div className="flex flex-col items-center w-full lg:w-1/2 mb-5 mt-5 sm:p-5">
          <ProductImageCarousel
            images={productData.images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            productName={productData.name}
          />

          {/* Tabs com Informações Detalhadas */}
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
                      dangerouslySetInnerHTML={{
                        __html: productData.description,
                      }}
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
        {/* Painel direito: preview puro, sem inputs */}
        {/* Painel direito: painel de criação de produto */}
        <ProductPreviewPanelAdd
          productData={productData}
          formatCurrency={formatCurrency}
          onFieldEdit={handleInputChange}
          onFeatureEdit={handleFeatureChange}
          onRemoveFeature={removeFeature}
          onAddFeature={addFeature}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
          onSave={() => {
            // Aqui você pode implementar a lógica de salvar o novo produto
            console.log("Salvar produto:", productData);
          }}
        />
      </section>
    </>
  );
}
