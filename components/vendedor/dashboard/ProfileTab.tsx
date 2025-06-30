import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProfileTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Perfil da Loja</h2>
        <p className="text-sm text-gray-500">
          Gerencie as informações da sua loja
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações da Loja</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Loja
              </label>
              <Input defaultValue="Eventos Premium" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                defaultValue="Especialistas em eventos de alta qualidade com mais de 10 anos de experiência no mercado."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input defaultValue="contato@eventospremium.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <Input defaultValue="(11) 99999-9999" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </label>
              <Input defaultValue="Av. Paulista, 1000 - São Paulo, SP" />
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logo da Loja</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">EP</span>
            </div>
            <Button variant="outline" className="mb-2">
              Alterar Logo
            </Button>
            <p className="text-xs text-gray-500">JPG, PNG até 2MB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
