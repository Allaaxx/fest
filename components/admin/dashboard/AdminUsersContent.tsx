import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import React from "react";

const users = [
  {
    nome: "Maria Silva",
    email: "maria@email.com",
    tipo: "Cliente",
    status: "Ativo",
    cadastro: "15/01/2024",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    nome: "João Santos",
    email: "joao@eventospremium.com",
    tipo: "Vendedor",
    status: "Ativo",
    cadastro: "10/01/2024",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    nome: "Ana Costa",
    email: "ana@email.com",
    tipo: "Cliente",
    status: "Suspenso",
    cadastro: "05/01/2024",
    statusColor: "bg-red-100 text-red-800",
  },
  {
    nome: "Carlos Lima",
    email: "carlos@decoracoes.com",
    tipo: "Vendedor",
    status: "Pendente",
    cadastro: "01/01/2024",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
];

export function AdminUsersContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Gerenciar Usuários
          </h2>
          <p className="text-sm text-gray-500">
            Administre clientes e vendedores da plataforma
          </p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600">
          <User className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Usuário
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Email
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Tipo
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Cadastro
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((usuario, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">
                        {usuario.nome}
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">{usuario.email}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          usuario.tipo === "Cliente"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {usuario.tipo}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${usuario.statusColor}`}
                      >
                        {usuario.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{usuario.cadastro}</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        Gerenciar
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
