import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const monteProducts = [
  {
    id: 1,
    name: "Mesa Redonda Branca",
    price: 45.0,
    image: "/placeholder.svg?height=200&width=200",
    category: "Móveis",
  },
  {
    id: 2,
    name: "Cadeiras Tiffany",
    price: 8.0,
    image: "/placeholder.svg?height=200&width=200",
    category: "Móveis",
  },
  {
    id: 3,
    name: "Toalha de Mesa Branca",
    price: 15.0,
    image: "/placeholder.svg?height=200&width=200",
    category: "Decoração",
  },
  {
    id: 4,
    name: "Centro de Mesa Flores",
    price: 25.0,
    image: "/placeholder.svg?height=200&width=200",
    category: "Decoração",
  },
]

export function MontesuaFesta() {
  const total = monteProducts.reduce((sum, product) => sum + product.price, 0)

  return (
    <section className="py-16 bg-gradient-to-br from-fest-primary/10 to-fest-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-fest-black2 mb-4">Monte sua Festa</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combine produtos para aluguel e venda e crie o evento perfeito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Produtos */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {monteProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">
                          {product.category}
                        </Badge>
                        <h3 className="font-semibold text-fest-black2">{product.name}</h3>
                        <p className="text-fest-primary font-bold">R$ {product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-fest-black2 mb-4">Resumo do Combo</h3>

                <div className="space-y-3 mb-6">
                  {monteProducts.map((product) => (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{product.name}</span>
                      <span className="font-medium">R$ {product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-fest-primary">R$ {total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">*Preços para locação por dia</p>
                </div>

                <Button className="w-full bg-fest-primary hover:bg-fest-dark text-white mb-3">
                  Alugar Combo Completo
                </Button>

                <Button variant="outline" className="w-full">
                  Personalizar Combo
                </Button>

                <div className="mt-4 p-3 bg-fest-primary/10 rounded-lg">
                  <p className="text-sm text-fest-black2">
                    <strong>Conceito Pegue e Monte:</strong> Retire no local, monte você mesmo e devolva após o evento.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
