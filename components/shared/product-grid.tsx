"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/components/providers/wishlist-provider"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  type: "venda" | "locacao"
  category: string
  vendor: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString())
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type,
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
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
                  isInWishlist(product.id.toString()) ? "text-red-500" : ""
                }`}
                onClick={() => handleWishlistToggle(product)}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(product.id.toString()) ? "fill-current" : ""}`} />
              </Button>
              <Badge variant="secondary" className="absolute bottom-2 right-2 bg-fest-secondary">
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

              <p className="text-sm text-gray-600 mb-2">{product.vendor}</p>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg font-bold text-fest-primary">R$ {product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <Button className="w-full bg-fest-primary hover:bg-fest-dark text-white" asChild>
                <Link href={`/produto/${product.id}`}>{product.type === "locacao" ? "Alugar" : "Comprar"}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
