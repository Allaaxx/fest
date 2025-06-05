import { Pencil, X as Close } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, ExternalLink, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

export default function ProductPreviewPanelEdit({
  productData,
  onToggleEdit,
  onFieldEdit,
  onFeatureEdit,
  onRemoveFeature,
  onAddFeature,
  onImageUpload,
  onRemoveImage,
  onSave,
}: {
  productData: any;
  formatCurrency: (value: string) => string;
  onToggleEdit: () => void;
  onFieldEdit: (field: string, value: any) => void;
  onVendorEdit: (field: string, value: any) => void;
  onFeatureEdit: (index: number, value: string) => void;
  onRemoveFeature: (index: number) => void;
  onAddFeature: () => void;
  onImageUpload: (files: FileList) => void;
  onRemoveImage: (index: number) => void;
  onSave: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: productData.description || "",
    onUpdate: ({ editor }) => {
      onFieldEdit("description", editor.getHTML());
    },
  });

  const handleEditClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onToggleEdit();
    }, 700); // tempo da animação
  };

  // Toolbar fixa para o tiptap
  function TiptapToolbar({ editor }: { editor: any }) {
    if (!editor) return null;
    return (
      <div className="flex gap-2 bg-white border rounded shadow p-2 mb-2 sticky top-0 z-10">
        <button
          type="button"
          className={editor.isActive("bold") ? "font-bold text-primary" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Negrito"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={editor.isActive("italic") ? "italic text-primary" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Itálico"
        >
          <i>I</i>
        </button>
        <button
          type="button"
          className={
            editor.isActive("underline") ? "underline text-primary" : ""
          }
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Sublinhado"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className={
            editor.isActive("strike") ? "line-through text-primary" : ""
          }
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Tachado"
        >
          <s>S</s>
        </button>
        <button
          type="button"
          className={
            editor.isActive({ textAlign: "left" }) ? "text-primary" : ""
          }
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          aria-label="Alinhar à esquerda"
        >
          <span className="icon">⯇</span>
        </button>
        <button
          type="button"
          className={
            editor.isActive({ textAlign: "center" }) ? "text-primary" : ""
          }
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          aria-label="Centralizar"
        >
          <span className="icon">≡</span>
        </button>
        <button
          type="button"
          className={
            editor.isActive({ textAlign: "right" }) ? "text-primary" : ""
          }
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          aria-label="Alinhar à direita"
        >
          <span className="icon">⯈</span>
        </button>
        <button
          type="button"
          className={editor.isActive("bulletList") ? "text-primary" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Lista"
        >
          •
        </button>
        <button
          type="button"
          className={editor.isActive("orderedList") ? "text-primary" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Lista ordenada"
        >
          1.
        </button>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:p-5 product-edit-panel">
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-row justify-around sm:gap-0 sm:items-center sm:justify-between card-component">
          <a
            href="#"
            className="text-black flex items-center gap-3 mb-2 sm:mb-0"
          >
            <ExternalLink className="w-5 h-5" />
            <h4 className="m-0 font-light">Voltar a dashboard</h4>
          </a>
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              type="button"
              onClick={onSave}
              className="px-4 py-1 rounded border border-fest-black2 text-fest-primary bg-fest-black2 hover:text-fest-black2 hover:border-fest-primary transition-colors font-semibold text-sm flex items-center gap-2"
              aria-label="Salvar"
            >
              Salvar
            </Button>
          </div>
        </div>
        <div className="shadow-lg p-4 bg-white rounded-lg flex flex-col ">
          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full">
              <h5 className="flex items-center px-4 font-light text-fest-black2 mb-2 md:mb-0">
                Categoria:
                <Select
                  value={productData.category}
                  onValueChange={(v) => onFieldEdit("category", v)}
                >
                  <SelectTrigger className="w-48 ml-3 bg-transparent ">
                    <SelectValue placeholder="Categoria" />
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
              </h5>
              <h5 className="flex items-center px-4 font-light text-fest-black2">
                Tipo de produto:
                <div className="ml-3">
                  <Select
                    value={productData.type}
                    onValueChange={(value) => onFieldEdit("type", value)}
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
              </h5>
            </div>
            <p className="mb-2 px-3 break-words font-normal text-2xl ">
              <Input
                className="my-3 font-normal text-2xl"
                value={productData.name}
                onChange={(e) => onFieldEdit("name", e.target.value)}
                placeholder="Nome do produto"
              />
            </p>
            <p className="px-3 mb-2 text-gray-600">
              <div className="border rounded bg-white min-h-[120px] p-2 focus-within:ring-2 ">
                <TiptapToolbar editor={editor} />
                <EditorContent editor={editor} />
              </div>
            </p>
          </div>
          <div className="flex flex-wrap mb-4 items-end justify-start gap-4 ">
            <h3 className="mb-2 px-3 break-words font-normal text-2xl ">
              <CurrencyInput
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm my-3 font-normal text-2xl"
                value={productData.price}
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                prefix="R$ "
                onValueChange={(value) => onFieldEdit("price", value || "")}
                placeholder="0,00"
                disableAbbreviations={true}
                allowDecimals
                allowNegativeValue={false}
                defaultValue={undefined}
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
              />
            </h3>
            <h4 className="mb-2 px-3 break-words text-gray-500 line-through font-light text-xl">
              <CurrencyInput
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm my-3 text-2xl text-gray-500 font-light"
                value={productData.originalPrice}
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                prefix="R$ "
                disableAbbreviations={true}
                onValueChange={(value) =>
                  onFieldEdit("originalPrice", value || "")
                }
                placeholder="0,00"
                allowDecimals
                allowNegativeValue={false}
                defaultValue={undefined}
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
              />
            </h4>
          </div>
          <div className="mb-5 flex items-center justify-start px-3 gap-5 flex-wrap">
            <div className="font-light flex items-end gap-2">
              <h4 className="m-0 font-light  text-gray-500 text-base">
                Código do produto:
              </h4>
              <h4 className="font-bold mb-0 ">
                <input
                  className=" bg-transparent outline-none px-1 text-gray-700 font-bold"
                  value={productData.id}
                  onChange={(e) => onFieldEdit("id", e.target.value)}
                  placeholder="Código"
                  disabled
                />
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
                <Select
                  value={productData.availability ? "1" : "0"}
                  onValueChange={(v) => onFieldEdit("availability", v === "1")}
                >
                  <SelectTrigger className="w-32  bg-transparent px-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Em estoque</SelectItem>
                    <SelectItem value="0">Indisponível</SelectItem>
                  </SelectContent>
                </Select>
              </h6>
            </div>
          </div>

          {/* Características */}
          <div>
            <label className="block text-fest-black2 font-semibold mb-1">
              Características
            </label>
            {productData.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  value={feature}
                  onChange={(e) => onFeatureEdit(index, e.target.value)}
                  placeholder="Ex: Kit completo para 8 pessoas"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRemoveFeature(index)}
                  className="bg-fest-black2 text-fest-primary hover:text-fest-black2 hover:bg-fest-primary transition-colors"
                  aria-label="Remover característica"
                >
                  <Close className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={onAddFeature}
              className="w-full mt-2"
            >
              Adicionar Característica
            </Button>
          </div>
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
                  e.target.files && onImageUpload(e.target.files)
                }
                className="hidden"
                id="image-upload-form"
              />
              <label
                htmlFor="image-upload-form"
                className="inline-block bg-fest-black2 text-fest-primary px-4 py-2 rounded cursor-pointer hover:bg-fest-primary hover:text-fest-black2 transition-colors"
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
                      onClick={() => onRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Close className="w-3 h-3" />
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
        </div>
      </div>
    </div>
  );
}
