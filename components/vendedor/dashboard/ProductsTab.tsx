import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function ProductsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Meus Produtos</h2>
          <p className="text-sm text-gray-500">Gerencie seus produtos e serviços</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            nome: "Decoração Rústica",
            categoria: "Decoração",
            preco: "R$ 1.200",
            status: "Ativo",
            vendas: 12,
            imagem: "🌿",
          },
          { nome: "DJ Premium", categoria: "Som", preco: "R$ 800", status: "Ativo", vendas: 8, imagem: "🎵" },
          {
            nome: "Buffet Gourmet",
            categoria: "Alimentação",
            preco: "R$ 45/pessoa",
            status: "Ativo",
            vendas: 15,
            imagem: "🍽️",
          },
          {
            nome: "Fotografia Profissional",
            categoria: "Fotografia",
            preco: "R$ 1.500",
            status: "Pausado",
            vendas: 3,
            imagem: "📸",
          },
          {
            nome: "Flores Tropicais",
            categoria: "Decoração",
            preco: "R$ 300",
            status: "Ativo",
            vendas: 7,
            imagem: "🌺",
          },
          {
            nome: "Iluminação LED",
            categoria: "Iluminação",
            preco: "R$ 600",
            status: "Ativo",
            vendas: 5,
            imagem: "💡",
          },
        ].map((produto, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{produto.imagem}</div>
                <h3 className="font-semibold text-gray-900">{produto.nome}</h3>
                <p className="text-sm text-gray-500">{produto.categoria}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Preço:</span>
                  <span className="font-medium text-blue-600">{produto.preco}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Vendas:</span>
                  <span className="font-medium">{produto.vendas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span
                    className={`text-sm font-medium ${produto.status === "Ativo" ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {produto.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
