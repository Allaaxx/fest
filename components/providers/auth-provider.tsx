"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "cliente" | "vendedor" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: any) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simular login
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({
        id: "1",
        name: "João Silva",
        email,
        type: "cliente",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (data: any) => {
    setIsLoading(true)
    try {
      // Simular registro
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({
        id: "1",
        name: data.name,
        email: data.email,
        type: data.type || "cliente",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
