"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Upload, Globe, Shield, CreditCard, Bell, Palette, Settings, Users, FileText } from "lucide-react"

interface SiteSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    adminEmail: string
    supportEmail: string
    phone: string
    address: string
    logo: string
    favicon: string
  }
  appearance: {
    primaryColor: string
    secondaryColor: string
    theme: "light" | "dark" | "auto"
    customCSS: string
  }
  features: {
    userRegistration: boolean
    vendorRegistration: boolean
    productReviews: boolean
    wishlist: boolean
    newsletter: boolean
    chat: boolean
    multiLanguage: boolean
  }
  payments: {
    currency: string
    taxRate: number
    shippingEnabled: boolean
    freeShippingThreshold: number
    paymentMethods: {
      pix: boolean
      creditCard: boolean
      bankTransfer: boolean
      paypal: boolean
    }
  }
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    orderUpdates: boolean
    promotionalEmails: boolean
  }
  security: {
    twoFactorAuth: boolean
    passwordMinLength: number
    sessionTimeout: number
    maxLoginAttempts: number
    requireEmailVerification: boolean
  }
  seo: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    googleAnalytics: string
    facebookPixel: string
    googleTagManager: string
  }
  social: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
    whatsapp: string
  }
}

export function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    general: {
      siteName: "FestMarket",
      siteDescription: "Marketplace para produtos e serviços de festa",
      siteUrl: "https://festmarket.com.br",
      adminEmail: "admin@festmarket.com.br",
      supportEmail: "suporte@festmarket.com.br",
      phone: "(11) 99999-9999",
      address: "São Paulo, SP - Brasil",
      logo: "",
      favicon: "",
    },
    appearance: {
      primaryColor: "#FF6B35",
      secondaryColor: "#2D3748",
      theme: "light",
      customCSS: "",
    },
    features: {
      userRegistration: true,
      vendorRegistration: true,
      productReviews: true,
      wishlist: true,
      newsletter: true,
      chat: false,
      multiLanguage: false,
    },
    payments: {
      currency: "BRL",
      taxRate: 0,
      shippingEnabled: true,
      freeShippingThreshold: 200,
      paymentMethods: {
        pix: true,
        creditCard: true,
        bankTransfer: false,
        paypal: false,
      },
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      orderUpdates: true,
      promotionalEmails: false,
    },
    security: {
      twoFactorAuth: false,
      passwordMinLength: 8,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      requireEmailVerification: true,
    },
    seo: {
      metaTitle: "FestMarket - Marketplace de Festas",
      metaDescription: "Encontre tudo para sua festa em um só lugar",
      metaKeywords: "festa, decoração, buffet, som, iluminação",
      googleAnalytics: "",
      facebookPixel: "",
      googleTagManager: "",
    },
    social: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      whatsapp: "",
    },
  })

  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Configurações salvas:", settings)
    setIsSaving(false)
  }

  const updateSettings = (section: keyof SiteSettings, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateNestedSettings = (section: keyof SiteSettings, subsection: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value,
        },
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Configurações do Site</h2>
          <p className="text-gray-600">Gerencie as configurações gerais da plataforma</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-fest-primary hover:bg-fest-primary/90 text-fest-black2"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Recursos</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Pagamentos</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Social</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Informações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => updateSettings("general", "siteName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl">URL do Site</Label>
                  <Input
                    id="siteUrl"
                    value={settings.general.siteUrl}
                    onChange={(e) => updateSettings("general", "siteUrl", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) => updateSettings("general", "siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adminEmail">Email do Administrador</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => updateSettings("general", "adminEmail", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="supportEmail">Email de Suporte</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => updateSettings("general", "supportEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={settings.general.phone}
                    onChange={(e) => updateSettings("general", "phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={settings.general.address}
                    onChange={(e) => updateSettings("general", "address", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo">Logo do Site</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="logo"
                      value={settings.general.logo}
                      onChange={(e) => updateSettings("general", "logo", e.target.value)}
                      placeholder="URL da logo"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="favicon">Favicon</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="favicon"
                      value={settings.general.favicon}
                      onChange={(e) => updateSettings("general", "favicon", e.target.value)}
                      placeholder="URL do favicon"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência e Tema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => updateSettings("appearance", "primaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.appearance.primaryColor}
                      onChange={(e) => updateSettings("appearance", "primaryColor", e.target.value)}
                      placeholder="#FF6B35"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Cor Secundária</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) => updateSettings("appearance", "secondaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.appearance.secondaryColor}
                      onChange={(e) => updateSettings("appearance", "secondaryColor", e.target.value)}
                      placeholder="#2D3748"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="theme">Tema</Label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(value: any) => updateSettings("appearance", "theme", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="auto">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="customCSS">CSS Personalizado</Label>
                <Textarea
                  id="customCSS"
                  value={settings.appearance.customCSS}
                  onChange={(e) => updateSettings("appearance", "customCSS", e.target.value)}
                  rows={6}
                  placeholder="/* Adicione seu CSS personalizado aqui */"
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Recursos da Plataforma
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Registro de Usuários</Label>
                    <p className="text-sm text-gray-500">Permitir que novos usuários se cadastrem</p>
                  </div>
                  <Switch
                    checked={settings.features.userRegistration}
                    onCheckedChange={(checked) => updateSettings("features", "userRegistration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Registro de Vendedores</Label>
                    <p className="text-sm text-gray-500">Permitir cadastro de novos vendedores</p>
                  </div>
                  <Switch
                    checked={settings.features.vendorRegistration}
                    onCheckedChange={(checked) => updateSettings("features", "vendorRegistration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Avaliações de Produtos</Label>
                    <p className="text-sm text-gray-500">Permitir avaliações e comentários</p>
                  </div>
                  <Switch
                    checked={settings.features.productReviews}
                    onCheckedChange={(checked) => updateSettings("features", "productReviews", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lista de Desejos</Label>
                    <p className="text-sm text-gray-500">Permitir salvar produtos favoritos</p>
                  </div>
                  <Switch
                    checked={settings.features.wishlist}
                    onCheckedChange={(checked) => updateSettings("features", "wishlist", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Newsletter</Label>
                    <p className="text-sm text-gray-500">Sistema de newsletter por email</p>
                  </div>
                  <Switch
                    checked={settings.features.newsletter}
                    onCheckedChange={(checked) => updateSettings("features", "newsletter", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chat ao Vivo</Label>
                    <p className="text-sm text-gray-500">Chat entre usuários e vendedores</p>
                  </div>
                  <Switch
                    checked={settings.features.chat}
                    onCheckedChange={(checked) => updateSettings("features", "chat", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Multi-idioma</Label>
                    <p className="text-sm text-gray-500">Suporte a múltiplos idiomas</p>
                  </div>
                  <Switch
                    checked={settings.features.multiLanguage}
                    onCheckedChange={(checked) => updateSettings("features", "multiLanguage", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Configurações de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currency">Moeda</Label>
                  <Select
                    value={settings.payments.currency}
                    onValueChange={(value) => updateSettings("payments", "currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real (BRL)</SelectItem>
                      <SelectItem value="USD">Dólar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="taxRate">Taxa de Imposto (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={settings.payments.taxRate}
                    onChange={(e) => updateSettings("payments", "taxRate", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="freeShippingThreshold">Frete Grátis a partir de (R$)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    min="0"
                    value={settings.payments.freeShippingThreshold}
                    onChange={(e) =>
                      updateSettings("payments", "freeShippingThreshold", Number.parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Frete Habilitado</Label>
                  <p className="text-sm text-gray-500">Permitir cobrança de frete</p>
                </div>
                <Switch
                  checked={settings.payments.shippingEnabled}
                  onCheckedChange={(checked) => updateSettings("payments", "shippingEnabled", checked)}
                />
              </div>

              <div>
                <Label className="text-base font-medium">Métodos de Pagamento</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>PIX</Label>
                      <p className="text-sm text-gray-500">Pagamento instantâneo</p>
                    </div>
                    <Switch
                      checked={settings.payments.paymentMethods.pix}
                      onCheckedChange={(checked) => updateNestedSettings("payments", "paymentMethods", "pix", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cartão de Crédito</Label>
                      <p className="text-sm text-gray-500">Visa, Mastercard, etc.</p>
                    </div>
                    <Switch
                      checked={settings.payments.paymentMethods.creditCard}
                      onCheckedChange={(checked) =>
                        updateNestedSettings("payments", "paymentMethods", "creditCard", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Transferência Bancária</Label>
                      <p className="text-sm text-gray-500">TED/DOC</p>
                    </div>
                    <Switch
                      checked={settings.payments.paymentMethods.bankTransfer}
                      onCheckedChange={(checked) =>
                        updateNestedSettings("payments", "paymentMethods", "bankTransfer", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>PayPal</Label>
                      <p className="text-sm text-gray-500">Pagamento internacional</p>
                    </div>
                    <Switch
                      checked={settings.payments.paymentMethods.paypal}
                      onCheckedChange={(checked) =>
                        updateNestedSettings("payments", "paymentMethods", "paypal", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-gray-500">Enviar notificações por email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateSettings("notifications", "emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações por SMS</Label>
                    <p className="text-sm text-gray-500">Enviar notificações por SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) => updateSettings("notifications", "smsNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Notificações no navegador</p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateSettings("notifications", "pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Atualizações de Pedidos</Label>
                    <p className="text-sm text-gray-500">Notificar sobre status dos pedidos</p>
                  </div>
                  <Switch
                    checked={settings.notifications.orderUpdates}
                    onCheckedChange={(checked) => updateSettings("notifications", "orderUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Emails Promocionais</Label>
                    <p className="text-sm text-gray-500">Enviar ofertas e promoções</p>
                  </div>
                  <Switch
                    checked={settings.notifications.promotionalEmails}
                    onCheckedChange={(checked) => updateSettings("notifications", "promotionalEmails", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passwordMinLength">Tamanho Mínimo da Senha</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    min="6"
                    max="20"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => updateSettings("security", "passwordMinLength", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="1440"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSettings("security", "sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="maxLoginAttempts">Máximo de Tentativas de Login</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  min="3"
                  max="10"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => updateSettings("security", "maxLoginAttempts", Number.parseInt(e.target.value))}
                  className="max-w-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-gray-500">Exigir 2FA para administradores</p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => updateSettings("security", "twoFactorAuth", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Verificação de Email</Label>
                    <p className="text-sm text-gray-500">Exigir verificação de email no cadastro</p>
                  </div>
                  <Switch
                    checked={settings.security.requireEmailVerification}
                    onCheckedChange={(checked) => updateSettings("security", "requireEmailVerification", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                SEO e Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Título</Label>
                <Input
                  id="metaTitle"
                  value={settings.seo.metaTitle}
                  onChange={(e) => updateSettings("seo", "metaTitle", e.target.value)}
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">{settings.seo.metaTitle.length}/60 caracteres</p>
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Descrição</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.seo.metaDescription}
                  onChange={(e) => updateSettings("seo", "metaDescription", e.target.value)}
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">{settings.seo.metaDescription.length}/160 caracteres</p>
              </div>

              <div>
                <Label htmlFor="metaKeywords">Palavras-chave</Label>
                <Input
                  id="metaKeywords"
                  value={settings.seo.metaKeywords}
                  onChange={(e) => updateSettings("seo", "metaKeywords", e.target.value)}
                  placeholder="festa, decoração, buffet, som"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                  <Input
                    id="googleAnalytics"
                    value={settings.seo.googleAnalytics}
                    onChange={(e) => updateSettings("seo", "googleAnalytics", e.target.value)}
                    placeholder="GA-XXXXXXXXX-X"
                  />
                </div>
                <div>
                  <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                  <Input
                    id="facebookPixel"
                    value={settings.seo.facebookPixel}
                    onChange={(e) => updateSettings("seo", "facebookPixel", e.target.value)}
                    placeholder="123456789012345"
                  />
                </div>
                <div>
                  <Label htmlFor="googleTagManager">Google Tag Manager ID</Label>
                  <Input
                    id="googleTagManager"
                    value={settings.seo.googleTagManager}
                    onChange={(e) => updateSettings("seo", "googleTagManager", e.target.value)}
                    placeholder="GTM-XXXXXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Redes Sociais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={settings.social.facebook}
                    onChange={(e) => updateSettings("social", "facebook", e.target.value)}
                    placeholder="https://facebook.com/festmarket"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={settings.social.instagram}
                    onChange={(e) => updateSettings("social", "instagram", e.target.value)}
                    placeholder="https://instagram.com/festmarket"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={settings.social.twitter}
                    onChange={(e) => updateSettings("social", "twitter", e.target.value)}
                    placeholder="https://twitter.com/festmarket"
                  />
                </div>
                <div>
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    value={settings.social.youtube}
                    onChange={(e) => updateSettings("social", "youtube", e.target.value)}
                    placeholder="https://youtube.com/festmarket"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={settings.social.whatsapp}
                    onChange={(e) => updateSettings("social", "whatsapp", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
