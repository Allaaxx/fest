"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)
      toast.success("Login realizado com sucesso!")
      router.push("/cliente/dashboard")
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    toast.info(`Login com ${provider} em desenvolvimento`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">Hello, Welcome!</h1>
            <p className="text-blue-100 mb-4">Log into your account</p>
            <Link href="/cadastro">
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                Register
              </Button>
            </Link>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Username
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

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Login"}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">Or sign up with:</div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => handleSocialLogin("Google")}
              >
                G
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => handleSocialLogin("Facebook")}
              >
                f
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => handleSocialLogin("LinkedIn")}
              >
                in
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/cadastro" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
