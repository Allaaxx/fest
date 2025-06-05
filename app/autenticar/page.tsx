"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
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
      <div className="auth-container relative z-10">
        <div className="form-box flex justify-center login">
          <form action="#" className="z-30">
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <a href="#">
                <i className="bx bxl-google"></i>
              </a>
              <a href="#">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#">
                <i className="bx bxl-github"></i>
              </a>
              <a href="#">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </form>
        </div>
        <div className="form-box flex justify-center register">
          <form action="#" className="w-full max-w-md">
            <h1>Registration</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn">
              Register
            </button>
            <p>or register with social platforms</p>
            <div className="social-icons">
              <a href="#">
                <i className="bx bxl-google"></i>
              </a>
              <a href="#">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#">
                <i className="bx bxl-github"></i>
              </a>
              <a href="#">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </form>
        </div>
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn">Register</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
