"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Facebook,
  Github,
  Linkedin,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success("Login realizado com sucesso!");
      router.push("/cliente/dashboard");
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Login com ${provider} em desenvolvimento`);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // MENU USER: Toggle submenu e active
    const menuUserItems = document.querySelectorAll(".menu-user > ul > li > a");
    menuUserItems.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const subMenu = anchor.nextElementSibling as HTMLElement | null;
        const parentLi = anchor.parentElement as HTMLElement | null;
        const parentUl = parentLi?.parentElement as HTMLElement | null;
        if (
          subMenu &&
          subMenu.classList.contains("sub-menu-user") &&
          parentLi &&
          parentUl
        ) {
          e.preventDefault();
          parentLi.classList.toggle("active");
          // Remove active dos irmãos
          Array.from(parentUl.children).forEach((sibling) => {
            if (sibling !== parentLi) sibling.classList.remove("active");
          });
          // Toggle submenu do item clicado
          if (subMenu.style.display === "block") {
            subMenu.style.display = "none";
          } else {
            subMenu.style.display = "block";
          }
          // Fechar submenus dos outros itens
          Array.from(parentUl.children).forEach((sibling) => {
            if (sibling !== parentLi) {
              const sibSub = sibling.querySelector(
                ".sub-menu-user"
              ) as HTMLElement | null;
              if (sibSub) sibSub.style.display = "none";
              sibling
                .querySelectorAll("li")
                .forEach((li) => li.classList.remove("active"));
            }
          });
        }
      });
    });
    // MENU BTN USER: Toggle sidebar
    const menuBtn = document.querySelector(".menu-btn-user");
    if (menuBtn) {
      menuBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const sidebar = document.querySelector(".sidebar-user");
        if (sidebar) sidebar.classList.toggle("active-user");
      });
    }
    // Função para alternar o modo de exibição
    function setSignUpMode(enable: boolean) {
      const container = document.querySelector(".container-auth");
      if (container) {
        if (enable) {
          container.classList.add("sign-up-mode");
        } else {
          container.classList.remove("sign-up-mode");
        }
      }
    }
    // Botão para mostrar cadastro
    const btnSignUp = document.getElementById("sign-up-btn");
    if (btnSignUp) {
      btnSignUp.addEventListener("click", () => {
        setSignUpMode(true);
        console.log("Botão Cadastrar (sign-up-btn) clicado");
      });
    }
    // Botão para mostrar login
    const btnSignIn = document.getElementById("sign-in-btn");
    if (btnSignIn) {
      btnSignIn.addEventListener("click", () => {
        setSignUpMode(false);
        console.log("Botão Entrar (sign-in-btn) clicado");
      });
    }
    const container = document.querySelector(".auth-container");
    const registerBtn = document.querySelector(".register-btn");
    const loginBtn = document.querySelector(".login-btn");
    if (registerBtn) {
      registerBtn.addEventListener("click", () => {
        if (container) {
          container.classList.add("active");
        }
      });
    }
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        if (container) {
          container.classList.remove("active");
        }
      });
    }
    // Cleanup
    return () => {
      menuUserItems.forEach((anchor) => {
        anchor.replaceWith(anchor.cloneNode(true));
      });
      if (menuBtn) menuBtn.replaceWith(menuBtn.cloneNode(true));
      if (btnSignUp) btnSignUp.replaceWith(btnSignUp.cloneNode(true));
      if (btnSignIn) btnSignIn.replaceWith(btnSignIn.cloneNode(true));
      if (registerBtn) registerBtn.replaceWith(registerBtn.cloneNode(true));
      if (loginBtn) loginBtn.replaceWith(loginBtn.cloneNode(true));
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative overflow-hidden">
      {/* Elementos geométricos do Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-20">
        <div className="absolute top-20 right-20 w-2 h-2 bg-fest-primary rounded-full opacity-60"></div>
        <div className="absolute top-40 left-16 w-1 h-1 bg-fest-primary rounded-full opacity-40"></div>
        <div className="absolute bottom-32 right-1/3 w-1.5 h-1.5 bg-fest-primary rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-fest-primary rounded-full opacity-30"></div>
        <div className="absolute top-10 left-1/4 w-3 h-3 bg-fest-primary rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-fest-primary rounded-full opacity-40"></div>
        <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-fest-primary rounded-full opacity-30"></div>
        <div className="absolute top-1/4 right-1/4 w-2.5 h-2.5 bg-fest-primary rounded-full opacity-25"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-fest-primary rounded-full opacity-35"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-fest-primary rounded-full opacity-50"></div>
        <div className="absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-fest-primary rounded-full opacity-20"></div>
        <div className="absolute top-28 left-1/2 w-2 h-2 bg-fest-primary rounded-full opacity-45"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2.5 h-2.5 bg-fest-primary rounded-full opacity-25"></div>
        <div className="absolute top-1/5 right-1/5 w-1.5 h-1.5 bg-fest-primary rounded-full opacity-35"></div>
        <div className="absolute bottom-10 left-1/2 w-1 h-1 bg-fest-primary rounded-full opacity-40"></div>
        <div className="absolute top-1/6 left-1/6 w-2 h-2 bg-fest-primary rounded-full opacity-30"></div>
        <div className="absolute bottom-1/6 right-1/6 w-2 h-2 bg-fest-primary rounded-full opacity-30"></div>
      </div>
      {/* Formulário de autenticação */}
      <div className="auth-container  relative z-10">
        <div
          className={`form-box flex justify-center login transition-all duration-[1500ms] delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <form action="#" className="z-30" onSubmit={handleSubmit}>
            <div className="mb-8">
              <div
                className={`flex items-center justify-center mb-4 transition-all duration-1000 delay-200 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <Sparkles className="h-6 w-6 text-fest-primary mr-2" />
                <span className="text-fest-primary font-medium tracking-wide uppercase text-sm">
                  Marketplace de Eventos
                </span>
              </div>
              <h1
                className={`text-4xl text-center md:text-6xl font-bold text-black mb-6 leading-tight transition-all duration-1000 delay-300 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Entrar
              </h1>
              <p
                className={`text-lg text-center text-gray-600 mb-8 leading-relaxed transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Acesse sua conta e aproveite todos os recursos do nosso
                marketplace.
              </p>
            </div>
            <div className="input-box flex items-center gap-2">
              <User className="w-6 h-6" />
              <Input
                type="text"
                placeholder="Usuário"
                required
                className="flex-1"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="input-box flex items-center gap-2">
              <Lock className="w-6 h-6" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                required
                className="flex-1"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="forgot-link">
              <a href="#">Esqueceu a senha?</a>
            </div>
            <button
              type="submit"
              className=" bg-fest-primary hover:bg-fest-black2  hover:text-fest-primary text-white px-8 py-2 text-lg font-md rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group w-full"
              disabled={isLoading}
            >
              {isLoading ? "Carregando..." : "Entrar"}
            </button>
            <p>ou entre com redes sociais</p>
            <div className="social-icons">
              <a
                href="#"
                aria-label="Login com Google"
                onClick={(e) => {
                  e.preventDefault();
                  handleSocialLogin("Google");
                }}
              >
                <Mail className="w-6 h-6 " />
              </a>
              <a
                href="#"
                aria-label="Login com Facebook"
                onClick={(e) => {
                  e.preventDefault();
                  handleSocialLogin("Facebook");
                }}
              >
                <Facebook className="w-6 h-6 " />
              </a>
              <a
                href="#"
                aria-label="Login com GitHub"
                onClick={(e) => {
                  e.preventDefault();
                  handleSocialLogin("GitHub");
                }}
              >
                <Github className="w-6 h-6 " />
              </a>
              <a
                href="#"
                aria-label="Login com LinkedIn"
                onClick={(e) => {
                  e.preventDefault();
                  handleSocialLogin("LinkedIn");
                }}
              >
                <Linkedin className="w-6 h-6 " />
              </a>
            </div>
          </form>
        </div>
        <div
          className={`form-box flex justify-center register transition-all duration-[1500ms] delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <form action="#" className="w-full max-w-md">
            <div className="mb-8">
              <div
                className={`flex items-center justify-center mb-4 transition-all duration-1000 delay-200 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <Sparkles className="h-6 w-6 text-fest-primary mr-2" />
                <span className="text-fest-primary font-medium tracking-wide uppercase text-sm">
                  Marketplace de Eventos
                </span>
              </div>
              <h1
                className={`text-4xl text-center md:text-6xl font-bold text-black mb-6 leading-tight transition-all duration-1000 delay-300 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Registrar
              </h1>
              <p
                className={`text-lg text-center text-gray-600 mb-8 leading-relaxed transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Crie sua conta e comece a transformar seus eventos hoje mesmo.
              </p>
            </div>
            <div className="input-box flex items-center gap-2">
              <User className="w-6 h-6" />
              <Input
                type="text"
                placeholder="Username"
                required
                className="flex-1"
              />
            </div>
            <div className="input-box flex items-center gap-2">
              <Mail className="w-6 h-6" />
              <Input
                type="email"
                placeholder="Email"
                required
                className="flex-1"
              />
            </div>
            <div className="input-box flex items-center gap-2">
              <Lock className="w-6 h-6" />
              <Input
                type="password"
                placeholder="Password"
                required
                className="flex-1"
              />
            </div>
            <button
              type="submit"
              className=" bg-fest-primary hover:bg-fest-black2  hover:text-fest-primary text-white px-8 py-2 text-lg font-md rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group w-full"
            >
              Register
            </button>
            <p>or register with social platforms</p>
            <div className="social-icons flex gap-2">
              <a href="#" aria-label="Login com Google">
                <Mail className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Login com Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Login com GitHub">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Login com LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </form>
        </div>
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <div
              className={`transition-all duration-[1500ms] delay-100 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="mb-8 mt-16">
                <div
                  className={`flex items-center justify-center mb-4 transition-all duration-1000 delay-200 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <Sparkles className="h-6 w-6 text-fest-primary mr-2" />
                  <span className="text-fest-primary font-medium tracking-wide uppercase text-sm">
                    Marketplace de Eventos
                  </span>
                </div>
                <h1
                  className={`text-4xl text-center md:text-6xl font-bold text-black mb-6 leading-tight transition-all duration-1000 delay-300 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  Novo por aqui?
                  <span className="block text-fest-primary">
                    Crie sua conta!
                  </span>
                </h1>
                <p
                  className={`text-lg text-center md:text-xl text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  Clique no botão abaixo para se cadastrar e aproveitar todos os
                  benefícios do nosso marketplace de eventos. É rápido, fácil e
                  gratuito!
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-fest-primary hover:bg-fest-black2 hover:text-fest-primary text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                  onClick={(e) => {
                    e.preventDefault();
                    const container = document.querySelector(".auth-container");
                    if (container) {
                      container.classList.add("active");
                    }
                  }}
                  type="button"
                  aria-label="Mostrar formulário de cadastro"
                >
                  Registrar
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          <div className="toggle-panel toggle-right">
            <div
              className={`transition-all duration-[1500ms] delay-100 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="mb-8 mt-16">
                <div
                  className={`flex items-center justify-center mb-4 transition-all duration-1000 delay-200 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <Sparkles className="h-6 w-6 text-fest-primary mr-2" />
                  <span className="text-fest-primary font-medium tracking-wide uppercase text-sm">
                    Marketplace de Eventos
                  </span>
                </div>
                <h1
                  className={`text-4xl text-center md:text-6xl font-bold text-black mb-6 leading-tight transition-all duration-1000 delay-300 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  Já tem uma conta?
                  <span className="block text-fest-primary">
                    Faça seu login!
                  </span>
                </h1>
                <p
                  className={`text-lg text-center md:text-xl text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  Se você já possui cadastro, clique no botão abaixo para
                  acessar sua conta e aproveitar todos os recursos do nosso
                  marketplace.
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-fest-primary hover:bg-fest-black2 hover:text-fest-primary text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                  onClick={(e) => {
                    e.preventDefault();
                    const container = document.querySelector(".auth-container");
                    if (container) {
                      container.classList.remove("active");
                    }
                  }}
                  type="button"
                  aria-label="Mostrar formulário de login"
                >
                  Entrar
                  <ArrowLeft className="ml-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
