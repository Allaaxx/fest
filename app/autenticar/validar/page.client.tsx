"use client";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const fetchCache = "force-no-store";

import { useState, useEffect } from "react";
import OtpInputs from "@/components/ui/otp-inputs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle2, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import AnimatedBackgroundBalls from "@/components/ui/animated-background-balls";

export default function ValidarCodigoPage() {
  const searchParams = useSearchParams();
  // Pega o token da URL
  const token = searchParams.get("token") || "";
  const toastParam = searchParams.get("toast");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const RESEND_INTERVAL = 120; // segundos

  useEffect(() => {
    if (toastParam === "register-success") {
      toast.success(
        "Cadastro realizado com sucesso! Verifique seu e-mail para validar a conta."
      );
    }
    if (toastParam === "login-validate") {
      toast.info(
        "Seu e-mail ainda não foi autenticado. Verifique sua caixa de entrada."
      );
    }
  }, [toastParam]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendLoading) {
      setResendTimer(RESEND_INTERVAL);
    }
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendLoading, resendTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, code }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Conta verificada com sucesso!");
        setTimeout(() => {
          window.location.href = "/cliente/dashboard";
        }, 1500);
      } else {
        toast.error(data.error || "Erro ao validar código");
      }
    } catch (err) {
      toast.error("Erro ao validar código");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      const res = await fetch("/api/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Novo código enviado para seu email!");
        setResendTimer(RESEND_INTERVAL); // inicia o timer
      } else {
        toast.error(data.error || "Erro ao reenviar código");
      }
    } catch (err) {
      toast.error("Erro ao reenviar código");
    } finally {
      setResendLoading(false);
    }
  };

  const isComplete = code.length === 6;
  const canResend = !resendLoading && resendTimer === 0;

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden ">
      <AnimatedBackgroundBalls />
      {/* Geometric background */}

      <div className="animate-fade-in relative z-10 w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-fest-primary font-medium tracking-wide uppercase text-sm flex items-center gap-2">
            <svg
              className="h-5 w-5 text-fest-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Validação de Conta
          </span>
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Verifique seu email
          </h1>
          <p className="text-gray-500 text-center mt-2">
            Enviamos um código de 6 dígitos para o e-mail cadastrado.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Digite o código de verificação
            </label>
            <OtpInputs value={code} onChange={setCode} length={6} />
          </div>
          <Button
            type="submit"
            className={`w-full py-3 rounded-lg transition-all ${
              isComplete
                ? "bg-pink-500 hover:bg-pink-600 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isComplete || loading}
          >
            {loading ? (
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
              </span>
            ) : (
              <span className="flex items-center justify-center">
                {isComplete && <CheckCircle2 className="mr-2 h-4 w-4" />}
                Validar código
              </span>
            )}
          </Button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Não recebeu o código?</p>
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-pink-500 hover:text-pink-600 font-medium text-sm flex items-center justify-center mx-auto"
              >
                <Mail className="h-4 w-4 mr-1" />
                Reenviar código
              </button>
            ) : (
              <div className="text-gray-400 text-sm flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" />
                Reenviar em {Math.floor(resendTimer / 60)}:
                {(resendTimer % 60).toString().padStart(2, "0")}
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-6">
          Se você não solicitou este código, pode ignorar este email.
        </p>
      </div>
    </section>
  );
}
