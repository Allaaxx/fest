import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

const orders = [
  {
    id: "001",
    cliente: "Maria Silva",
    vendedor: "Eventos Premium",
    produto: "Decoração Rústica",
    status: "Concluído",
    total: "R$ 1.200",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "002",
    cliente: "João Santos",
    vendedor: "Som & Cia",
    produto: "DJ Premium",
    status: "Em andamento",
    total: "R$ 800",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "003",
    cliente: "Ana Costa",
    vendedor: "Sabores Especiais",
    produto: "Buffet Gourmet",
    status: "Disputado",
    total: "R$ 450",
    statusColor: "bg-red-100 text-red-800",
  },
];

export function AdminOrdersContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Todos os Pedidos
          </h2>
          <p className="text-sm text-gray-500">
            Monitore todos os pedidos da plataforma
          </p>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Pedido
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Cliente
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Vendedor
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Produto
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Total
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((pedido) => (
                  <tr key={pedido.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">
                        #{pedido.id}
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">{pedido.cliente}</td>
                    <td className="p-4 text-gray-500">{pedido.vendedor}</td>
                    <td className="p-4 text-gray-500">{pedido.produto}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pedido.statusColor}`}
                      >
                        {pedido.status}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {pedido.total}
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        Detalhes
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
