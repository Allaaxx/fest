import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export function AdminSettingsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Configurações do Sistema
        </h2>
        <p className="text-sm text-gray-500">
          Gerencie configurações globais da plataforma
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Plataforma
              </label>
              <Input defaultValue="Marketplace de Eventos" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email de Contato
              </label>
              <Input defaultValue="admin@marketplace.com" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taxa da Plataforma (%)
              </label>
              <Input defaultValue="5" type="number" />
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  Autenticação de Dois Fatores
                </p>
                <p className="text-sm text-gray-500">
                  Obrigatória para administradores
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Logs de Auditoria</p>
                <p className="text-sm text-gray-500">
                  Registrar todas as ações
                </p>
              </div>
              <Button variant="outline" size="sm">
                Ver Logs
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Backup Automático</p>
                <p className="text-sm text-gray-500">Diário às 02:00</p>
              </div>
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
