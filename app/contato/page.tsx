"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    })
    setFormData({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-fest-black2 mb-4">Entre em Contato</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo ou envie uma mensagem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações de Contato */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-fest-primary/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-fest-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-fest-black2">Telefone</h3>
                  <p className="text-gray-600">(11) 9999-9999</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-fest-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-fest-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-fest-black2">E-mail</h3>
                  <p className="text-gray-600">contato@fest.com.br</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-fest-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-fest-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-fest-black2">Endereço</h3>
                  <p className="text-gray-600">
                    São Paulo, SP
                    <br />
                    Brasil
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-fest-primary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-fest-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-fest-black2">Horário</h3>
                  <p className="text-gray-600">
                    Segunda a Sexta: 9h às 18h
                    <br />
                    Sábado: 9h às 14h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formulário de Contato */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleChange("nome", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleChange("telefone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="assunto">Assunto</Label>
                    <Select value={formData.assunto} onValueChange={(value) => handleChange("assunto", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="duvida">Dúvida Geral</SelectItem>
                        <SelectItem value="vendedor">Quero ser Vendedor</SelectItem>
                        <SelectItem value="suporte">Suporte Técnico</SelectItem>
                        <SelectItem value="parceria">Parceria</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    rows={6}
                    value={formData.mensagem}
                    onChange={(e) => handleChange("mensagem", e.target.value)}
                    placeholder="Descreva sua dúvida ou solicitação..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-fest-primary hover:bg-fest-dark text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-fest-black2 text-center mb-8">Perguntas Frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-fest-black2 mb-2">Como funciona a locação?</h3>
              <p className="text-gray-600">
                Você escolhe os produtos, seleciona as datas, retira no local ou solicita entrega, monta seguindo nosso
                guia e devolve após o evento.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-fest-black2 mb-2">Como me tornar um vendedor?</h3>
              <p className="text-gray-600">
                Cadastre-se em nossa plataforma com CNPJ ou CPF, aguarde a aprovação e comece a vender seus produtos e
                serviços.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-fest-black2 mb-2">Qual a taxa da plataforma?</h3>
              <p className="text-gray-600">
                Cobramos uma taxa de 5% sobre cada transação realizada através da plataforma.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-fest-black2 mb-2">Como funciona o pagamento?</h3>
              <p className="text-gray-600">
                Utilizamos split de pagamento, onde o dinheiro vai direto para o vendedor e a plataforma fica com a
                taxa.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
