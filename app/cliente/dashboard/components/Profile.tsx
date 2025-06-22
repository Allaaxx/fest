import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./phoneinput-custom.css";
import axios from "axios";

// Funções utilitárias para máscara
function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function maskCEP(value: string) {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
}

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    cep: "",
    cpf: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/cliente/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error)
          setForm({
            name: data.name || "",
            surname: data.surname || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            cep: data.cep || "",
            cpf: data.cpf || "",
          });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Busca endereço pelo CEP
  const handleCepBlur = async () => {
    if (form.cep.replace(/\D/g, "").length === 8) {
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${form.cep.replace(/\D/g, "")}/json/`
        );
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            address:
              `${data.logradouro || ""} ${data.bairro || ""} ${data.localidade || ""} - ${data.uf || ""}`.trim(),
          }));
        }
      } catch {}
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/cliente/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Perfil atualizado com sucesso!");
    } else {
      toast.error(data.error || "Erro ao atualizar perfil");
    }
    setLoading(false);
  };

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
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sobrenome
                  </label>
                  <Input
                    name="surname"
                    value={form.surname}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <PhoneInput
                  international
                  defaultCountry="BR"
                  value={form.phone}
                  onChange={(phone) =>
                    setForm((prev) => ({ ...prev, phone: phone || "" }))
                  }
                  disabled={loading}
                  className="w-full phoneinput-inside"
                  inputComponent={Input as any}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPF
                </label>
                <Input
                  name="cpf"
                  value={maskCPF(form.cpf)}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cpf: e.target.value }))
                  }
                  disabled={loading}
                  maxLength={14}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CEP
                </label>
                <Input
                  name="cep"
                  value={maskCEP(form.cep)}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cep: e.target.value }))
                  }
                  onBlur={handleCepBlur}
                  disabled={loading}
                  maxLength={9}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <Button
                className="bg-pink-500 hover:bg-pink-600"
                type="submit"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </form>
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
            <Button variant="outline" className="mb-2" disabled>
              Alterar Foto
            </Button>
            <p className="text-xs text-gray-500">JPG, PNG até 2MB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
