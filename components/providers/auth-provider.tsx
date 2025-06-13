"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";

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
        return;
      } else if (res?.error === "2FA_REQUIRED" && (res as any).token) {
        if (typeof window !== "undefined") {
          toast.info(
            "Seu e-mail ainda não foi autenticado. Verifique sua caixa de entrada."
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          window.location.href = `/autenticar/validar?token=${encodeURIComponent((res as any).token)}`;
        }
        return;
      } else if (res?.error === "2FA_REQUIRED") {
        if (typeof window !== "undefined") {
          toast.info("Seu e-mail ainda não foi autenticado. Verifique sua caixa de entrada.");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          // Tenta pegar o token do erro retornado pelo NextAuth
          let token = undefined;
          try {
            // O NextAuth pode retornar o token no res.url como query param
            if (res?.url) {
              const url = new URL(res.url, window.location.origin);
              token = url.searchParams.get("token");
            }
          } catch {}
          // Se não achou, tenta pegar do localStorage (caso algum fluxo salve)
          if (!token && typeof localStorage !== "undefined") {
            token = localStorage.getItem("jwt_token");
          }
          // Se não achou, tenta pegar do backend (último recurso: nova requisição)
          if (!token) {
            try {
              const resp = await fetch("/api/get-latest-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });
              const data = await resp.json();
              if (data?.token) token = data.token;
            } catch {}
          }
          if (token) {
            window.location.href = `/autenticar/validar?token=${encodeURIComponent(token)}`;
          } else {
            toast.error("Não foi possível recuperar o token de validação. Solicite um novo código.");
            window.location.href = "/autenticar/validar";
          }
        }
        return;
      } else if (res?.status === 401) {
        throw new Error("Credenciais inválidas");
      } else {
        throw new Error("Erro ao tentar logar. Tente novamente.");
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
      // NÃO faça login automático após cadastro!
      // await login(data.email, data.password); // Removido para evitar erro de credenciais
      return await res.json(); // Retorna o token para o frontend redirecionar
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
