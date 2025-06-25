import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Users,
  Package,
  ShoppingBag,
  Shield,
} from "lucide-react";
import React from "react";

export function AdminOverviewContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Receita Total
                </p>
                <p className="text-2xl font-bold text-gray-900">R$ 125.430</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% vs mês anterior
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
                <p className="text-sm font-medium text-gray-600">
                  Usuários Ativos
                </p>
                <p className="text-2xl font-bold text-gray-900">2.456</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Users className="h-3 w-3 mr-1" />
                  +156 novos este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produtos</p>
                <p className="text-2xl font-bold text-gray-900">1.234</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Package className="h-3 w-3 mr-1" />
                  +32 novos
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
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">890</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <ShoppingBag className="h-3 w-3 mr-1" />
                  +12% este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-100">
              <li className="py-2 flex items-center justify-between">
                <span className="font-medium text-gray-900">João Silva</span>
                <span className="text-xs text-gray-500">Cliente</span>
              </li>
              <li className="py-2 flex items-center justify-between">
                <span className="font-medium text-gray-900">Maria Souza</span>
                <span className="text-xs text-gray-500">Vendedor</span>
              </li>
              <li className="py-2 flex items-center justify-between">
                <span className="font-medium text-gray-900">Carlos Lima</span>
                <span className="text-xs text-gray-500">Cliente</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-100">
              <li className="py-2 text-gray-700 text-sm">
                Novo produto "Bolo de Festa" cadastrado por Maria Souza
              </li>
              <li className="py-2 text-gray-700 text-sm">
                Pedido #1002 aguardando pagamento
              </li>
              <li className="py-2 text-gray-700 text-sm">
                Usuário Carlos Lima se cadastrou
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
