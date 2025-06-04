"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      await register(formData)
      toast.success("Conta criada com sucesso!")
      router.push("/cliente/dashboard")
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = (provider: string) => {
    toast.info(`Cadastro com ${provider} em desenvolvimento`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-fest-primary to-fest-dark text-white rounded-2xl p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-pink-100 mb-4">Already have an account</p>
            <Link href="/login">
              <Button variant="outline" className="bg-white text-fest-primary hover:bg-pink-50">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                  placeholder="Digite seu email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="userType" className="text-gray-700">
                  Tipo de Usuário
                </Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Digite sua senha"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirmar Senha
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirme sua senha"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-fest-primary to-fest-dark hover:from-fest-dark hover:to-fest-primary"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">Or sign up with:</div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => handleSocialRegister("Google")}
              >
                G
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => handleSocialRegister("Facebook")}
              >
                f
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => handleSocialRegister("LinkedIn")}
              >
                in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
