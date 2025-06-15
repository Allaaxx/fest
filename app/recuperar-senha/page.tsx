"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, Check, KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Por favor, informe seu email");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/recover-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true);
        toast.success("Email de recuperação enviado com sucesso!");
      } else {
        toast.error(data.error || "Erro ao enviar email de recuperação");
      }
    } catch (error) {
      toast.error("Erro ao enviar email de recuperação");
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
                    RECUPERAÇÃO DE SENHA
                  </span>
                </div>

                {!isSubmitted ? (
                  <>
                    <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center my-6">
                      <KeyRound className="h-8 w-8 text-pink-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      Esqueceu sua senha?
                    </h1>

                    <p className="text-gray-500 text-center mb-8">
                      Informe seu email cadastrado para receber um link de
                      recuperação de senha.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          required
                        />
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
                            Enviando...
                          </span>
                        ) : (
                          "Recuperar senha"
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center my-6">
                      <Mail className="h-8 w-8 text-pink-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      Verifique seu email
                    </h1>

                    <p className="text-gray-500 text-center mb-4">
                      Enviamos um link de recuperação de senha para
                    </p>

                    <p className="font-medium text-gray-700 text-center mb-8">
                      {email}
                    </p>

                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                      Voltar
                    </Button>
                  </>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">
                    Não recebeu o email?
                  </p>
                  <button
                    onClick={() => {
                      if (isSubmitted) {
                        handleSubmit(new Event("click") as any);
                      }
                    }}
                    disabled={!isSubmitted || isLoading}
                    className={`text-pink-500 hover:text-pink-600 font-medium text-sm flex items-center justify-center mx-auto ${
                      !isSubmitted || isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Reenviar email
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Se você não solicitou a recuperação de senha, pode ignorar este
            email.
          </p>
        </div>
      </main>
    </div>
  );
}
