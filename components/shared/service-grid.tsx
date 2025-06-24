import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Service {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  type: "servico"
  category: string
  vendor: string
  description: string
}

interface ServiceGridProps {
  services: Service[]
}

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="relative">
              <Link href={`/servico/${service.id}`}>
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </Link>
              <Badge variant="secondary" className="absolute top-2 left-2 bg-fest-blue text-white">
                Serviço
              </Badge>
            </div>

            <div className="p-4">
              <Link href={`/servico/${service.id}`}>
                <h3 className="font-semibold text-fest-black2 mb-2 line-clamp-2 hover:text-fest-primary">
                  {service.name}
                </h3>
              </Link>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>

              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">
                  {service.rating} ({service.reviews})
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{service.vendor}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-fest-primary">A partir de R$ {service.price.toFixed(2)}</span>
              </div>

              <Button className="w-full bg-fest-primary hover:bg-fest-dark text-white" asChild>
                <Link href={`/servico/${service.id}`}>Solicitar Orçamento</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
