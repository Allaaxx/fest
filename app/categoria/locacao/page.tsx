"use client"

import { ProductGrid } from "@/components/shared/product-grid"

const locacaoProducts = [
  {
    id: 1,
    name: "Kit Decoração Casamento Rústico",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    type: "locacao" as const,
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
    type: "locacao" as const,
    category: "moveis",
    vendor: "Móveis & Eventos",
  },
  {
    id: 3,
    name: "Cadeiras Tiffany Transparente",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 156,
    type: "locacao" as const,
    category: "moveis",
    vendor: "Móveis & Eventos",
  },
]

export default function LocacaoPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-fest-black2 mb-4">Produtos para Locação</h1>
        <p className="text-lg text-gray-600">Alugue, monte e devolva</p>
      </div>

      <ProductGrid products={locacaoProducts} />
    </div>
  )
}
