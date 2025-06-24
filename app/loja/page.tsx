"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useWishlist } from "@/components/providers/wishlist-provider";

const products = [
  {
    id: 1,
    name: "Kit Decoração Casamento Rústico",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    type: "locacao",
    category: "decoracao",
    vendor: "Decorações Encantadas",
  },
  {
    id: 2,
    name: "Mesa Redonda Branca 8 Lugares",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    type: "locacao",
    category: "moveis",
    vendor: "Móveis & Eventos",
  },
  {
    id: 3,
    name: "Conjunto Taças Cristal",
    price: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 67,
    type: "venda",
    category: "utensilios",
    vendor: "Casa & Mesa",
  },
  {
    id: 4,
    name: "Iluminação LED Ambiente",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 45,
    type: "locacao",
    category: "iluminacao",
    vendor: "Luz & Ambiente",
  },
  {
    id: 5,
    name: "Cadeiras Tiffany Transparente",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 156,
    type: "locacao",
    category: "moveis",
    vendor: "Móveis & Eventos",
  },
  {
    id: 6,
    name: "Arranjo Floral Premium",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 78,
    type: "venda",
    category: "decoracao",
    vendor: "Flores & Arte",
  },
];

const categories = [
  { id: "decoracao", name: "Decoração", count: 45 },
  { id: "moveis", name: "Móveis", count: 32 },
  { id: "utensilios", name: "Utensílios", count: 28 },
  { id: "iluminacao", name: "Iluminação", count: 15 },
  { id: "som", name: "Som", count: 12 },
];

export default function LojaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevancia");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(product.type);
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && typeMatch && priceMatch;
  });

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
    } else {
      addToWishlist({
        id: product.id.toString(),
        nome: product.name,
        categoria: product.category || "",
        precoOriginal: product.originalPrice || null,
        desconto: null, // Adapte se houver desconto
        avaliacao: product.rating || 0,
        avaliacoes: product.reviews || 0,
        vendedor: product.vendor || "",
        imagem: product.image || "/placeholder.svg",
        disponivel: true, // Adapte se houver lógica de disponibilidade
        promocao: false, // Adapte se houver lógica de promoção
        type: product.type as "venda" | "locacao" | "servico",
        price: product.price, // valor numérico
        image: product.image,
        name: product.name,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-fest-black2">Loja</h1>
          <p className="text-gray-600">
            {filteredProducts.length} produtos encontrados
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevancia">Relevância</SelectItem>
              <SelectItem value="menor-preco">Menor Preço</SelectItem>
              <SelectItem value="maior-preco">Maior Preço</SelectItem>
              <SelectItem value="mais-vendidos">Mais Vendidos</SelectItem>
              <SelectItem value="melhor-avaliados">Melhor Avaliados</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros */}
        <div
          className={`lg:col-span-1 space-y-6 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Categorias</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category.id,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== category.id)
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm flex-1 cursor-pointer"
                    >
                      {category.name} ({category.count})
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Tipo</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="venda"
                    checked={selectedTypes.includes("venda")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTypes([...selectedTypes, "venda"]);
                      } else {
                        setSelectedTypes(
                          selectedTypes.filter((t) => t !== "venda")
                        );
                      }
                    }}
                  />
                  <label htmlFor="venda" className="text-sm cursor-pointer">
                    Venda
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="locacao"
                    checked={selectedTypes.includes("locacao")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTypes([...selectedTypes, "locacao"]);
                      } else {
                        setSelectedTypes(
                          selectedTypes.filter((t) => t !== "locacao")
                        );
                      }
                    }}
                  />
                  <label htmlFor="locacao" className="text-sm cursor-pointer">
                    Locação
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Faixa de Preço</h3>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Produtos */}
        <div className="lg:col-span-3">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative">
                        <Link href={`/produto/${product.id}`}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-64 object-cover rounded-t-lg"
                          />
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                            isInWishlist(product.id.toString())
                              ? "text-red-500"
                              : ""
                          }`}
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isInWishlist(product.id.toString())
                                ? "fill-current"
                                : ""
                            }`}
                          />
                        </Button>
                        <Badge
                          variant="secondary"
                          className="absolute bottom-2 right-2 bg-fest-secondary"
                        >
                          {product.type === "locacao" ? "Locação" : "Venda"}
                        </Badge>
                      </div>

                      <div className="p-4">
                        <Link href={`/produto/${product.id}`}>
                          <h3 className="font-semibold text-fest-black2 mb-2 line-clamp-2 hover:text-fest-primary">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                          {product.vendor}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-fest-primary">
                              R$ {product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                R$ {product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button className="w-full mt-3 bg-fest-primary hover:bg-fest-dark text-white">
                          {product.type === "locacao" ? "Alugar" : "Comprar"}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex p-4 space-x-4">
                      <Link href={`/produto/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="rounded-lg object-cover"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link href={`/produto/${product.id}`}>
                              <h3 className="font-semibold text-fest-black2 mb-2 hover:text-fest-primary">
                                {product.name}
                              </h3>
                            </Link>
                            <div className="flex items-center mb-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600 ml-1">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {product.vendor}
                            </p>
                            <Badge variant="outline">
                              {product.type === "locacao" ? "Locação" : "Venda"}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={
                                isInWishlist(product.id.toString())
                                  ? "text-red-500"
                                  : ""
                              }
                              onClick={() => handleWishlistToggle(product)}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  isInWishlist(product.id.toString())
                                    ? "fill-current"
                                    : ""
                                }`}
                              />
                            </Button>
                            <div className="mt-2">
                              <span className="text-lg font-bold text-fest-primary">
                                R$ {product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  R$ {product.originalPrice.toFixed(2)}
                                </div>
                              )}
                            </div>
                            <Button className="mt-2 bg-fest-primary hover:bg-fest-dark text-white">
                              {product.type === "locacao"
                                ? "Alugar"
                                : "Comprar"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
