"use client";

import { useState, useMemo } from "react";
import { MessageCircle, Search, Filter, Star, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatContent from "@/components/dashboard/chat/chat-content";

// Simulação de histórico de conversas expandido
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
    },
    product: {
      name: "Decoração Rústica Premium",
      price: "R$ 1.200",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
    },
    lastMessage: "Posso personalizar de acordo com suas preferências.",
    lastTimestamp: "Hoje, 14:32",
    unread: true,
    messages: [
      "Olá! Como posso ajudar?",
      "Gostaria de saber sobre decoração",
      "Posso personalizar de acordo com suas preferências.",
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
    },
    product: {
      name: "DJ Profissional",
      price: "R$ 800",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    },
    lastMessage: "Qual a data do seu evento?",
    lastTimestamp: "Ontem, 19:10",
    unread: false,
    messages: ["Oi!", "Preciso de DJ", "Qual a data do seu evento?"],
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
    },
    product: {
      name: "Buffet Gourmet Completo",
      price: "R$ 45/pessoa",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    },
    lastMessage: "Temos opções vegetarianas também!",
    lastTimestamp: "Hoje, 16:45",
    unread: true,
    messages: [
      "Olá!",
      "Preciso de buffet",
      "Temos opções vegetarianas também!",
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
    },
    product: {
      name: "Fotografia Profissional",
      price: "R$ 1.500",
      image:
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
    },
    lastMessage: "Posso mostrar meu portfólio completo.",
    lastTimestamp: "Hoje, 11:20",
    unread: false,
    messages: [
      "Oi!",
      "Preciso de fotógrafo",
      "Posso mostrar meu portfólio completo.",
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
    },
    product: {
      name: "Arranjos Florais Tropicais",
      price: "R$ 300",
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
    },
    lastMessage: "Trabalho com flores frescas diariamente.",
    lastTimestamp: "Ontem, 15:30",
    unread: false,
    messages: [
      "Olá!",
      "Preciso de arranjos",
      "Trabalho com flores frescas diariamente.",
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
    },
    product: {
      name: "Iluminação LED Ambiente",
      price: "R$ 600",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    },
    lastMessage: "Posso fazer uma simulação 3D do ambiente.",
    lastTimestamp: "Hoje, 09:15",
    unread: true,
    messages: [
      "Oi!",
      "Preciso de iluminação",
      "Posso fazer uma simulação 3D do ambiente.",
    ],
  },
];

export default function MensagensPage() {
  const [selectedConversation, setSelectedConversation] = useState<any>(
    mockConversations[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Busca avançada que procura em todos os campos
  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) return mockConversations;

    const term = searchTerm.toLowerCase();
    return mockConversations.filter((conv) => {
      // Busca no nome do vendedor
      const vendorMatch = conv.vendor.name.toLowerCase().includes(term);

      // Busca no nome do produto
      const productMatch = conv.product.name.toLowerCase().includes(term);

      // Busca no preço
      const priceMatch = conv.product.price.toLowerCase().includes(term);

      // Busca na última mensagem
      const messageMatch = conv.lastMessage.toLowerCase().includes(term);

      // Busca em todas as mensagens da conversa
      const allMessagesMatch = conv.messages.some((msg: string) =>
        msg.toLowerCase().includes(term)
      );

      // Busca na avaliação (convertida para string)
      const ratingMatch = conv.vendor.rating.toString().includes(term);

      // Busca no tempo de resposta
      const responseTimeMatch = conv.vendor.responseTime
        .toLowerCase()
        .includes(term);

      return (
        vendorMatch ||
        productMatch ||
        priceMatch ||
        messageMatch ||
        allMessagesMatch ||
        ratingMatch ||
        responseTimeMatch
      );
    });
  }, [searchTerm]);

  const unreadCount = mockConversations.filter((conv) => conv.unread).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Sidebar de Conversas */}
        <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Header da Sidebar */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-6 w-6 text-pink-500" />
                <h1 className="text-xl font-bold text-gray-900">Mensagens</h1>
                {unreadCount > 0 && (
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, produto, preço, mensagens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            {/* Filtros Expandidos */}
            {showFilters && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Não lidas
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Online
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Hoje
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Avaliação 5★
                  </Button>
                </div>
              </div>
            )}

            {/* Contador de Resultados */}
            {searchTerm && (
              <div className="mt-2 text-sm text-gray-500">
                {filteredConversations.length} conversa(s) encontrada(s)
              </div>
            )}
          </div>

          {/* Lista de Conversas */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
                <MessageCircle className="h-12 w-12 mb-4 text-gray-300" />
                <p className="text-center">
                  {searchTerm
                    ? "Nenhuma conversa encontrada"
                    : "Nenhuma conversa ainda"}
                </p>
                {searchTerm && (
                  <p className="text-sm text-center mt-2">
                    Tente buscar por outros termos
                  </p>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                      selectedConversation?.id === conv.id
                        ? "bg-pink-50 border-r-2 border-pink-500"
                        : ""
                    }`}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Avatar do Produto */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={conv.product.image || "/placeholder.svg"}
                          alt={conv.product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        {/* Status Online do Vendedor */}
                        <div className="absolute -bottom-1 -right-1">
                          <div className="relative">
                            <Avatar className="w-6 h-6 border-2 border-white">
                              <AvatarImage
                                src={conv.vendor.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback className="bg-pink-100 text-pink-600 text-xs">
                                {conv.vendor.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {conv.vendor.isOnline && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border border-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Conteúdo da Conversa */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {conv.product.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {conv.unread && (
                              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            )}
                            <span className="text-xs text-gray-400">
                              {conv.lastTimestamp.split(", ")[1]}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 truncate">
                            {conv.vendor.name}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500">
                              {conv.vendor.rating}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500 truncate mb-1">
                          {conv.lastMessage}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-pink-600">
                            {conv.product.price}
                          </span>
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
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

        {/* Área Principal do Chat */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <ChatContent conversation={selectedConversation} />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecione uma conversa
                </h3>
                <p className="text-gray-500">
                  Escolha uma conversa da lista para começar a conversar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
