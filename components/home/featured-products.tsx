import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredProducts = [
  {
    id: 1,
    name: "Kit Decoração Casamento Rústico",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    type: "locacao",
    badge: "Mais Alugado",
  },
  {
    id: 2,
    name: "Mesa Redonda Branca 8 Lugares",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    type: "locacao",
  },
  {
    id: 3,
    name: "Conjunto Taças Cristal",
    price: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 67,
    type: "venda",
    badge: "Oferta",
  },
  {
    id: 4,
    name: "Iluminação LED Ambiente",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 45,
    type: "locacao",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Produtos em Destaque</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra os produtos mais populares e bem avaliados da nossa plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 bg-white border-0">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-fest-primary text-white">{product.badge}</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 hover:text-fest-primary"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge variant="secondary" className="absolute bottom-4 right-4 bg-black text-white">
                    {product.type === "locacao" ? "Locação" : "Venda"}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-black mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-black">R$ {product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full bg-fest-primary hover:bg-fest-dark text-white">
                    {product.type === "locacao" ? "Alugar" : "Comprar"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-black text-black hover:bg-black hover:text-white"
            asChild
          >
            <Link href="/produtos">Ver Todos os Produtos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
