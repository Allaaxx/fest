import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React from "react";

export default function Favorites() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Meus Favoritos</h2>
        <p className="text-sm text-gray-500">Produtos e serviços que você salvou</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { nome: "Decoração Rústica", categoria: "Decoração", preco: "R$ 1.200", desconto: "10% OFF", imagem: "🌿" },
          { nome: "DJ Premium", categoria: "Som", preco: "R$ 800", desconto: null, imagem: "🎵" },
          { nome: "Buffet Gourmet", categoria: "Alimentação", preco: "R$ 45/pessoa", desconto: "15% OFF", imagem: "🍽️" },
          { nome: "Fotografia Profissional", categoria: "Fotografia", preco: "R$ 1.500", desconto: null, imagem: "📸" },
          { nome: "Flores Tropicais", categoria: "Decoração", preco: "R$ 300", desconto: "20% OFF", imagem: "🌺" },
          { nome: "Iluminação LED", categoria: "Iluminação", preco: "R$ 600", desconto: null, imagem: "💡" },
        ].map((item, index) => (
          <Card key={index} className="relative">
            {item.desconto && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {item.desconto}
              </div>
            )}
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{item.imagem}</div>
                <h3 className="font-semibold text-gray-900">{item.nome}</h3>
                <p className="text-sm text-gray-500">{item.categoria}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-600">{item.preco}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </Button>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    Contratar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
