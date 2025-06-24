import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Trash2, ImageDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import "./profile-phoneinput.css";
import { useSession } from "next-auth/react";

// Funções utilitárias para máscara
function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function maskCEP(value: string) {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
}

function validateCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
  let sum = 0,
    rest;
  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function validateEmail(email: string) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function validatePhone(phone: string) {
  return /^\+?\d{10,15}$/.test(phone.replace(/\D/g, ""));
}

function validateCEP(cep: string) {
  return /^\d{5}-?\d{3}$/.test(cep);
}

type ProfileForm = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  cep: string;
  cpf: string;
  profileImage?: string;
  profileImagePublicId?: string; // novo campo
};

function validateProfile(form: ProfileForm) {
  if (!form.name.trim()) return "Nome obrigatório";
  if (!form.surname.trim()) return "Sobrenome obrigatório";
  if (!validateEmail(form.email)) return "E-mail inválido";
  if (!validatePhone(form.phone)) return "Telefone inválido";
  if (!validateCPF(form.cpf)) return "CPF inválido";
  if (!validateCEP(form.cep)) return "CEP inválido";
  if (!form.address.trim()) return "Endereço obrigatório";
  return null;
}

export default function Profile() {
  const { data: session, update } = useSession();
  const userId = (session?.user as any)?.id || session?.user?.email;
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    cep: "",
    cpf: "",
    profileImage: "",
    profileImagePublicId: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false); // novo estado
  const [imageHover, setImageHover] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // novo estado

  useEffect(() => {
    setLoading(true);
    fetch("/api/cliente/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error)
          setForm({
            name: data.name || "",
            surname: data.surname || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            cep: data.cep || "",
            cpf: data.cpf || "",
            profileImage: data.profileImage || "",
            profileImagePublicId: data.profileImagePublicId || "",
          });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Busca endereço pelo CEP
  const handleCepBlur = async () => {
    if (form.cep.replace(/\D/g, "").length === 8) {
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${form.cep.replace(/\D/g, "")}/json/`
        );
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            address:
              `${data.logradouro || ""} ${data.bairro || ""} ${data.localidade || ""} - ${data.uf || ""}`.trim(),
          }));
        }
      } catch {}
    }
  };

  // Novo: armazena o arquivo selecionado, não faz upload imediato
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!session) {
      toast.error("Você precisa estar autenticado para trocar a imagem.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem válido.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("A imagem deve ter até 2MB.");
      return;
    }
    setSelectedFile(file);
    // Mostra preview local
    setForm((prev) => ({ ...prev, profileImage: URL.createObjectURL(file) }));
  };

  // Novo: upload só ao salvar alterações
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateProfile(form);
    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);
    let imageUrl = form.profileImage;
    let imagePublicId = form.profileImagePublicId;
    if (selectedFile) {
      setImageLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (form.profileImagePublicId) {
        formData.append("oldPublicId", form.profileImagePublicId);
      }
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.url) {
          imageUrl = data.url;
          imagePublicId = data.public_id;
        } else {
          toast.error(data.error || "Erro ao enviar imagem");
        }
      } catch (err) {
        toast.error("Erro ao enviar imagem");
      }
      setImageLoading(false);
    }
    // Salva perfil com a nova imagem (ou a antiga)
    const res = await fetch("/api/cliente/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        profileImage: imageUrl,
        profileImagePublicId: imagePublicId,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Perfil atualizado com sucesso!");
      setSelectedFile(null); // limpa seleção
      if (typeof update === "function") {
        await update(); // Atualiza sessão para refletir nova imagem
      }
    } else {
      toast.error(data.error || "Erro ao atualizar perfil");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Meu Perfil</h2>
        <p className="text-sm text-gray-500">
          Gerencie suas informações pessoais
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sobrenome
                  </label>
                  <Input
                    name="surname"
                    value={form.surname}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <PhoneInput
                    country={"br"}
                    value={form.phone}
                    onChange={(phone) =>
                      setForm((prev) => ({ ...prev, phone: phone || "" }))
                    }
                    disabled={loading}
                    inputClass="shadcn-input w-full !h-9 !text-base !rounded-md !border !border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    buttonClass="!border-none !bg-transparent"
                    containerClass="w-full"
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: false,
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF
                  </label>
                  <Input
                    name="cpf"
                    value={maskCPF(form.cpf)}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, cpf: e.target.value }))
                    }
                    disabled={loading}
                    maxLength={14}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CEP
                </label>
                <Input
                  name="cep"
                  value={maskCEP(form.cep)}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cep: e.target.value }))
                  }
                  onBlur={handleCepBlur}
                  disabled={loading}
                  maxLength={9}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <Button
                className="bg-fest-black2 text-fest-primary hover:bg-fest-primary hover:text-fest-black2 lg: flex items-center justify-center h-12 min-w-[110px]"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center w-full">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                  "Salvar Alterações"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="flex flex-col max-h-[420px] h-auto lg:h-full">
          <CardHeader>
            <CardTitle>Foto do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-4 flex-1">
            <div className="w-full flex flex-col items-center h-full gap-3">
              <div
                className="w-full max-h-[320px] h-[220px] lg:h-full"
                style={{ height: undefined }}
              >
                <div
                  className="relative w-full h-full"
                  style={{ borderRadius: "20px", height: "100%" }}
                  onMouseEnter={() => setImageHover(true)}
                  onMouseLeave={() => setImageHover(false)}
                >
                  {form.profileImage ? (
                    <>
                      <img
                        src={form.profileImage}
                        alt="Foto do perfil"
                        className="w-full h-full object-cover"
                        style={{ borderRadius: "20px", height: "100%" }}
                      />
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[20px] z-10">
                          <span className="flex items-center justify-center w-full">
                            <svg
                              className="animate-spin h-4 w-4 text-white"
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
                        </div>
                      )}
                      {imageHover && !imageLoading && (
                        <button
                          type="button"
                          className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition rounded-[20px]"
                          style={{ borderRadius: "20px" }}
                          onClick={() => {
                            setForm((prev) => ({ ...prev, profileImage: "" }));
                            setSelectedFile(null);
                          }}
                          tabIndex={-1}
                        >
                          <Trash2 className="h-7 w-7 text-white" />
                          <span className="ml-2 text-white font-semibold">
                            Remover
                          </span>
                        </button>
                      )}
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center bg-pink-50 border-2 border-dashed border-pink-300 cursor-pointer transition hover:bg-pink-100"
                      style={{ borderRadius: "20px", height: "100%" }}
                      onClick={() =>
                        document.getElementById("profileImage")?.click()
                      }
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          const input = document.getElementById(
                            "profileImage"
                          ) as HTMLInputElement;
                          const dt = new DataTransfer();
                          dt.items.add(file);
                          input.files = dt.files;
                          input.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }
                      }}
                    >
                      <ImageDown className="h-12 w-12 text-pink-600 mb-2" />
                      <span className="text-pink-600 font-medium text-sm">
                        Arraste uma imagem ou clique para enviar
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <label
                htmlFor="profileImage"
                className="block w-full"
                style={{ height: "5%" }}
              >
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={loading || imageLoading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG até 2MB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
