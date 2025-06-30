import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import React from "react";

export default function Loyalty() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Programa de Fidelidade
        </h2>
        <p className="text-sm text-gray-500">Seus pontos e recompensas</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-12 w-12 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              1.250 Pontos
            </h3>
            <p className="text-gray-500 mb-4">
              Você precisa de mais 250 pontos para a próxima recompensa
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: "83%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">83% para o próximo nível</p>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recompensas Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: "Desconto 10%", pontos: 500, disponivel: true },
                { nome: "Frete Grátis", pontos: 300, disponivel: true },
                { nome: "Desconto 20%", pontos: 1000, disponivel: true },
                { nome: "Serviço Grátis", pontos: 1500, disponivel: false },
              ].map((recompensa, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {recompensa.nome}
                    </p>
                    <p className="text-sm text-gray-500">
                      {recompensa.pontos} pontos
                    </p>
                  </div>
                  <Button
                    size="sm"
                    disabled={!recompensa.disponivel}
                    className={
                      recompensa.disponivel
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : ""
                    }
                  >
                    {recompensa.disponivel ? "Resgatar" : "Bloqueado"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pontos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  acao: "Compra realizada",
                  pontos: "+120",
                  data: "15/01/2024",
                },
                {
                  acao: "Avaliação produto",
                  pontos: "+50",
                  data: "10/01/2024",
                },
                { acao: "Indicação amigo", pontos: "+200", data: "05/01/2024" },
                {
                  acao: "Desconto resgatado",
                  pontos: "-500",
                  data: "01/01/2024",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.acao}</p>
                    <p className="text-sm text-gray-500">{item.data}</p>
                  </div>
                  <span
                    className={`font-medium ${item.pontos.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                  >
                    {item.pontos}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
