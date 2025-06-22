import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CreditCard, Package, ShoppingBag, Gift, Heart, Calendar } from "lucide-react";
import React from "react";

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gasto</p>
                <p className="text-2xl font-bold text-gray-900">R$ 2.450</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-pink-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Package className="h-3 w-3 mr-1" />2 em andamento
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pontos</p>
                <p className="text-2xl font-bold text-gray-900">1.250</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Gift className="h-3 w-3 mr-1" />
                  250 para próxima recompensa
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Gift className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favoritos</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <Heart className="h-3 w-3 mr-1" />3 com desconto
                </p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "001", item: "Decoração Casamento", status: "Entregue", valor: "R$ 1.200" },
                { id: "002", item: "Som e Iluminação", status: "Em andamento", valor: "R$ 800" },
                { id: "003", item: "Buffet Premium", status: "Confirmado", valor: "R$ 450" },
              ].map((pedido) => (
                <div key={pedido.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{pedido.item}</p>
                      <p className="text-sm text-gray-500">Pedido #{pedido.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{pedido.valor}</p>
                    <p className="text-sm text-green-600">{pedido.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: "Casamento Ana & Carlos", data: "15 de Fev, 2024", dias: "Em 10 dias" },
                { nome: "Aniversário 50 anos", data: "28 de Fev, 2024", dias: "Em 23 dias" },
                { nome: "Formatura Medicina", data: "15 de Mar, 2024", dias: "Em 38 dias" },
              ].map((evento, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{evento.nome}</p>
                      <p className="text-sm text-gray-500">{evento.data}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-600 font-medium">{evento.dias}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
