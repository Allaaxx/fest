import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import React from "react";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Meu Perfil</h2>
        <p className="text-sm text-gray-500">
          Gerencie suas informações pessoais
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <Input defaultValue="Maria Silva" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sobrenome
                </label>
                <Input defaultValue="Santos" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input defaultValue="maria@email.com" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <Input defaultValue="(11) 99999-9999" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </label>
              <Input defaultValue="Rua das Flores, 123 - São Paulo, SP" />
            </div>
            <Button className="bg-pink-500 hover:bg-pink-600">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Foto do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-pink-600" />
            </div>
            <Button variant="outline" className="mb-2">
              Alterar Foto
            </Button>
            <p className="text-xs text-gray-500">JPG, PNG até 2MB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
