import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Calendar, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    title: "Venda",
    description: "Produtos para comprar e levar para casa",
    icon: ShoppingBag,
    image: "/placeholder.svg?height=200&width=300",
    href: "/categoria/venda",
    color: "bg-fest-primary",
  },
  {
    id: 2,
    title: "Locação",
    description: "Alugue, monte e devolva com facilidade",
    icon: Calendar,
    image: "/placeholder.svg?height=200&width=300",
    href: "/categoria/locacao",
    color: "bg-black",
  },
  {
    id: 3,
    title: "Serviços",
    description: "Profissionais especializados em eventos",
    icon: Users,
    image: "/placeholder.svg?height=200&width=300",
    href: "/categoria/servicos",
    color: "bg-gray-800",
  },
]

export function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Nossas Categorias</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre tudo que precisa para seu evento em um só lugar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 ${category.color} opacity-80`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <category.icon className="h-16 w-16 text-white" />
                    </div>
                  </div>

                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-black mb-3">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
