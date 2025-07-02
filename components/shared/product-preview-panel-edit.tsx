"use client"

import { BookmarkPlus, DoorClosedIcon as Close, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, ExternalLink, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"

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
  productData: any
  formatCurrency: (value: string) => string
  onToggleEdit: () => void
  onFieldEdit: (field: string, value: any) => void
  onVendorEdit: (field: string, value: any) => void
  onFeatureEdit: (index: number, value: string) => void
  onRemoveFeature: (index: number) => void
  onAddFeature: () => void
  onImageUpload: (files: FileList) => void
  onRemoveImage: (index: number) => void
  onSave: () => void
}) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Underline, TextAlign.configure({ types: ["heading", "paragraph"] })],
    content: productData.description || "",
    onUpdate: ({ editor }) => {
      onFieldEdit("description", editor.getHTML())
    },
  })

  // Toolbar fixa para o tiptap
  function TiptapToolbar({ editor }: { editor: any }) {
    if (!editor) return null

    return (
      <div className="flex gap-2 bg-white border rounded shadow p-2 mb-2 sticky top-0 z-10">
        <button
          type="button"
          className={editor.isActive("bold") ? "font-bold text-[#f0739f]" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Negrito"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={editor.isActive("italic") ? "italic text-[#f0739f]" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Itálico"
        >
          <i>I</i>
        </button>
        <button
          type="button"
          className={editor.isActive("underline") ? "underline text-[#f0739f]" : ""}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Sublinhado"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className={editor.isActive("strike") ? "line-through text-[#f0739f]" : ""}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Tachado"
        >
          <s>S</s>
        </button>
        <button
          type="button"
          className={editor.isActive({ textAlign: "left" }) ? "text-[#f0739f]" : ""}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          aria-label="Alinhar à esquerda"
        >
          <span className="icon">⯇</span>
        </button>
        <button
          type="button"
          className={editor.isActive({ textAlign: "center" }) ? "text-[#f0739f]" : ""}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          aria-label="Centralizar"
        >
          <span className="icon">≡</span>
        </button>
        <button
          type="button"
          className={editor.isActive({ textAlign: "right" }) ? "text-[#f0739f]" : ""}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          aria-label="Alinhar à direita"
        >
          <span className="icon">⯈</span>
        </button>
        <button
          type="button"
          className={editor.isActive("bulletList") ? "text-[#f0739f]" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Lista"
        >
          •
        </button>
        <button
          type="button"
          className={editor.isActive("orderedList") ? "text-[#f0739f]" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Lista ordenada"
        >
          1.
        </button>
      </div>
    )
  }

  const formatPrice = (value: string) => {
    if (!value) return ""
    const numericValue = Number.parseFloat(value.replace(/[^\d.,]/g, "").replace(",", "."))
    if (isNaN(numericValue)) return ""
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    
      <div className="flex flex-col gap-4 mt-5">
        <div className="shadow-lg p-4 bg-white rounded-lg flex flex-col">
          <div className="flex flex-row justify-around sm:gap-0 sm:items-center sm:justify-between card-component">
            <a href="#" className="text-black flex items-center gap-3 mb-2 sm:mb-0">
              <ExternalLink className="w-5 h-5" />
              <h4 className="m-0 font-light">Voltar ao dashboard</h4>
            </a>
            <div className="flex items-center gap-3">
              Editar Produto
              <BookmarkPlus className="h-8 w-8 text-[#f0739f]" />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col xl:flex-row md:items-center md:gap-8 w-full">
              <h5 className="flex items-center w-full px-4 font-light text-[#051922] mb-2 md:mb-0">
                Categoria:
                <Select value={productData.category} onValueChange={(v) => onFieldEdit("category", v)}>
                  <SelectTrigger className="w-full ml-3 bg-transparent">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="decoracao-infantil">Decoração Infantil</SelectItem>
                    <SelectItem value="decoracao-casamento">Decoração Casamento</SelectItem>
                    <SelectItem value="buffet">Buffet</SelectItem>
                    <SelectItem value="moveis">Móveis</SelectItem>
                    <SelectItem value="iluminacao">Iluminação</SelectItem>
                    <SelectItem value="fotografia">Fotografia</SelectItem>
                    <SelectItem value="som">Som</SelectItem>
                  </SelectContent>
                </Select>
              </h5>

              <h5 className="flex items-center w-full px-4 font-light text-[#051922]">
                Tipo:
                <div className="ml-3 w-full">
                  <Select value={productData.type} onValueChange={(value) => onFieldEdit("type", value)}>
                    <SelectTrigger className="w-full m-1 bg-transparent">
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

            <div className="mb-1 px-4">
              <h5 className="w-full font-light text-[#051922]">Produto:</h5>
              <div className="break-words font-normal text-2xl">
                <Input
                  className="my-2 font-normal text-2xl"
                  value={productData.name}
                  onChange={(e) => onFieldEdit("name", e.target.value)}
                  placeholder="Nome do produto"
                />
              </div>
            </div>

            <div className="mb-1 px-4">
              {productData.type === "venda" && (
                <>
                  <h5 className="w-full font-light text-[#051922]">Quantidade:</h5>
                  <Input
                    className="mt-2 w-full"
                    type="number"
                    min={0}
                    value={productData.stock || ""}
                    onChange={(e) => onFieldEdit("stock", e.target.value)}
                    placeholder="Quantidade em estoque"
                  />
                </>
              )}
            </div>

            <div className="px-3 mb-1">
              <h5 className="w-full font-light text-[#051922]">Descrição:</h5>
              <div className="border rounded text-gray-600 bg-white min-h-[120px] p-2 focus-within:ring-2 focus-within:ring-[#051922]">
                <TiptapToolbar editor={editor} />
                <EditorContent
                  editor={editor}
                  className="outline-none focus:outline-none focus:ring-0 focus-visible:border-transparent tiptap"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 px-3">
            <div className="flex gap-4">
              <h3 className="font-light w-full md:w-1/2 mb-1">Preço</h3>
              <h3 className="font-light text-gray-500 line-through w-full md:w-1/2 mb-1">Preço Original</h3>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <Input
                  className="my-1 font-normal text-2xl"
                  value={formatPrice(productData.price)}
                  onChange={(e) => onFieldEdit("price", e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
              <div className="w-full md:w-1/2">
                <Input
                  className="my-1 text-2xl text-gray-500 font-light line-through"
                  value={formatPrice(productData.originalPrice)}
                  onChange={(e) => onFieldEdit("originalPrice", e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-start px-3 gap-4 flex-wrap">
            <div className="font-light flex items-end gap-2">
              <h4 className="m-0 font-light text-gray-500 text-base">Código do produto:</h4>
              <h4 className="font-bold mb-0">
                <input
                  className="bg-transparent outline-none px-1 text-gray-700 font-bold"
                  value={productData.id}
                  onChange={(e) => onFieldEdit("id", e.target.value)}
                  placeholder="Código"
                  disabled
                />
              </h4>
            </div>

            <div className="flex items-center gap-1 text-black">
              <CheckSquare className={`w-5 h-5 ${productData.availability ? "text-black" : "text-gray-400"}`} />
              <h6 className={`m-0 text-lg font-bold ${productData.availability ? "text-black" : "text-gray-400"}`}>
                <Select
                  value={productData.availability ? "1" : "0"}
                  onValueChange={(v) => onFieldEdit("availability", v === "1")}
                >
                  <SelectTrigger className="w-32 bg-transparent px-1">
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
          <div className="gap-4 px-3">
            <label className="block text-[#051922] font-semibold mb-1">Características</label>
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
                  className="bg-[#051922] text-[#f0739f] hover:text-[#051922] hover:bg-[#f0739f] transition-colors"
                  aria-label="Remover característica"
                >
                  <Close className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={onAddFeature} className="w-full mt-2 bg-transparent">
              Adicionar Característica
            </Button>

            {/* Checkbox de opções de entrega */}
            <div className="flex gap-6 mt-4">
              <div className="flex items-center space-x-2">
                <Input
                  id="delivery"
                  type="checkbox"
                  checked={productData.delivery}
                  onChange={(e) => onFieldEdit("delivery", e.target.checked)}
                  className="w-4"
                />
                <label htmlFor="delivery" className="text-sm text-[#051922] cursor-pointer">
                  Entrega disponível
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="pickup"
                  type="checkbox"
                  checked={productData.pickup}
                  onChange={(e) => onFieldEdit("pickup", e.target.checked)}
                  className="w-4"
                />
                <label htmlFor="pickup" className="text-sm text-[#051922] cursor-pointer">
                  Retirada no local
                </label>
              </div>
            </div>
          </div>

          <div className="gap-4 px-3 mt-6">
            <label className="block text-[#051922] font-semibold mb-1">Imagens do Produto</label>
            <div className="border-2 border-dashed border-[#f0739f] rounded-lg p-6 text-center hover:border-[#f0739f] transition-colors mb-10">
              <Upload className="w-8 h-8 text-[#f0739f] mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Arraste suas imagens aqui ou clique para selecionar</p>
              <p className="text-xs text-gray-500 mb-4">Máximo 4 imagens, até 5MB cada (JPG, PNG)</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files).slice(0, 4 - productData.images.length)
                    if (files.length > 0) {
                      const dt = new DataTransfer()
                      files.forEach((file) => dt.items.add(file))
                      onImageUpload(dt.files)
                    }
                  }
                }}
                className="hidden"
                id="image-upload-form"
              />
              <label
                htmlFor="image-upload-form"
                className="inline-block bg-[#051922] text-[#f0739f] px-4 py-2 rounded cursor-pointer hover:bg-[#f0739f] hover:text-[#051922] transition-colors"
              >
                Selecionar Imagens
              </label>
            </div>

            {productData.images.length > 0 && productData.images.length <= 3 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {productData.images.map((image: File, index: number) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square w-full h-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-full h-full transition duration-300 group-hover:brightness-50"
                        style={{ aspectRatio: "1 / 1" }}
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveImage(index)}
                        className="z-30 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        style={{ background: "rgba(0,0,0,0.0)" }}
                        aria-label="Remover imagem"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 text-white drop-shadow-lg trash-icon"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <g>
                            <rect
                              x="9"
                              y="3"
                              width="6"
                              height="2"
                              rx="1"
                              className="transition-all duration-300 origin-center trash-lid"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6m4-6v6" />
                            <rect x="1" y="7" width="22" height="1" />
                          </g>
                        </svg>
                      </button>
                    </div>
                    {index === 0 && (
                      <Badge className="absolute bottom-2 left-2 bg-[#f0739f] text-white text-xs">Principal</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}

            {productData.images.length > 3 && (
              <div className="w-full mt-4 overflow-x-auto">
                <div className="flex gap-4 min-w-[400px]">
                  {productData.images.slice(0, 4).map((image: File, index: number) => (
                    <div key={index} className="relative group min-w-[140px] max-w-[180px]">
                      <div className="aspect-square w-full h-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="object-cover w-full h-full transition duration-300 group-hover:brightness-50"
                          style={{ aspectRatio: "1 / 1" }}
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveImage(index)}
                          className="z-30 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                          style={{ background: "rgba(0,0,0,0.0)" }}
                          aria-label="Remover imagem"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-white drop-shadow-lg trash-icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <g>
                              <rect
                                x="9"
                                y="3"
                                width="6"
                                height="2"
                                rx="1"
                                className="transition-all duration-300 origin-center trash-lid"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7"
                              />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6m4-6v6" />
                              <rect x="1" y="7" width="22" height="1" />
                            </g>
                          </svg>
                        </button>
                      </div>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-[#f0739f] text-[#051922] text-xs">
                          Principal
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center w-full gap-3">
            <Button
              variant="default"
              type="button"
              onClick={onSave}
              className="px-4 py-1 w-full rounded border border-[#051922] text-[#f0739f] bg-[#051922] hover:text-[#051922] hover:border-[#f0739f] transition-colors font-semibold text-sm flex items-center gap-2"
              aria-label="Salvar"
            >
              <Save className="w-4 h-4" />
              Salvar
            </Button>
          </div>
        </div>
      </div>
  )
}
