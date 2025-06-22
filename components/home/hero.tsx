"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackgroundBalls from "@/components/ui/animated-background-balls";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center">
      {/* Fundo animado de bolinhas */}
      <AnimatedBackgroundBalls />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pb-8">
        {/* Main heading */}
        <div
          className={`transition-all bg-white rounded-md duration-[1500ms] delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
              className={`text-5xl md:text-7xl lg:text-8xl font-bold text-black mb-6 leading-tight transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Transforme
              <span className="block text-fest-primary">Seus Eventos</span>
            </h1>

            <p
              className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Alugue decorações incríveis, monte você mesmo e celebre momentos
              únicos com estilo e praticidade.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link href="/loja">
              <Button
                size="lg"
                className="bg-fest-primary hover:bg-fest-dark text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                Explorar Produtos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/categoria/locacao">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Ver Locações
              </Button>
            </Link>
          </div>

          {/* Simple stats */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">500+</div>
              <div className="text-gray-600">Produtos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">1000+</div>
              <div className="text-gray-600">Eventos Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">4.9★</div>
              <div className="text-gray-600">Avaliação Média</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-fest-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
