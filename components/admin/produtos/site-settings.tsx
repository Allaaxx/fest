"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Palette,
  Globe,
  CreditCard,
  Bell,
  Shield,
  Search,
  Share2,
  Save,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react"

export function SiteSettings() {
  const [settings, setSettings] = useState({
    // Configurações Gerais
    siteName: "Fest & Cia",
    siteDescription: "Marketplace de festas e eventos",
    siteUrl: "https://festecia.com.br",
    adminEmail: "admin@festecia.com.br",
    supportEmail: "suporte@festecia.com.br",
    phone: "(11) 99999-9999",
    address: "São Paulo, SP",

    // Aparência
    primaryColor: "#f0739f",
    secondaryColor: "#051922",
    accentColor: "#394d58",
    logoUrl: "/images/fest-logo.png",
    faviconUrl: "/favicon.ico",
    customCSS: "",
    darkMode: false,

    // Recursos
    enableRegistration: true,
    enableVendorRegistration: true,
    enableReviews: true,
    enableWishlist: true,
    enableChat: true,
    enableNotifications: true,
    enableGeolocation: true,
    enableMultiLanguage: false,

    // Pagamentos
    enablePix: true,
    enableCreditCard: true,
    enableBankTransfer: true,
    enablePayPal: false,
    pixKey: "admin@festecia.com.br",
    stripePublicKey: "",
    stripeSecretKey: "",
    paypalClientId: "",

    // Notificações
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderNotifications: true,
    marketingEmails: true,

    // Segurança
    enableTwoFactor: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireEmailVerification: true,
    enableCaptcha: true,

    // SEO
    metaTitle: "Fest & Cia - Marketplace de Festas",
    metaDescription: "Encontre tudo para sua festa em um só lugar",
    metaKeywords: "festa, evento, decoração, buffet, som, iluminação",
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",

    // Social
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
    youtubeUrl: "",
    whatsappNumber: "",
  })

  const [showSecrets, setShowSecrets] = useState(false)

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log("Salvando configurações:", settings)
    // Aqui você implementaria a lógica de salvar as configurações
    alert("Configurações salvas com sucesso!")
  }

  const handleImageUpload = (key: string) => {
    // Simular upload de imagem
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        handleSettingChange(key, url)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Configurações do Site</h2>
          <p className="text-gray-600">Gerencie as configurações globais da plataforma</p>
        </div>
        <Button onClick={handleSave} className="bg-[#f0739f] hover:bg-[#f53377]">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Recursos
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Social
          </TabsTrigger>
        </TabsList>

        {/* Configurações Gerais */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl">URL do Site</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) => handleSettingChange("siteUrl", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adminEmail">Email do Administrador</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="supportEmail">Email de Suporte</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleSettingChange("address", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aparência */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Personalização Visual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Cor Secundária</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleSettingChange("secondaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleSettingChange("secondaryColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accentColor">Cor de Destaque</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => handleSettingChange("accentColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.accentColor}
                      onChange={(e) => handleSettingChange("accentColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Logo do Site</Label>
                  <div className="flex items-center gap-4">
                    <img
                      src={settings.logoUrl || "/placeholder.svg"}
                      alt="Logo"
                      className="w-16 h-16 object-contain bg-gray-100 rounded"
                    />
                    <Button variant="outline" onClick={() => handleImageUpload("logoUrl")}>
                      <Upload className="h-4 w-4 mr-2" />
                      Alterar Logo
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <img
                      src={settings.faviconUrl || "/placeholder.svg"}
                      alt="Favicon"
                      className="w-8 h-8 object-contain bg-gray-100 rounded"
                    />
                    <Button variant="outline" onClick={() => handleImageUpload("faviconUrl")}>
                      <Upload className="h-4 w-4 mr-2" />
                      Alterar Favicon
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="customCSS">CSS Personalizado</Label>
                <Textarea
                  id="customCSS"
                  value={settings.customCSS}
                  onChange={(e) => handleSettingChange("customCSS", e.target.value)}
                  rows={6}
                  placeholder="/* Adicione seu CSS personalizado aqui */"
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode">Modo Escuro</Label>
                  <p className="text-sm text-gray-500">Ativar tema escuro por padrão</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recursos */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Recursos da Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Registro de Usuários</Label>
                      <p className="text-sm text-gray-500">Permitir novos cadastros</p>
                    </div>
                    <Switch
                      checked={settings.enableRegistration}
                      onCheckedChange={(checked) => handleSettingChange("enableRegistration", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Registro de Vendedores</Label>
                      <p className="text-sm text-gray-500">Permitir cadastro de vendedores</p>
                    </div>
                    <Switch
                      checked={settings.enableVendorRegistration}
                      onCheckedChange={(checked) => handleSettingChange("enableVendorRegistration", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sistema de Avaliações</Label>
                      <p className="text-sm text-gray-500">Permitir avaliações de produtos</p>
                    </div>
                    <Switch
                      checked={settings.enableReviews}
                      onCheckedChange={(checked) => handleSettingChange("enableReviews", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Lista de Desejos</Label>
                      <p className="text-sm text-gray-500">Permitir salvar produtos favoritos</p>
                    </div>
                    <Switch
                      checked={settings.enableWishlist}
                      onCheckedChange={(checked) => handleSettingChange("enableWishlist", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Chat em Tempo Real</Label>
                      <p className="text-sm text-gray-500">Sistema de mensagens</p>
                    </div>
                    <Switch
                      checked={settings.enableChat}
                      onCheckedChange={(checked) => handleSettingChange("enableChat", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-gray-500">Notificações no navegador</p>
                    </div>
                    <Switch
                      checked={settings.enableNotifications}
                      onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Geolocalização</Label>
                      <p className="text-sm text-gray-500">Busca por localização</p>
                    </div>
                    <Switch
                      checked={settings.enableGeolocation}
                      onCheckedChange={(checked) => handleSettingChange("enableGeolocation", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Multi-idioma</Label>
                      <p className="text-sm text-gray-500">Suporte a múltiplos idiomas</p>
                    </div>
                    <Switch
                      checked={settings.enableMultiLanguage}
                      onCheckedChange={(checked) => handleSettingChange("enableMultiLanguage", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pagamentos */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">PIX</Badge>
                      <Label>PIX</Label>
                    </div>
                    <Switch
                      checked={settings.enablePix}
                      onCheckedChange={(checked) => handleSettingChange("enablePix", checked)}
                    />
                  </div>
                  {settings.enablePix && (
                    <div>
                      <Label htmlFor="pixKey">Chave PIX</Label>
                      <Input
                        id="pixKey"
                        value={settings.pixKey}
                        onChange={(e) => handleSettingChange("pixKey", e.target.value)}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">CARD</Badge>
                      <Label>Cartão de Crédito</Label>
                    </div>
                    <Switch
                      checked={settings.enableCreditCard}
                      onCheckedChange={(checked) => handleSettingChange("enableCreditCard", checked)}
                    />
                  </div>
                  {settings.enableCreditCard && (
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
                        <div className="relative">
                          <Input
                            id="stripePublicKey"
                            type={showSecrets ? "text" : "password"}
                            value={settings.stripePublicKey}
                            onChange={(e) => handleSettingChange("stripePublicKey", e.target.value)}
                            placeholder="pk_test_..."
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowSecrets(!showSecrets)}
                          >
                            {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                        <Input
                          id="stripeSecretKey"
                          type={showSecrets ? "text" : "password"}
                          value={settings.stripeSecretKey}
                          onChange={(e) => handleSettingChange("stripeSecretKey", e.target.value)}
                          placeholder="sk_test_..."
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800">BANK</Badge>
                      <Label>Transferência Bancária</Label>
                    </div>
                    <Switch
                      checked={settings.enableBankTransfer}
                      onCheckedChange={(checked) => handleSettingChange("enableBankTransfer", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800">PAYPAL</Badge>
                      <Label>PayPal</Label>
                    </div>
                    <Switch
                      checked={settings.enablePayPal}
                      onCheckedChange={(checked) => handleSettingChange("enablePayPal", checked)}
                    />
                  </div>
                  {settings.enablePayPal && (
                    <div>
                      <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                      <Input
                        id="paypalClientId"
                        type={showSecrets ? "text" : "password"}
                        value={settings.paypalClientId}
                        onChange={(e) => handleSettingChange("paypalClientId", e.target.value)}
                        placeholder="AXxxx..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-gray-500">Enviar emails automáticos</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por SMS</Label>
                      <p className="text-sm text-gray-500">Enviar SMS para eventos importantes</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-gray-500">Notificações no navegador</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações de Pedidos</Label>
                      <p className="text-sm text-gray-500">Alertas sobre novos pedidos</p>
                    </div>
                    <Switch
                      checked={settings.orderNotifications}
                      onCheckedChange={(checked) => handleSettingChange("orderNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Emails de Marketing</Label>
                      <p className="text-sm text-gray-500">Campanhas promocionais</p>
                    </div>
                    <Switch
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-gray-500">Exigir 2FA para admins</p>
                    </div>
                    <Switch
                      checked={settings.enableTwoFactor}
                      onCheckedChange={(checked) => handleSettingChange("enableTwoFactor", checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                      min="5"
                      max="480"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxLoginAttempts">Máximo de Tentativas de Login</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleSettingChange("maxLoginAttempts", Number.parseInt(e.target.value))}
                      min="3"
                      max="10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="passwordMinLength">Tamanho Mínimo da Senha</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => handleSettingChange("passwordMinLength", Number.parseInt(e.target.value))}
                      min="6"
                      max="20"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Verificação de Email</Label>
                      <p className="text-sm text-gray-500">Exigir verificação de email</p>
                    </div>
                    <Switch
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(checked) => handleSettingChange("requireEmailVerification", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>CAPTCHA</Label>
                      <p className="text-sm text-gray-500">Ativar CAPTCHA em formulários</p>
                    </div>
                    <Switch
                      checked={settings.enableCaptcha}
                      onCheckedChange={(checked) => handleSettingChange("enableCaptcha", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Título</Label>
                <Input
                  id="metaTitle"
                  value={settings.metaTitle}
                  onChange={(e) => handleSettingChange("metaTitle", e.target.value)}
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">{settings.metaTitle.length}/60 caracteres</p>
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Descrição</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.metaDescription}
                  onChange={(e) => handleSettingChange("metaDescription", e.target.value)}
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">{settings.metaDescription.length}/160 caracteres</p>
              </div>

              <div>
                <Label htmlFor="metaKeywords">Palavras-chave</Label>
                <Input
                  id="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={(e) => handleSettingChange("metaKeywords", e.target.value)}
                  placeholder="palavra1, palavra2, palavra3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => handleSettingChange("googleAnalyticsId", e.target.value)}
                    placeholder="GA-XXXXXXXXX-X"
                  />
                </div>
                <div>
                  <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
                  <Input
                    id="googleTagManagerId"
                    value={settings.googleTagManagerId}
                    onChange={(e) => handleSettingChange("googleTagManagerId", e.target.value)}
                    placeholder="GTM-XXXXXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                  <Input
                    id="facebookPixelId"
                    value={settings.facebookPixelId}
                    onChange={(e) => handleSettingChange("facebookPixelId", e.target.value)}
                    placeholder="XXXXXXXXXXXXXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebookUrl">Facebook</Label>
                  <Input
                    id="facebookUrl"
                    value={settings.facebookUrl}
                    onChange={(e) => handleSettingChange("facebookUrl", e.target.value)}
                    placeholder="https://facebook.com/suapagina"
                  />
                </div>
                <div>
                  <Label htmlFor="instagramUrl">Instagram</Label>
                  <Input
                    id="instagramUrl"
                    value={settings.instagramUrl}
                    onChange={(e) => handleSettingChange("instagramUrl", e.target.value)}
                    placeholder="https://instagram.com/seuusuario"
                  />
                </div>
                <div>
                  <Label htmlFor="twitterUrl">Twitter</Label>
                  <Input
                    id="twitterUrl"
                    value={settings.twitterUrl}
                    onChange={(e) => handleSettingChange("twitterUrl", e.target.value)}
                    placeholder="https://twitter.com/seuusuario"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn</Label>
                  <Input
                    id="linkedinUrl"
                    value={settings.linkedinUrl}
                    onChange={(e) => handleSettingChange("linkedinUrl", e.target.value)}
                    placeholder="https://linkedin.com/company/suaempresa"
                  />
                </div>
                <div>
                  <Label htmlFor="youtubeUrl">YouTube</Label>
                  <Input
                    id="youtubeUrl"
                    value={settings.youtubeUrl}
                    onChange={(e) => handleSettingChange("youtubeUrl", e.target.value)}
                    placeholder="https://youtube.com/c/seucanal"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsappNumber">WhatsApp</Label>
                  <Input
                    id="whatsappNumber"
                    value={settings.whatsappNumber}
                    onChange={(e) => handleSettingChange("whatsappNumber", e.target.value)}
                    placeholder="5511999999999"
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
