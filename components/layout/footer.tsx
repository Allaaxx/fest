import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-fest-black2 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-fest-primary">Fest</h3>
            <p className="text-gray-300">
              A plataforma completa para venda, locação e serviços para eventos. Transforme suas celebrações em momentos
              inesquecíveis.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-fest-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-fest-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-fest-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-fest-primary">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/venda" className="text-gray-300 hover:text-fest-primary">
                  Venda
                </Link>
              </li>
              <li>
                <Link href="/categoria/locacao" className="text-gray-300 hover:text-fest-primary">
                  Locação
                </Link>
              </li>
              <li>
                <Link href="/categoria/servicos" className="text-gray-300 hover:text-fest-primary">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-fest-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-fest-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Vendedores */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Para Vendedores</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/vendedor/cadastro" className="text-gray-300 hover:text-fest-primary">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link href="/vendedor/login" className="text-gray-300 hover:text-fest-primary">
                  Área do Vendedor
                </Link>
              </li>
              <li>
                <Link href="/vendedor/como-funciona" className="text-gray-300 hover:text-fest-primary">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/vendedor/taxas" className="text-gray-300 hover:text-fest-primary">
                  Taxas
                </Link>
              </li>
              <li>
                <Link href="/vendedor/suporte" className="text-gray-300 hover:text-fest-primary">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato e Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-fest-primary" />
                <span className="text-gray-300">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-fest-primary" />
                <span className="text-gray-300">contato@fest.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-fest-primary" />
                <span className="text-gray-300">São Paulo, SP</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Newsletter</h5>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  className="bg-fest-blue border-fest-blue text-white placeholder:text-gray-400"
                />
                <Button className="btn-primary">Assinar</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-fest-blue mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Fest. Todos os direitos reservados. |
            <Link href="/privacidade" className="text-fest-primary hover:underline ml-1">
              Política de Privacidade
            </Link>{" "}
            |
            <Link href="/termos" className="text-fest-primary hover:underline ml-1">
              Termos de Uso
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
