import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Star, ExternalLink, Calendar } from "lucide-react";

export default function ProductPreviewPanel({ productData, formatCurrency }: {
  productData: any;
  formatCurrency: (value: string) => string;
}) {
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-6 p-5">
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between card-component">
          <a
            href="/loja"
            className="text-black flex items-center gap-3 mb-2 sm:mb-0"
          >
            <ExternalLink className="w-5 h-5" />
            <h4 className="m-0 font-light">Voltar a loja</h4>
          </a>
          <div className="flex items-center gap-3">
            <h6 className="font-light m-0">Preview do Produto</h6>
            <Calendar className="h-8 w-8 text-fest-primary " />
          </div>
        </div>
        <div className="mt-5">
          <h5 className="mb-4 px-4 font-light text-gray-400 ">
            Categoria: {productData.category}
          </h5>
          <p className="mb-2 px-3 break-words font-normal text-2xl card-title">
            {productData.name || (
              <span className="text-gray-400">Nome do produto</span>
            )}
          </p>
          <p className="px-3 mb-2 text-gray-600">
            {productData.description || (
              <span className="text-gray-400">Descrição do produto</span>
            )}
          </p>
          <div className="flex items-center gap-2 px-3 mb-2">
            <span className="text-sm text-gray-500">Fornecedor:</span>
            <span className="font-medium text-black">
              {productData.vendor?.name || (
                <span className="text-gray-400">Fornecedor</span>
              )}
            </span>
            <span className="text-xs text-gray-400">
              ({productData.vendor?.location || "Localização"})
            </span>
          </div>
        </div>
        <div className="flex flex-wrap mb-4 items-end justify-start gap-4 card-price">
          <h3 className="mb-2 px-3 break-words font-normal text-2xl text-fest-primary">
            {productData.price ? (
              ` ${formatCurrency(productData.price)}`
            ) : (
              <span className="text-gray-400">Preço</span>
            )}
          </h3>
          <h4 className="mb-2 px-3 break-words text-gray-500 line-through font-light text-xl">
            {productData.originalPrice
              ? ` ${formatCurrency(productData.originalPrice)}`
              : null}
          </h4>
        </div>
        <div className="mb-5 flex items-end justify-start px-3 gap-5 flex-wrap">
          <div className="font-light flex items-end gap-2">
            <h4 className="m-0 font-light  text-gray-500 text-base">
              Código do produto:
            </h4>
            <h4 className="font-bold mb-0 ">
              {productData.id || (
                <span>1232451</span>
              )}
            </h4>
          </div>
          <div className="flex items-center gap-1 text-black">
            <CheckSquare
              className={`w-5 h-5 ${
                productData.availability ? "text-black" : "text-gray-400"
              }`}
            />
            <h6
              className={`m-0 text-lg font-bold ${
                productData.availability ? "text-black" : "text-gray-400"
              }`}
            >
              {productData.availability ? "Em estoque" : "Indisponível"}
            </h6>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-4 px-3 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(Math.floor(Number(productData.rating)))].map(
              (_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              )
            )}
            {[...Array(5 - Math.floor(Number(productData.rating)))].map(
              (_, i) => (
                <Star key={i} className="h-5 w-5 text-gray-300" />
              )
            )}
          </div>
          <h4 className="m-0 font-light text-xl">
            {productData.rating || 0}
          </h4>
          <h5 className="mb-0 font-light text-black text-base">
            {productData.reviews || 0} Avaliações
          </h5>
        </div>
      </div>
    </div>
  );
}
