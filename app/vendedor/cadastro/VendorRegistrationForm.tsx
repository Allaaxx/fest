"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MaskedInput } from "@/components/ui/masked-input";
import {
  Store,
  Upload,
  FileText,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  User,
  MapPin,
  Building,
} from "lucide-react";
import { useStore } from "@/lib/store";
import {
  phoneMask,
  cpfMask,
  cnpjMask,
  cepMask,
  isValidCPF,
  isValidPhone,
  isValidCEP,
} from "@/lib/masks";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function VendorRegistrationPage() {
  const router = useRouter();
  const { user, updateUserType } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados pessoais
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    cpf: "",

    // Dados da empresa
    companyName: "",
    cnpj: "",
    companyType: "",
    description: "",

    // Endereço
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",

    // Dados bancários
    bankName: "",
    accountType: "",
    agency: "",
    account: "",

    // Documentos
    documents: {
      rg: null as File | null,
      cpfDoc: null as File | null,
      comprovante: null as File | null,
      contrato: null as File | null,
    },

    // Termos
    acceptTerms: false,
    acceptCommission: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: "Dados Pessoais", icon: User },
    { id: 2, title: "Dados da Empresa", icon: Building },
    { id: 3, title: "Endereço", icon: MapPin },
    { id: 4, title: "Dados Bancários", icon: CreditCard },
    { id: 5, title: "Documentos", icon: FileText },
    { id: 6, title: "Revisão", icon: CheckCircle },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleMaskedInputChange =
    (field: string) => (rawValue: string, maskedValue: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: maskedValue,
      }));

      // Remove error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim())
          newErrors.fullName = "Nome completo é obrigatório";
        if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
        if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
        else if (!isValidPhone(formData.phone))
          newErrors.phone = "Telefone inválido";
        if (!formData.cpf.trim()) newErrors.cpf = "CPF é obrigatório";
        else if (!isValidCPF(formData.cpf)) newErrors.cpf = "CPF inválido";
        break;
      case 2:
        if (!formData.companyName.trim())
          newErrors.companyName = "Nome da empresa é obrigatório";
        if (!formData.companyType)
          newErrors.companyType = "Tipo de negócio é obrigatório";
        if (!formData.description.trim())
          newErrors.description = "Descrição é obrigatória";
        break;
      case 3:
        if (!formData.cep.trim()) newErrors.cep = "CEP é obrigatório";
        else if (!isValidCEP(formData.cep)) newErrors.cep = "CEP inválido";
        if (!formData.address.trim())
          newErrors.address = "Endereço é obrigatório";
        if (!formData.number.trim()) newErrors.number = "Número é obrigatório";
        if (!formData.neighborhood.trim())
          newErrors.neighborhood = "Bairro é obrigatório";
        if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória";
        if (!formData.state) newErrors.state = "Estado é obrigatório";
        break;
      case 4:
        if (!formData.bankName) newErrors.bankName = "Banco é obrigatório";
        if (!formData.accountType)
          newErrors.accountType = "Tipo de conta é obrigatório";
        if (!formData.agency.trim()) newErrors.agency = "Agência é obrigatória";
        if (!formData.account.trim()) newErrors.account = "Conta é obrigatória";
        break;
      case 5:
        if (!formData.documents.rg) newErrors.rg = "RG ou CNH é obrigatório";
        if (!formData.documents.cpfDoc) newErrors.cpfDoc = "CPF é obrigatório";
        if (!formData.documents.comprovante)
          newErrors.comprovante = "Comprovante de residência é obrigatório";
        break;
      case 6:
        if (!formData.acceptTerms)
          newErrors.acceptTerms = "Você deve aceitar os termos de uso";
        if (!formData.acceptCommission)
          newErrors.acceptCommission = "Você deve aceitar a taxa de comissão";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDocumentUpload = (docType: string, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file,
      },
    }));

    // Remove error when file is uploaded
    if (errors[docType]) {
      setErrors((prev) => ({
        ...prev,
        [docType]: "",
      }));
    }
  };

  const handleSubmit = () => {
    if (validateStep(6)) {
      // Simulate registration process
      if (user) {
        updateUserType("vendedor");
        router.push("/vendedor/dashboard");
      } else {
        // If no user, create one and set as vendor
        // This would normally be handled by your auth system
        router.push("/vendedor/dashboard");
      }
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Busca endereço pelo CEP
  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro || prev.address,
            neighborhood: data.bairro || prev.neighborhood,
            city: data.localidade || prev.city,
            state: data.uf || prev.state,
          }));
        }
      } catch {}
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#051922] mb-4">
              Cadastre-se como Vendedor
            </h1>
            <p className="text-[#394d58] max-w-2xl mx-auto">
              Junte-se à nossa plataforma e comece a vender seus produtos e
              serviços para milhares de clientes
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                            ? "bg-[#f0739f] text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-xs text-center ${isActive ? "text-[#f0739f] font-medium" : "text-[#394d58]"}`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className={`hidden md:block w-16 h-0.5 mt-6 ${isCompleted ? "bg-green-500" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: "w-5 h-5 mr-2 text-[#f0739f]",
                })}
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <Label htmlFor="fullName">Nome Completo *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="Seu nome completo"
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="seu@email.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <MaskedInput
                        id="phone"
                        mask={phoneMask}
                        value={formData.phone}
                        onChange={handleMaskedInputChange("phone")}
                        placeholder="(11) 99999-9999"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <MaskedInput
                        id="cpf"
                        mask={cpfMask}
                        value={formData.cpf}
                        onChange={handleMaskedInputChange("cpf")}
                        placeholder="000.000.000-00"
                        className={errors.cpf ? "border-red-500" : ""}
                      />
                      {errors.cpf && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cpf}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="companyName">Nome da Empresa *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          placeholder="Nome da sua empresa"
                          className={errors.companyName ? "border-red-500" : ""}
                        />
                        {errors.companyName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.companyName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <MaskedInput
                          id="cnpj"
                          mask={cnpjMask}
                          value={formData.cnpj}
                          onChange={handleMaskedInputChange("cnpj")}
                          placeholder="00.000.000/0001-00"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="companyType">Tipo de Negócio *</Label>
                      <Select
                        value={formData.companyType}
                        onValueChange={(value) =>
                          handleInputChange("companyType", value)
                        }
                      >
                        <SelectTrigger
                          className={errors.companyType ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Selecione o tipo de negócio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="decoracao">
                            Decoração de Eventos
                          </SelectItem>
                          <SelectItem value="buffet">
                            Buffet e Catering
                          </SelectItem>
                          <SelectItem value="fotografia">Fotografia</SelectItem>
                          <SelectItem value="musica">Música e Som</SelectItem>
                          <SelectItem value="locacao">
                            Locação de Equipamentos
                          </SelectItem>
                          <SelectItem value="flores">
                            Flores e Arranjos
                          </SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.companyType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyType}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="description">
                        Descrição do Negócio *
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Descreva seus produtos e serviços..."
                        rows={4}
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <MaskedInput
                        id="cep"
                        mask={cepMask}
                        value={formData.cep}
                        onChange={handleMaskedInputChange("cep")}
                        onBlur={handleCepBlur}
                        placeholder="00000-000"
                        className={errors.cep ? "border-red-500" : ""}
                      />
                      {errors.cep && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cep}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Rua, Avenida..."
                        className={errors.address ? "border-red-500" : ""}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={formData.number}
                        onChange={(e) =>
                          handleInputChange("number", e.target.value)
                        }
                        placeholder="123"
                        className={errors.number ? "border-red-500" : ""}
                      />
                      {errors.number && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.number}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={formData.complement}
                        onChange={(e) =>
                          handleInputChange("complement", e.target.value)
                        }
                        placeholder="Apto, Sala..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={formData.neighborhood}
                        onChange={(e) =>
                          handleInputChange("neighborhood", e.target.value)
                        }
                        placeholder="Nome do bairro"
                        className={errors.neighborhood ? "border-red-500" : ""}
                      />
                      {errors.neighborhood && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.neighborhood}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="Nome da cidade"
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) =>
                          handleInputChange("state", value)
                        }
                      >
                        <SelectTrigger
                          className={errors.state ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="BA">Bahia</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="PE">Pernambuco</SelectItem>
                          <SelectItem value="CE">Ceará</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="text-sm text-blue-800">
                          Seus dados bancários são criptografados e seguros.
                          Usamos apenas para pagamentos.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="bankName">Banco *</Label>
                        <Select
                          value={formData.bankName}
                          onValueChange={(value) =>
                            handleInputChange("bankName", value)
                          }
                        >
                          <SelectTrigger
                            className={errors.bankName ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Selecione o banco" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="001">Banco do Brasil</SelectItem>
                            <SelectItem value="104">
                              Caixa Econômica Federal
                            </SelectItem>
                            <SelectItem value="237">Bradesco</SelectItem>
                            <SelectItem value="341">Itaú</SelectItem>
                            <SelectItem value="033">Santander</SelectItem>
                            <SelectItem value="260">Nu Pagamentos</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.bankName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.bankName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="accountType">Tipo de Conta *</Label>
                        <Select
                          value={formData.accountType}
                          onValueChange={(value) =>
                            handleInputChange("accountType", value)
                          }
                        >
                          <SelectTrigger
                            className={
                              errors.accountType ? "border-red-500" : ""
                            }
                          >
                            <SelectValue placeholder="Tipo de conta" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corrente">
                              Conta Corrente
                            </SelectItem>
                            <SelectItem value="poupanca">
                              Conta Poupança
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.accountType && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.accountType}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="agency">Agência *</Label>
                        <Input
                          id="agency"
                          value={formData.agency}
                          onChange={(e) =>
                            handleInputChange("agency", e.target.value)
                          }
                          placeholder="0000"
                          className={errors.agency ? "border-red-500" : ""}
                        />
                        {errors.agency && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.agency}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="account">Conta *</Label>
                        <Input
                          id="account"
                          value={formData.account}
                          onChange={(e) =>
                            handleInputChange("account", e.target.value)
                          }
                          placeholder="00000-0"
                          className={errors.account ? "border-red-500" : ""}
                        />
                        {errors.account && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.account}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                        <p className="text-sm text-yellow-800">
                          Envie documentos claros e legíveis. Formatos aceitos:
                          JPG, PNG, PDF (máx. 5MB cada)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { key: "rg", label: "RG ou CNH", required: true },
                        { key: "cpfDoc", label: "CPF", required: true },
                        {
                          key: "comprovante",
                          label: "Comprovante de Residência",
                          required: true,
                        },
                        {
                          key: "contrato",
                          label: "Contrato Social (se CNPJ)",
                          required: false,
                        },
                      ].map((doc) => (
                        <div key={doc.key} className="space-y-2">
                          <Label>
                            {doc.label} {doc.required && "*"}
                          </Label>
                          <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-[#f0739f] transition-colors ${
                              errors[doc.key]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">
                              {formData.documents[
                                doc.key as keyof typeof formData.documents
                              ]?.name || "Clique para enviar ou arraste aqui"}
                            </p>
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleDocumentUpload(doc.key, file);
                              }}
                              className="hidden"
                              id={`upload-${doc.key}`}
                            />
                            <label
                              htmlFor={`upload-${doc.key}`}
                              className="inline-block bg-[#f0739f] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#f53377] transition-colors"
                            >
                              Selecionar Arquivo
                            </label>
                          </div>
                          {errors[doc.key] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[doc.key]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {currentStep === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">
                        Revisão dos Dados
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-green-700">
                            Dados Pessoais:
                          </p>
                          <p>{formData.fullName}</p>
                          <p>{formData.email}</p>
                          <p>{formData.phone}</p>
                          <p>{formData.cpf}</p>
                        </div>
                        <div>
                          <p className="font-medium text-green-700">Empresa:</p>
                          <p>{formData.companyName}</p>
                          <p>{formData.companyType}</p>
                          {formData.cnpj && <p>{formData.cnpj}</p>}
                        </div>
                        <div>
                          <p className="font-medium text-green-700">
                            Endereço:
                          </p>
                          <p>
                            {formData.address}, {formData.number}
                          </p>
                          <p>
                            {formData.neighborhood} - {formData.city}/
                            {formData.state}
                          </p>
                          <p>{formData.cep}</p>
                        </div>
                        <div>
                          <p className="font-medium text-green-700">
                            Documentos:
                          </p>
                          <p>✓ {formData.documents.rg?.name}</p>
                          <p>✓ {formData.documents.cpfDoc?.name}</p>
                          <p>✓ {formData.documents.comprovante?.name}</p>
                          {formData.documents.contrato && (
                            <p>✓ {formData.documents.contrato.name}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) =>
                            handleInputChange("acceptTerms", checked)
                          }
                        />
                        <Label htmlFor="acceptTerms" className="text-sm">
                          Aceito os{" "}
                          <a
                            href="#"
                            className="text-[#f0739f] hover:underline"
                          >
                            Termos de Uso
                          </a>{" "}
                          e
                          <a
                            href="#"
                            className="text-[#f0739f] hover:underline ml-1"
                          >
                            Política de Privacidade
                          </a>
                        </Label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-red-500 text-sm">
                          {errors.acceptTerms}
                        </p>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="acceptCommission"
                          checked={formData.acceptCommission}
                          onCheckedChange={(checked) =>
                            handleInputChange("acceptCommission", checked)
                          }
                        />
                        <Label htmlFor="acceptCommission" className="text-sm">
                          Aceito a taxa de comissão de 5% sobre vendas e 3%
                          sobre locações
                        </Label>
                      </div>
                      {errors.acceptCommission && (
                        <p className="text-red-500 text-sm">
                          {errors.acceptCommission}
                        </p>
                      )}
                    </div>

                    <div className="bg-[#f0739f]/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#051922] mb-2">
                        Próximos Passos:
                      </h4>
                      <ul className="text-sm text-[#394d58] space-y-1">
                        <li>• Análise dos documentos (até 2 dias úteis)</li>
                        <li>• Aprovação da conta vendedor</li>
                        <li>• Acesso ao painel de vendedor</li>
                        <li>• Cadastro dos primeiros produtos</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Voltar
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    onClick={nextStep}
                    className="bg-[#f0739f] hover:bg-[#f53377] text-white"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-[#f0739f] hover:bg-[#f53377] text-white"
                  >
                    Finalizar Cadastro
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Store className="w-12 h-12 text-[#f0739f] mx-auto mb-4" />
              <h3 className="font-semibold text-[#051922] mb-2">
                Sua Loja Online
              </h3>
              <p className="text-sm text-[#394d58]">
                Tenha sua própria vitrine digital com ferramentas profissionais
              </p>
            </Card>
            <Card className="text-center p-6">
              <CreditCard className="w-12 h-12 text-[#f0739f] mx-auto mb-4" />
              <h3 className="font-semibold text-[#051922] mb-2">
                Pagamentos Seguros
              </h3>
              <p className="text-sm text-[#394d58]">
                Receba seus pagamentos de forma segura e automática
              </p>
            </Card>
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-[#f0739f] mx-auto mb-4" />
              <h3 className="font-semibold text-[#051922] mb-2">
                Suporte Completo
              </h3>
              <p className="text-sm text-[#394d58]">
                Equipe dedicada para ajudar no seu crescimento
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
