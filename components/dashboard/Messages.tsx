"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ChatModal = dynamic(
  () => import("@/components/dashboard/chat/chat-modal"),
  {
    ssr: false,
  }
);

// Simulação de histórico de conversas
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
  },
];

export default function MessagesDashboard() {
  const [openChat, setOpenChat] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" /> Mensagens
        </h2>
        <p className="text-sm text-gray-500">
          Histórico de todas as conversas com vendedores
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockConversations.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            Nenhuma conversa encontrada.
          </div>
        ) : (
          mockConversations.map((conv) => (
            <Card
              key={conv.id}
              className="hover:shadow-lg transition cursor-pointer relative"
              onClick={() => setOpenChat(conv)}
            >
              <CardContent className="flex items-center space-x-4 p-4">
                <img
                  src={conv.product.image}
                  alt={conv.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 line-clamp-1">
                      {conv.product.name}
                    </span>
                    {conv.unread && (
                      <span className="ml-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Novo
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {conv.vendor.name}
                  </span>
                  <div className="text-xs text-gray-400 mt-1 line-clamp-1">
                    {conv.lastMessage}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {conv.lastTimestamp}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {openChat && (
        <ChatModal
          isOpen={!!openChat}
          onClose={() => setOpenChat(null)}
          vendor={openChat.vendor}
          product={openChat.product}
        />
      )}
    </div>
  );
}
