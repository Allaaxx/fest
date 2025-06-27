"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  KeyRound,
  ShieldCheck,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    // Recuperar o token da URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");
      if (urlToken) {
        setToken(urlToken);
      }
    }
  }, []);

  useEffect(() => {
    setPasswordChecks({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    });
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error("Por favor, informe uma nova senha");
      return;
    }



    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      // Chamada real para API de redefinição
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        toast.success("Senha redefinida com sucesso!");

        // Redirecionar após 3 segundos
        setTimeout(() => {
          router.push("/autenticar");
        }, 3000);
      } else {
        if (Array.isArray(data.details)) {
          data.details.forEach((msg: string) => toast.error(msg));
        } else {
          toast.error(data.error || "Erro ao redefinir senha");
        }
      }
    } catch (error) {
      toast.error("Erro ao redefinir senha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-pink-500 mr-2" />
                  <span className="text-pink-500 uppercase text-sm font-medium tracking-wide">
                    REDEFINIÇÃO DE SENHA
                  </span>
                </div>

                {!isSuccess ? (
                  <>
                    <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center my-6">
                      <KeyRound className="h-8 w-8 text-pink-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      Crie uma nova senha
                    </h1>

                    <p className="text-gray-500 text-center mb-8">
                      Sua nova senha deve ter pelo menos 8 caracteres.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                      <input type="hidden" value={token} />

                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nova senha
                        </label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            onClick={() => setShowPassword((v) => !v)}
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirme a nova senha
                        </label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <ul className="mt-2 text-xs text-gray-600 space-y-1">
                          <li className="flex items-center gap-1">
                            {passwordChecks.length ? (
                              <span className="text-green-500">✔</span>
                            ) : (
                              <span className="text-red-500">✖</span>
                            )}
                            Mínimo de 8 caracteres
                          </li>
                          <li className="flex items-center gap-1">
                            {passwordChecks.upper ? (
                              <span className="text-green-500">✔</span>
                            ) : (
                              <span className="text-red-500">✖</span>
                            )}
                            Pelo menos uma letra maiúscula
                          </li>
                          <li className="flex items-center gap-1">
                            {passwordChecks.lower ? (
                              <span className="text-green-500">✔</span>
                            ) : (
                              <span className="text-red-500">✖</span>
                            )}
                            Pelo menos uma letra minúscula
                          </li>
                          <li className="flex items-center gap-1">
                            {passwordChecks.number ? (
                              <span className="text-green-500">✔</span>
                            ) : (
                              <span className="text-red-500">✖</span>
                            )}
                            Pelo menos um número
                          </li>
                          <li className="flex items-center gap-1">
                            {passwordChecks.special ? (
                              <span className="text-green-500">✔</span>
                            ) : (
                              <span className="text-red-500">✖</span>
                            )}
                            Pelo menos um caractere especial
                          </li>
                        </ul>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Redefinindo...
                          </span>
                        ) : (
                          "Redefinir senha"
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center my-6">
                      <ShieldCheck className="h-8 w-8 text-green-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      Senha redefinida!
                    </h1>

                    <p className="text-gray-500 text-center mb-8">
                      Sua senha foi alterada com sucesso. Você será
                      redirecionado para a página de login.
                    </p>

                    <Link href="/autenticar">
                      <Button className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors">
                        Ir para o login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Por segurança, este link de redefinição de senha expira em 1 hora.
          </p>
        </div>
      </main>
    </div>
  );
}
