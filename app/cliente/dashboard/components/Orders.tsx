import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package } from "lucide-react";
import React from "react";

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Meus Pedidos</h2>
          <p className="text-sm text-gray-500">Acompanhe todos os seus pedidos</p>
        </div>
        <Button className="bg-pink-500 hover:bg-pink-600">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Novo Pedido
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Pedido</th>
                  <th className="text-left p-4 font-medium text-gray-900">Item</th>
                  <th className="text-left p-4 font-medium text-gray-900">Data</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Total</th>
                  <th className="text-left p-4 font-medium text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "001",
                    item: "Decoração Casamento",
                    data: "15/01/2024",
                    status: "Entregue",
                    total: "R$ 1.200,00",
                    statusColor: "bg-green-100 text-green-800",
                  },
                  {
                    id: "002",
                    item: "Som e Iluminação",
                    data: "10/01/2024",
                    status: "Em andamento",
                    total: "R$ 800,00",
                    statusColor: "bg-blue-100 text-blue-800",
                  },
                  {
                    id: "003",
                    item: "Buffet Premium",
                    data: "05/01/2024",
                    status: "Confirmado",
                    total: "R$ 450,00",
                    statusColor: "bg-yellow-100 text-yellow-800",
                  },
                ].map((pedido) => (
                  <tr key={pedido.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">#{pedido.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{pedido.item}</div>
                    </td>
                    <td className="p-4 text-gray-500">{pedido.data}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pedido.statusColor}`}
                      >
                        {pedido.status}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-900">{pedido.total}</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        Ver detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
