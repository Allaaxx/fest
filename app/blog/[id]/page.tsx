"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Dados simulados do post
const blogPost = {
  id: 1,
  title: "10 Dicas para Organizar um Casamento Perfeito",
  content: `
    <p>Organizar um casamento pode ser uma experiência mágica, mas também desafiadora. Com o planejamento adequado e as dicas certas, você pode criar o dia dos seus sonhos sem o estresse desnecessário.</p>
    
    <h2>1. Defina seu Orçamento</h2>
    <p>O primeiro passo é estabelecer um orçamento realista. Isso ajudará a orientar todas as suas decisões futuras e evitará gastos excessivos.</p>
    
    <h2>2. Escolha a Data com Antecedência</h2>
    <p>Quanto mais cedo você definir a data, melhores serão suas opções de local e fornecedores. Considere a estação do ano e eventos locais.</p>
    
    <h2>3. Monte sua Lista de Convidados</h2>
    <p>A quantidade de convidados influenciará diretamente o local, o cardápio e o orçamento total do evento.</p>
    
    <h2>4. Reserve o Local Ideal</h2>
    <p>O local é um dos elementos mais importantes. Visite várias opções e considere fatores como capacidade, localização e serviços inclusos.</p>
    
    <h2>5. Contrate Fornecedores Confiáveis</h2>
    <p>Pesquise bem antes de contratar fotógrafos, decoradores, buffet e outros profissionais. Verifique portfólios e referências.</p>
  `,
  image: "/placeholder.svg?height=400&width=800",
  author: "Maria Silva",
  date: "2024-01-15",
  category: "Casamento",
  readTime: "5 min",
  tags: ["casamento", "planejamento", "dicas", "organização"],
}

const relatedPosts = [
  {
    id: 2,
    title: "Tendências de Decoração para Festas de 15 Anos",
    image: "/placeholder.svg?height=200&width=300",
    date: "2024-01-12",
  },
  {
    id: 3,
    title: "Como Economizar na Organização de Eventos",
    image: "/placeholder.svg?height=200&width=300",
    date: "2024-01-10",
  },
]

interface BlogPostPageProps {
  params: Promise<{ id: string }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = use(params)

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-6 text-fest-primary hover:text-fest-dark">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Blog
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-fest-primary">{blogPost.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-fest-black2 mb-4">{blogPost.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(blogPost.date).toLocaleDateString("pt-BR")}</span>
            </div>
            <span>{blogPost.readTime} de leitura</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Curtir
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Comentar
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} fill className="object-cover" />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
            className="text-gray-700 leading-relaxed space-y-6"
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="font-semibold text-fest-black2 mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="hover:bg-fest-primary hover:text-white cursor-pointer">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Author Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-fest-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                {blogPost.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-fest-black2">{blogPost.author}</h4>
                <p className="text-gray-600">
                  Especialista em organização de eventos com mais de 10 anos de experiência no mercado.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <div>
          <h3 className="text-2xl font-bold text-fest-black2 mb-6">Artigos Relacionados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Link href={`/blog/${post.id}`}>
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-4">
                    <Link href={`/blog/${post.id}`}>
                      <h4 className="font-semibold text-fest-black2 mb-2 group-hover:text-fest-primary">
                        {post.title}
                      </h4>
                    </Link>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
