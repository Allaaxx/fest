"use client"

import { useState, useEffect } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const recentSearches = ["Kit decoração casamento", "Mesa redonda", "Cadeiras tiffany", "Iluminação LED"]

const trendingSearches = ["Decoração rústica", "Buffet completo", "Fotógrafo casamento", "Som e iluminação"]

const searchResults = [
  {
    id: 1,
    name: "Kit Decoração Casamento Rústico",
    price: 299.99,
    image: "/placeholder.svg?height=60&width=60",
    type: "locacao",
  },
  {
    id: 2,
    name: "Mesa Redonda Branca 8 Lugares",
    price: 89.99,
    image: "/placeholder.svg?height=60&width=60",
    type: "locacao",
  },
  {
    id: 3,
    name: "Conjunto Taças Cristal",
    price: 159.99,
    image: "/placeholder.svg?height=60&width=60",
    type: "venda",
  },
]

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    setShowResults(searchTerm.length > 2)
  }, [searchTerm])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="container mx-auto flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar produtos, serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 h-12 text-lg"
              autoFocus
            />
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4">
          {!showResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Pesquisas Recentes */}
              <div>
                <h3 className="text-lg font-semibold text-fest-black2 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Pesquisas Recentes
                </h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setSearchTerm(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pesquisas em Alta */}
              <div>
                <h3 className="text-lg font-semibold text-fest-black2 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Pesquisas em Alta
                </h3>
                <div className="space-y-2">
                  {trendingSearches.map((search, index) => (
                    <button
                      key={index}
                      className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setSearchTerm(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Resultados da Busca */
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-fest-black2 mb-4">Resultados para "{searchTerm}"</h3>
              <div className="space-y-4">
                {searchResults
                  .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((product) => (
                    <Link
                      key={product.id}
                      href={`/produto/${product.id}`}
                      onClick={onClose}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-fest-black2">{product.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-fest-primary font-bold">R$ {product.price.toFixed(2)}</span>
                          <Badge variant="outline" className="text-xs">
                            {product.type === "locacao" ? "Locação" : "Venda"}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              {searchResults.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">Nenhum resultado encontrado para "{searchTerm}"</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                    Limpar busca
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
