"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Star, Store, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  text: string
  sender: "user" | "vendor"
  timestamp: Date
  type: "text" | "image" | "file"
  status?: "sent" | "delivered" | "read"
}

interface ChatContentProps {
  conversation: any
}

export default function ChatContent({ conversation }: ChatContentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Olá! Vi que você tem interesse no ${conversation.product.name}. Como posso ajudá-lo?`,
      sender: "vendor",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: "text",
      status: "read",
    },
    {
      id: "2",
      text: "Oi! Gostaria de saber mais detalhes sobre este serviço.",
      sender: "user",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      type: "text",
      status: "read",
    },
    {
      id: "3",
      text: "Claro! Este pacote inclui decoração completa, montagem e desmontagem. Posso personalizar de acordo com suas preferências. Qual é a data do seu evento?",
      sender: "vendor",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      type: "text",
      status: "read",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [conversation])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
        type: "text",
        status: "sent",
      }

      setMessages((prev) => [...prev, message])
      setNewMessage("")

      // Simular resposta do vendedor
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const vendorResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: "Perfeito! Vou preparar uma proposta personalizada para você. Posso enviar em alguns minutos.",
            sender: "vendor",
            timestamp: new Date(),
            type: "text",
            status: "sent",
          }
          setMessages((prev) => [...prev, vendorResponse])
        }, 2000)
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Hoje"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ontem"
    } else {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })
    }
  }

  return (
    <div className="flex h-full">
      {/* Área Principal do Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header do Chat */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={conversation.vendor.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-pink-100 text-pink-600 font-semibold">
                  {conversation.vendor.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {conversation.vendor.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{conversation.vendor.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{conversation.vendor.rating}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className={conversation.vendor.isOnline ? "text-green-600" : ""}>
                  {conversation.vendor.isOnline ? "Online" : `Visto por último ${conversation.vendor.lastSeen}`}
                </span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Responde em {conversation.vendor.responseTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Área de Mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {/* Card do Produto */}
          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <img
                src={conversation.product.image || "/placeholder.svg?height=60&width=60"}
                alt={conversation.product.name}
                className="w-15 h-15 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{conversation.product.name}</h4>
                <p className="text-lg font-semibold text-pink-600">{conversation.product.price}</p>
              </div>
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                Ver Produto
              </Button>
            </div>
          </div>

          {/* Mensagens */}
          {messages.map((message, index) => {
            const showDate = index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}

                <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-pink-500 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div
                      className={`flex items-center justify-between mt-1 text-xs ${
                        message.sender === "user" ? "text-pink-100" : "text-gray-500"
                      }`}
                    >
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === "user" && (
                        <div className="flex space-x-1">
                          {message.status === "sent" && <div className="w-1 h-1 bg-pink-200 rounded-full"></div>}
                          {message.status === "delivered" && (
                            <>
                              <div className="w-1 h-1 bg-pink-200 rounded-full"></div>
                              <div className="w-1 h-1 bg-pink-200 rounded-full"></div>
                            </>
                          )}
                          {message.status === "read" && (
                            <div className="w-3 h-3 rounded-full overflow-hidden">
                              <Avatar className="w-3 h-3">
                                <AvatarImage src={conversation.vendor.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-[8px]">V</AvatarFallback>
                              </Avatar>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Indicador de digitação */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input de Mensagem */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Paperclip className="h-5 w-5" />
            </Button>

            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="pr-12 rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-pink-500 hover:bg-pink-600 rounded-full p-2"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Pressione Enter para enviar</span>
            <div className="flex items-center space-x-1">
              <Store className="h-3 w-3" />
              <span>Conversa segura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar de Informações */}
      <div className="hidden xl:block w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Informações do Vendedor */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Sobre o Vendedor</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avaliação</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{conversation.vendor.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tempo de resposta</span>
                <span className="text-sm font-medium">{conversation.vendor.responseTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Vendas realizadas</span>
                <span className="text-sm font-medium">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Membro desde</span>
                <span className="text-sm font-medium">2022</span>
              </div>
            </div>
          </div>

          {/* Produtos Relacionados */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Outros Produtos</h4>
            <div className="space-y-3">
              {[
                { name: "Decoração Minimalista", price: "R$ 900", image: "/placeholder.svg?height=40&width=40" },
                { name: "Arranjos Florais", price: "R$ 250", image: "/placeholder.svg?height=40&width=40" },
                { name: "Iluminação Ambiente", price: "R$ 400", image: "/placeholder.svg?height=40&width=40" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-pink-600">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Ações Rápidas</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Ligar para vendedor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Video className="h-4 w-4 mr-2" />
                Videochamada
              </Button>
              <Button className="w-full bg-pink-500 hover:bg-pink-600">Solicitar Orçamento</Button>
            </div>
          </div>

          {/* Avaliações Recentes */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Avaliações Recentes</h4>
            <div className="space-y-3">
              {[
                { name: "Maria S.", rating: 5, comment: "Excelente atendimento!" },
                { name: "João P.", rating: 5, comment: "Muito profissional." },
                { name: "Ana L.", rating: 4, comment: "Recomendo!" },
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{review.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
