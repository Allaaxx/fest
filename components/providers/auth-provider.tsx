"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  type: "cliente" | "vendedor" | "admin";
  avatar?: string;
  profileImage?: string; // Adicionado para compatibilidade com dados do backend
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<RegisterResponse>;
  isLoading: boolean;
}

interface RegisterResponse {
  token?: string;
  error?: string;
  details?: string[];
}

const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  // Sincroniza o usuário do NextAuth com o contexto
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const userData = session.user as any;
      setUser({
        id: userData.id || userData.email || "",
        name: userData.name || "",
        email: userData.email || "",
        type: userData.type || "cliente",
        avatar: userData.avatar || userData.image || undefined,
        profileImage: userData.profileImage || undefined,
      });
    } else if (status === "unauthenticated") {
      setUser(null);
    }
  }, [session, status]);

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
        window.location.href = "/cliente/dashboard";
        return;
      } else if (res?.error === "2FA_REQUIRED" && (res as any).token) {
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.location.href = `/autenticar/validar?token=${encodeURIComponent((res as any).token)}&toast=login-validate`;
          }, 1000);
        }
        return;
      } else if (res?.error === "2FA_REQUIRED") {
        if (typeof window !== "undefined") {
          toast.info(
            "Seu e-mail ainda não foi autenticado. Verifique sua caixa de entrada."
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          let token = undefined;
          try {
            if (res?.url) {
              const url = new URL(res.url, window.location.origin);
              token = url.searchParams.get("token");
            }
          } catch {}
          if (!token && typeof localStorage !== "undefined") {
            token = localStorage.getItem("jwt_token");
          }
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
            window.location.href = `/autenticar/validar?token=${encodeURIComponent(token)}&toast=login-validate`;
          } else {
            toast.error(
              "Não foi possível recuperar o token de validação. Solicite um novo código."
            );
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

  const register = async (data: any): Promise<RegisterResponse> => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        // Garante que detalhes de erro do backend sejam repassados ao frontend
        return {
          error: json.error || "Erro ao registrar usuário",
          details: json.details || [],
        };
      }
      return json;
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
