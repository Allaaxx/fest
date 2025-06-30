import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Star } from "lucide-react";

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Análises de Vendas
        </h2>
        <p className="text-sm text-gray-500">
          Acompanhe o desempenho dos seus produtos
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Vendas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  Gráfico de vendas seria exibido aqui
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categorias Mais Vendidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { categoria: "Decoração", vendas: 19, porcentagem: 45 },
                { categoria: "Som", vendas: 12, porcentagem: 30 },
                { categoria: "Alimentação", vendas: 8, porcentagem: 20 },
                { categoria: "Iluminação", vendas: 3, porcentagem: 5 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {item.categoria}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.vendas} vendas
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${item.porcentagem}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Avaliações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  cliente: "Maria Silva",
                  produto: "Decoração Rústica",
                  nota: 5,
                  comentario: "Excelente trabalho!",
                },
                {
                  cliente: "João Santos",
                  produto: "DJ Premium",
                  nota: 4,
                  comentario: "Muito bom, recomendo.",
                },
                {
                  cliente: "Ana Costa",
                  produto: "Buffet Gourmet",
                  nota: 5,
                  comentario: "Superou expectativas!",
                },
              ].map((avaliacao, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {avaliacao.cliente}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < avaliacao.nota ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {avaliacao.produto}
                  </p>
                  <p className="text-sm text-gray-500">
                    "{avaliacao.comentario}"
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Taxa de Conversão</span>
                <span className="font-medium text-green-600">12.5%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Tempo Médio de Resposta</span>
                <span className="font-medium text-blue-600">2.3h</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Satisfação do Cliente</span>
                <span className="font-medium text-yellow-600">4.8/5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Taxa de Recompra</span>
                <span className="font-medium text-purple-600">35%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
