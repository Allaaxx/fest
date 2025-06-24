"use client"

import { ProductGrid } from "@/components/shared/product-grid"

const vendaProducts = [
  {
    id: 1,
    name: "Conjunto Taças Cristal Premium",
    price: 159.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 67,
    type: "venda" as const,
    category: "utensilios",
    vendor: "Casa & Mesa",
  },
  {
    id: 2,
    name: "Kit Pratos Porcelana Branca",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 45,
    type: "venda" as const,
    category: "utensilios",
    vendor: "Casa & Mesa",
  },
  {
    id: 3,
    name: "Arranjo Floral Permanente",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 78,
    type: "venda" as const,
    category: "decoracao",
    vendor: "Flores & Arte",
  },
]

export default function VendaPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-fest-black2 mb-4">Produtos para Venda</h1>
        <p className="text-lg text-gray-600">Compre e leve para casa</p>
      </div>

      <ProductGrid products={vendaProducts} />
    </div>
  )
}
