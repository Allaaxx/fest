"use client"

import { useState, useMemo, useCallback } from "react"
import { MessageCircle, Search, Filter, Star, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ChatContent from "@/components/dashboard/chat/chat-content"

// Expandir os dados mockados para incluir mais campos de busca
const mockConversations = [
  {
    id: "conv1",
    vendor: {
      name: "Eventos Premium",
      avatar: undefined,
      isOnline: true,
      lastSeen: "há 2h",
      rating: 4.8,
      responseTime: "1h",
      category: "decoração",
    },
    product: {
      name: "Decoração Rústica Premium",
      price: "R$ 1.200",
      category: "decoração",
      tags: ["rústico", "premium", "casamento", "festa"],
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
    },
    lastMessage: "Posso personalizar de acordo com suas preferências.",
    lastTimestamp: "Hoje, 14:32",
    unread: true,
    messages: [
      "Olá! Como posso ajudar?",
      "Gostaria de saber sobre decoração rústica",
      "Posso personalizar de acordo com suas preferências.",
      "Trabalho com madeira de demolição",
      "Preço inclui montagem e desmontagem",
    ],
  },
  {
    id: "conv2",
    vendor: {
      name: "Som & Cia",
      avatar: undefined,
      isOnline: false,
      lastSeen: "há 5h",
      rating: 4.9,
      responseTime: "2h",
      category: "som",
    },
    product: {
      name: "DJ Profissional",
      price: "R$ 800",
      category: "entretenimento",
      tags: ["dj", "música", "festa", "casamento"],
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    },
    lastMessage: "Qual a data do seu evento?",
    lastTimestamp: "Ontem, 19:10",
    unread: false,
    messages: ["Oi!", "Preciso de DJ para casamento", "Qual a data do seu evento?", "Tenho equipamento completo"],
  },
  {
    id: "conv3",
    vendor: {
      name: "Sabores Especiais",
      avatar: undefined,
      isOnline: true,
      lastSeen: "agora",
      rating: 4.7,
      responseTime: "15min",
      category: "gastronomia",
    },
    product: {
      name: "Buffet Gourmet Completo",
      price: "R$ 45/pessoa",
      category: "alimentação",
      tags: ["buffet", "gourmet", "completo", "vegetariano"],
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    },
    lastMessage: "Temos opções vegetarianas também!",
    lastTimestamp: "Hoje, 16:45",
    unread: true,
    messages: [
      "Olá!",
      "Preciso de buffet para 100 pessoas",
      "Temos opções vegetarianas também!",
      "Cardápio personalizado disponível",
    ],
  },
  {
    id: "conv4",
    vendor: {
      name: "Momentos Únicos",
      avatar: undefined,
      isOnline: false,
      lastSeen: "há 3h",
      rating: 5.0,
      responseTime: "2h",
      category: "fotografia",
    },
    product: {
      name: "Fotografia Profissional",
      price: "R$ 1.500",
      category: "fotografia",
      tags: ["fotografia", "profissional", "casamento", "ensaio"],
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
    },
    lastMessage: "Posso mostrar meu portfólio completo.",
    lastTimestamp: "Hoje, 11:20",
    unread: false,
    messages: [
      "Oi!",
      "Preciso de fotógrafo",
      "Posso mostrar meu portfólio completo.",
      "Trabalho com equipamento Canon",
    ],
  },
  {
    id: "conv5",
    vendor: {
      name: "Flora Tropical",
      avatar: undefined,
      isOnline: true,
      lastSeen: "há 5min",
      rating: 4.6,
      responseTime: "45min",
      category: "floricultura",
    },
    product: {
      name: "Arranjos Florais Tropicais",
      price: "R$ 300",
      category: "decoração",
      tags: ["flores", "tropical", "arranjos", "natureza"],
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
    },
    lastMessage: "Trabalho com flores frescas diariamente.",
    lastTimestamp: "Ontem, 15:30",
    unread: false,
    messages: [
      "Olá!",
      "Preciso de arranjos tropicais",
      "Trabalho com flores frescas diariamente.",
      "Entrego no dia do evento",
    ],
  },
  {
    id: "conv6",
    vendor: {
      name: "Luz & Arte",
      avatar: undefined,
      isOnline: false,
      lastSeen: "há 2h",
      rating: 4.4,
      responseTime: "1h",
      category: "iluminação",
    },
    product: {
      name: "Iluminação LED Ambiente",
      price: "R$ 600",
      category: "iluminação",
      tags: ["led", "ambiente", "iluminação", "moderno"],
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    },
    lastMessage: "Posso fazer uma simulação 3D do ambiente.",
    lastTimestamp: "Hoje, 09:15",
    unread: true,
    messages: [
      "Oi!",
      "Preciso de iluminação LED",
      "Posso fazer uma simulação 3D do ambiente.",
      "Trabalho com RGB e branco quente",
    ],
  },
  {
    id: "conv7",
    vendor: {
      name: "Doces & Cia",
      avatar: undefined,
      isOnline: true,
      lastSeen: "há 1h",
      rating: 4.9,
      responseTime: "30min",
      category: "confeitaria",
    },
    product: {
      name: "Bolo de Casamento 3 Andares",
      price: "R$ 450",
      category: "alimentação",
      tags: ["bolo", "casamento", "confeitaria", "personalizado"],
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    },
    lastMessage: "Faço bolos personalizados com qualquer tema!",
    lastTimestamp: "Hoje, 13:22",
    unread: false,
    messages: [
      "Olá!",
      "Preciso de bolo para casamento",
      "Faço bolos personalizados com qualquer tema!",
      "Massa e recheio à sua escolha",
    ],
  },
]

export default function MensagensPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<any>(mockConversations[0])

  // Função para selecionar conversa sem afetar o scroll geral
  const handleSelectConversation = useCallback((conversation: any) => {
    // Previne o scroll da página principal
    setSelectedConversation(conversation)
  }, [])

  // Melhorar a função de busca avançada
  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) return mockConversations

    const term = searchTerm.toLowerCase().trim()
    return mockConversations.filter((conv) => {
      // 1. Busca no nome do vendedor
      const vendorMatch = conv.vendor.name.toLowerCase().includes(term)

      // 2. Busca no nome do produto
      const productMatch = conv.product.name.toLowerCase().includes(term)

      // 3. Busca na categoria do produto
      const categoryMatch = conv.product.category.toLowerCase().includes(term)

      // 4. Busca nas tags do produto
      const tagsMatch = conv.product.tags.some((tag) => tag.toLowerCase().includes(term))

      // 5. Busca no preço (múltiplos formatos)
      const priceMatch = (() => {
        const price = conv.product.price.toLowerCase()
        // Busca exata no preço
        if (price.includes(term)) return true

        // Busca apenas números (ex: "800" encontra "R$ 800")
        const numericTerm = term.replace(/[^\d]/g, "")
        const numericPrice = price.replace(/[^\d]/g, "")
        if (numericTerm && numericPrice.includes(numericTerm)) return true

        // Busca por faixas de preço
        if (term.includes("até") || term.includes("menor") || term.includes("<")) {
          const priceValue = Number.parseInt(numericPrice)
          const searchValue = Number.parseInt(term.replace(/[^\d]/g, ""))
          if (!isNaN(priceValue) && !isNaN(searchValue)) {
            return priceValue <= searchValue
          }
        }

        if (term.includes("acima") || term.includes("maior") || term.includes(">")) {
          const priceValue = Number.parseInt(numericPrice)
          const searchValue = Number.parseInt(term.replace(/[^\d]/g, ""))
          if (!isNaN(priceValue) && !isNaN(searchValue)) {
            return priceValue >= searchValue
          }
        }

        return false
      })()

      // 6. Busca na última mensagem
      const lastMessageMatch = conv.lastMessage.toLowerCase().includes(term)

      // 7. Busca em todas as mensagens da conversa
      const allMessagesMatch = conv.messages.some((msg: string) => msg.toLowerCase().includes(term))

      // 8. Busca na avaliação (múltiplos formatos)
      const ratingMatch = (() => {
        const rating = conv.vendor.rating.toString()
        // Busca exata
        if (rating.includes(term)) return true

        // Busca por faixas de avaliação
        if (term.includes("estrela") || term.includes("★")) {
          const numericTerm = Number.parseFloat(term.replace(/[^\d.]/g, ""))
          if (!isNaN(numericTerm)) {
            return conv.vendor.rating >= numericTerm
          }
        }

        // Busca por qualidade
        if (term.includes("excelente") || term.includes("ótimo")) {
          return conv.vendor.rating >= 4.5
        }
        if (term.includes("bom") || term.includes("boa")) {
          return conv.vendor.rating >= 4.0
        }

        return false
      })()

      // 9. Busca no tempo de resposta
      const responseTimeMatch = (() => {
        const responseTime = conv.vendor.responseTime.toLowerCase()
        if (responseTime.includes(term)) return true

        // Busca por tempo rápido/lento
        if (term.includes("rápido") || term.includes("rapido")) {
          return responseTime.includes("min") || responseTime === "1h"
        }
        if (term.includes("lento") || term.includes("demorado")) {
          return responseTime.includes("h") && !responseTime.includes("min")
        }

        return false
      })()

      // 10. Busca por status online
      const statusMatch = (() => {
        if (term.includes("online") || term.includes("ativo")) {
          return conv.vendor.isOnline
        }
        if (term.includes("offline") || term.includes("inativo")) {
          return !conv.vendor.isOnline
        }
        return false
      })()

      // 11. Busca por mensagens não lidas
      const unreadMatch = (() => {
        if (term.includes("não lida") || term.includes("nova") || term.includes("novo")) {
          return conv.unread
        }
        return false
      })()

      // 12. Busca por data/tempo
      const timeMatch = (() => {
        const timestamp = conv.lastTimestamp.toLowerCase()
        if (term.includes("hoje") || term.includes("agora")) {
          return timestamp.includes("hoje")
        }
        if (term.includes("ontem")) {
          return timestamp.includes("ontem")
        }
        if (term.includes("recente")) {
          return timestamp.includes("hoje") || conv.vendor.isOnline
        }
        return timestamp.includes(term)
      })()

      return (
        vendorMatch ||
        productMatch ||
        categoryMatch ||
        tagsMatch ||
        priceMatch ||
        lastMessageMatch ||
        allMessagesMatch ||
        ratingMatch ||
        responseTimeMatch ||
        statusMatch ||
        unreadMatch ||
        timeMatch
      )
    })
  }, [searchTerm])

  const unreadCount = mockConversations.filter((conv) => conv.unread).length

  return (
    <div className="w-full h-full flex">
      {/* Sidebar de Conversas - Scroll Independente */}
      <div className="w-full md:w-96 flex-shrink-0 flex flex-col border-r h-full">
        {/* Header da Sidebar - Fixo */}
        <div className="border-b border-gray-200 bg-white p-4 flex-shrink-0">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6 text-pink-500" />
              <h1 className="text-xl font-bold text-gray-900">Mensagens</h1>
              {unreadCount > 0 && (
                <span className="rounded-full bg-pink-500 px-2 py-1 text-xs text-white">{unreadCount}</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          {/* Barra de Pesquisa Avançada */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar: nome, produto, preço, avaliação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500 text-sm"
            />
          </div>

          {/* Filtros Expandidos */}
          {showFilters && (
            <div className="mt-3 rounded-lg bg-gray-50 p-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="text-xs h-7">
                  Não lidas
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7">
                  Online
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7">
                  Hoje
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7">
                  Avaliação 5★
                </Button>
              </div>
            </div>
          )}

          {/* Contador de Resultados */}
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-500">{filteredConversations.length} conversa(s) encontrada(s)</div>
          )}

          {/* Exemplos de busca quando não há termo */}
          {!searchTerm && (
            <div className="mt-3 rounded-lg bg-blue-50 p-3">
              <p className="mb-2 font-medium text-xs text-blue-600">💡 Exemplos de busca:</p>
              <div className="flex flex-wrap gap-1">
                {["Eventos Premium", "decoração", "R$ 800", "4.8", "1h", "online", "hoje", "não lida"].map(
                  (example) => (
                    <button
                      key={example}
                      onClick={() => setSearchTerm(example)}
                      className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 transition hover:bg-blue-200"
                    >
                      {example}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lista de Conversas - Scroll Independente */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-gray-500">
              <MessageCircle className="mb-4 h-12 w-12 text-gray-300" />
              <p className="text-center">{searchTerm ? "Nenhuma conversa encontrada" : "Nenhuma conversa ainda"}</p>
              {searchTerm && <p className="mt-2 text-center text-sm">Tente buscar por outros termos</p>}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`cursor-pointer p-4 transition-all hover:bg-gray-50 ${
                    selectedConversation?.id === conv.id ? "border-r-2 border-pink-500 bg-pink-50" : ""
                  }`}
                  onClick={() => handleSelectConversation(conv)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar do Produto */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={conv.product.image || "/placeholder.svg"}
                        alt={conv.product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      {/* Status Online do Vendedor */}
                      <div className="absolute -bottom-1 -right-1">
                        <div className="relative">
                          <Avatar className="h-6 w-6 border-2 border-white">
                            <AvatarImage src={conv.vendor.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-pink-100 text-pink-600 text-xs">
                              {conv.vendor.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conv.vendor.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-white bg-green-500"></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo da Conversa */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center justify-between">
                        <h3 className="truncate font-semibold text-gray-900 text-sm">{conv.product.name}</h3>
                        <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                          {conv.unread && <div className="h-2 w-2 rounded-full bg-pink-500"></div>}
                          <span className="text-xs text-gray-400">{conv.lastTimestamp.split(", ")[1]}</span>
                        </div>
                      </div>

                      <div className="mb-2 flex items-center justify-between">
                        <span className="truncate text-sm text-gray-600">{conv.vendor.name}</span>
                        <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                          <Star className="h-3 w-3 fill-current text-yellow-400" />
                          <span className="text-xs text-gray-500">{conv.vendor.rating}</span>
                        </div>
                      </div>

                      <p className="mb-1 truncate text-sm text-gray-500">{conv.lastMessage}</p>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-pink-600">{conv.product.price}</span>
                        <div className="flex items-center space-x-1 text-xs text-gray-400 flex-shrink-0 ml-2">
                          <Clock className="h-3 w-3" />
                          <span>{conv.vendor.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Área Principal do Chat - Scroll Independente */}
      <div className="flex-1 flex flex-col h-full">
        {selectedConversation ? (
          <ChatContent conversation={selectedConversation} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 font-medium text-lg text-gray-900">Selecione uma conversa</h3>
              <p className="text-gray-500">Escolha uma conversa da lista para começar a conversar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
