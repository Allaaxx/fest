"use client"

import { ServiceGrid } from "@/components/shared/service-grid"

const services = [
  {
    id: 1,
    name: "Buffet Completo para Casamento",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 45,
    type: "servico" as const,
    category: "buffet",
    vendor: "Buffet Excellence",
    description: "Serviço completo de buffet para casamentos com cardápio personalizado",
  },
  {
    id: 2,
    name: "Fotografia Profissional",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 78,
    type: "servico" as const,
    category: "fotografia",
    vendor: "Foto Arte Studio",
    description: "Cobertura fotográfica completa do seu evento",
  },
  {
    id: 3,
    name: "DJ e Som Profissional",
    price: 599.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 67,
    type: "servico" as const,
    category: "som",
    vendor: "Sound Events",
    description: "DJ profissional com equipamento de som de alta qualidade",
  },
]

export default function ServicosPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-fest-black2 mb-4">Serviços para Eventos</h1>
        <p className="text-lg text-gray-600">Profissionais especializados para seu evento</p>
      </div>

      <ServiceGrid services={services} />
    </div>
  )
}
