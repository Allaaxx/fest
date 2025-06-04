"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: 1,
    title: "10 Dicas para Organizar um Casamento Perfeito",
    excerpt:
      "Descubra as melhores práticas para planejar o casamento dos seus sonhos sem estresse e dentro do orçamento.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Maria Silva",
    date: "2024-01-15",
    category: "Casamento",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Tendências de Decoração para Festas de 15 Anos",
    excerpt: "Conheça as últimas tendências em decoração para tornar a festa de 15 anos inesquecível e moderna.",
    image: "/placeholder.svg?height=300&width=400",
    author: "João Santos",
    date: "2024-01-12",
    category: "15 Anos",
    readTime: "3 min",
  },
  {
    id: 3,
    title: "Como Economizar na Organização de Eventos",
    excerpt: "Dicas práticas para reduzir custos sem comprometer a qualidade do seu evento especial.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Ana Costa",
    date: "2024-01-10",
    category: "Dicas",
    readTime: "7 min",
  },
  {
    id: 4,
    title: "Buffet vs Finger Food: Qual Escolher?",
    excerpt: "Compare as vantagens e desvantagens de cada opção para fazer a melhor escolha para seu evento.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Carlos Mendes",
    date: "2024-01-08",
    category: "Gastronomia",
    readTime: "4 min",
  },
  {
    id: 5,
    title: "Fotografias de Casamento: O que Observar",
    excerpt: "Guia completo para escolher o fotógrafo ideal e garantir as melhores memórias do seu grande dia.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Fernanda Lima",
    date: "2024-01-05",
    category: "Fotografia",
    readTime: "6 min",
  },
  {
    id: 6,
    title: "Decoração Sustentável para Eventos",
    excerpt: "Aprenda a criar eventos lindos e memoráveis usando práticas sustentáveis e materiais eco-friendly.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Pedro Oliveira",
    date: "2024-01-03",
    category: "Sustentabilidade",
    readTime: "5 min",
  },
]

const categories = ["Todos", "Casamento", "15 Anos", "Dicas", "Gastronomia", "Fotografia", "Sustentabilidade"]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-fest-black2 mb-4">Blog Fest</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Dicas, tendências e tutoriais para organizar eventos incríveis
        </p>
      </div>

      {/* Search and Categories */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input type="text" placeholder="Buscar no blog..." className="pl-10" />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm" className="hover:bg-fest-primary hover:text-white">
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto">
              <Image
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-fest-primary">{blogPosts[0].category}</Badge>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-4">
                Post em Destaque
              </Badge>
              <h2 className="text-2xl font-bold text-fest-black2 mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(blogPosts[0].date).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <span>{blogPosts[0].readTime} de leitura</span>
                </div>
              </div>
              <Link href={`/blog/${blogPosts[0].id}`}>
                <Button className="bg-fest-primary hover:bg-fest-dark text-white group">
                  Ler Artigo
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-fest-primary">{post.category}</Badge>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-fest-black2 mb-3 line-clamp-2 group-hover:text-fest-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime} de leitura</span>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" className="text-fest-primary hover:text-fest-dark group/btn p-0">
                      Ler mais
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mt-16">
        <Card className="bg-gradient-to-r from-fest-primary to-fest-dark text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Receba as Últimas Dicas</h3>
            <p className="mb-6 opacity-90">
              Assine nossa newsletter e receba dicas exclusivas para organizar eventos perfeitos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Seu melhor email" className="bg-white text-gray-900 border-0 flex-1" />
              <Button variant="secondary" className="bg-white text-fest-primary hover:bg-gray-100">
                Assinar Grátis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
