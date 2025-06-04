import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";
import CurrencyInput from "react-currency-input-field";

export default function ProductForm({
  productData,
  handleInputChange,
  handleFeatureChange,
  addFeature,
  removeFeature,
  handleImageUpload,
  removeImage,
  formatCurrency,
}: {
  productData: any;
  handleInputChange: (field: string, value: any) => void;
  handleFeatureChange: (idx: number, value: string) => void;
  addFeature: () => void;
  removeFeature: (idx: number) => void;
  handleImageUpload: (files: FileList) => void;
  removeImage: (idx: number) => void;
  formatCurrency: (value: string) => string;
}) {
  return (
    <Card className="container w-6/12 mb-10 p-6">
      <CardContent className="space-y-6">
        {/* Informações Básicas */}
        <div>
          <label className="block text-fest-black2 font-semibold mb-1">
            Nome do Produto *
          </label>
          <Input
            value={productData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Ex: Decoração Mesa Ben 10"
          />
        </div>
        <div>
          <label className="block text-fest-black2 font-semibold mb-1">
            Descrição *
          </label>
          <Textarea
            value={productData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Descreva seu produto em detalhes..."
            rows={4}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-fest-black2 font-semibold mb-1">
              Categoria *
            </label>
            <Select
              value={productData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="decoracao-infantil">
                  Decoração Infantil
                </SelectItem>
                <SelectItem value="decoracao-casamento">
                  Decoração Casamento
                </SelectItem>
                <SelectItem value="buffet">Buffet</SelectItem>
                <SelectItem value="moveis">Móveis</SelectItem>
                <SelectItem value="iluminacao">Iluminação</SelectItem>
                <SelectItem value="fotografia">Fotografia</SelectItem>
                <SelectItem value="som">Som</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-fest-black2 font-semibold mb-1">
              Tipo *
            </label>
            <Select
              value={productData.type}
              onValueChange={(value) => handleInputChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="venda">Venda</SelectItem>
                <SelectItem value="locacao">Locação</SelectItem>
                <SelectItem value="servico">Serviço</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label className="block text-fest-black2 font-semibold mb-1">
            Tags (separadas por vírgula)
          </label>
          <Input
            value={productData.tags}
            onChange={(e) => handleInputChange("tags", e.target.value)}
            placeholder="festa, infantil, ben10, decoração"
          />
        </div>
        {/* Preços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-fest-black2 font-semibold mb-1">
              Preço (R$) *
            </label>
            <CurrencyInput
              className="input bg-white border-fest-primary focus:border-fest-primary text-fest-black2 w-full px-3 py-2 rounded"
              value={productData.price}
              decimalsLimit={2}
              decimalSeparator=","
              groupSeparator="."
              prefix="R$ "
              onValueChange={(value) => handleInputChange("price", value || "")}
              placeholder="1250,00"
            />
            {productData.price && (
              <p className="text-sm text-fest-gray mt-1">
                Valor formatado: {formatCurrency(productData.price)}
              </p>
            )}
          </div>
        </div>
        {productData.type !== "servico" && productData.type !== "locacao" && (
          <div>
            <label className="block text-fest-black2 font-semibold mb-1">
              Estoque
            </label>
            <Input
              value={productData.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              placeholder="10"
              type="number"
            />
          </div>
        )}
        {/* Características */}
        <div>
          <label className="block text-fest-black2 font-semibold mb-1">
            Características
          </label>
          {productData.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Ex: Kit completo para 8 pessoas"
              />
              {productData.features.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addFeature}
            className="w-full mt-2"
          >
            Adicionar Característica
          </Button>
        </div>
        {/* Imagens */}
        <div>
          <label className="block text-fest-black2 font-semibold mb-1">
            Imagens do Produto
          </label>
          <div className="border-2 border-dashed border-fest-primary rounded-lg p-6 text-center hover:border-fest-primary transition-colors">
            <Upload className="w-8 h-8 text-fest-primary mx-auto mb-2" />
            <p className="text-sm text-fest-gray mb-2">
              Arraste suas imagens aqui ou clique para selecionar
            </p>
            <p className="text-xs text-fest-gray mb-4">
              Máximo 5 imagens, até 5MB cada (JPG, PNG)
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files)
              }
              className="hidden"
              id="image-upload-form"
            />
            <label
              htmlFor="image-upload-form"
              className="inline-block bg-fest-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-fest-primary-dark transition-colors"
            >
              Selecionar Imagens
            </label>
          </div>
          {productData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {productData.images.map((image: File, index: number) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {index === 0 && (
                    <Badge className="absolute bottom-2 left-2 bg-fest-primary text-white text-xs">
                      Principal
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Disponibilidade e entrega */}
        <div>
          <label className="block text-fest-black2 font-semibold mb-1">
            Disponibilidade
          </label>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={productData.availability}
              onChange={(e) =>
                handleInputChange("availability", e.target.checked)
              }
            />
            <span>Produto disponível</span>
          </div>
          <label className="block text-fest-black2 font-semibold mb-1">
            Opções de Entrega
          </label>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={productData.pickup}
              onChange={(e) => handleInputChange("pickup", e.target.checked)}
            />
            <span>Retirada no local</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={productData.delivery}
              onChange={(e) => handleInputChange("delivery", e.target.checked)}
            />
            <span>Entrega disponível</span>
          </div>
        </div>
        {/* Botões de ação */}
        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => {
              /* submit logic aqui */
            }}
            className="bg-fest-primary text-white px-6 py-2 rounded font-semibold"
          >
            Criar Produto
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              /* cancelar logic aqui */
            }}
            className="border-fest-primary text-fest-primary px-6 py-2 rounded font-semibold"
          >
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
