"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { signIn, signOut } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
  type: "cliente" | "vendedor" | "admin";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        // O NextAuth já gerencia a sessão, mas você pode buscar dados extras se quiser
        // setUser(...)
      } else {
        throw new Error("Credenciais inválidas");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    signOut();
    setUser(null);
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao registrar usuário");
      // Opcional: logar automaticamente após cadastro
      await login(data.email, data.password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
