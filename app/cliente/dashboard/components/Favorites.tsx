import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, ShoppingBag, Star, Store } from "lucide-react";
import React from "react";
import { useWishlist } from "@/components/providers/wishlist-provider";

export default function Favorites() {
  const { state, removeFromWishlist, addToWishlist } = useWishlist();
  const favorites = state.items;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            Nenhum favorito ainda.
          </div>
        ) : (
          favorites.map((item) => (
            (!item.nome || !item.imagem) ? (
              <Card key={item.id} className="flex items-center justify-center h-48 bg-gray-50 border border-dashed border-gray-300">
                <span className="text-gray-400 text-sm">Favorito incompleto. Adicione pelo produto para ver detalhes.</span>
              </Card>
            ) : (
              <Card
                key={item.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                {/* Badge de desconto */}
                {item.desconto && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      {item.desconto}
                    </span>
                  </div>
                )}
                {/* Badge de indisponível */}
                {!item.disponivel && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Indisponível
                    </span>
                  </div>
                )}
                {/* Imagem do produto */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.imagem || "/placeholder.svg"}
                    alt={item.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  {/* Botão de remover favorito */}
                  <button
                    className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
                    onClick={() => removeFromWishlist(item.id)}
                    title="Remover dos favoritos"
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-current" />
                  </button>
                </div>
                <CardContent className="p-4">
                  {/* Categoria */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {item.categoria}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {item.avaliacao}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({item.avaliacoes})
                      </span>
                    </div>
                  </div>
                  {/* Nome do produto */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {item.nome}
                  </h3>
                  {/* Vendedor */}
                  <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <Store className="h-4 w-4 mr-1" />
                    {item.vendedor}
                  </p>
                  {/* Preço */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-pink-600">
                        {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                      {item.precoOriginal && (
                        <span className="text-sm text-gray-500 line-through">
                          {item.precoOriginal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Botões de ação */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                      disabled={!item.disponivel}
                    >
                      {item.disponivel ? (
                        <>
                          <ShoppingBag className="h-4 w-4 mr-1" />
                          Contratar
                        </>
                      ) : (
                        "Indisponível"
                      )}
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          ))
        )}
      </div>
    </>
  );
}
