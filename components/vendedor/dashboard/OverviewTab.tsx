import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Vendas do Mês
                </p>
                <p className="text-2xl font-bold text-gray-900">R$ 12.450</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +22% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">34</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <ShoppingBag className="h-3 w-3 mr-1" />5 pendentes
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
                <p className="text-sm font-medium text-gray-600">Produtos</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Package className="h-3 w-3 mr-1" />3 em destaque
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avaliação</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1" />
                  127 avaliações
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-500" />
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
                {
                  id: "001",
                  cliente: "Maria Silva",
                  produto: "Decoração Rústica",
                  valor: "R$ 1.200",
                  status: "Confirmado",
                },
                {
                  id: "002",
                  cliente: "João Santos",
                  produto: "DJ Premium",
                  valor: "R$ 800",
                  status: "Em andamento",
                },
                {
                  id: "003",
                  cliente: "Ana Costa",
                  produto: "Buffet Gourmet",
                  valor: "R$ 450",
                  status: "Entregue",
                },
              ].map((pedido) => (
                <div
                  key={pedido.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {pedido.produto}
                      </p>
                      <p className="text-sm text-gray-500">
                        {pedido.cliente} - #{pedido.id}
                      </p>
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
            <CardTitle>Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: "Decoração Rústica", vendas: 12, receita: "R$ 14.400" },
                { nome: "DJ Premium", vendas: 8, receita: "R$ 6.400" },
                { nome: "Buffet Gourmet", vendas: 15, receita: "R$ 6.750" },
              ].map((produto, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {produto.nome}
                      </p>
                      <p className="text-sm text-gray-500">
                        {produto.vendas} vendas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {produto.receita}
                    </p>
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
