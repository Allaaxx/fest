import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "10 Dicas para Organizar um Casamento Perfeito",
    excerpt: "Descubra as melhores práticas para planejar o casamento dos seus sonhos sem estresse.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Maria Silva",
    date: "2024-01-15",
    category: "Casamento",
  },
  {
    id: 2,
    title: "Tendências de Decoração para Festas de 15 Anos",
    excerpt: "Conheça as últimas tendências em decoração para tornar a festa de 15 anos inesquecível.",
    image: "/placeholder.svg?height=200&width=300",
    author: "João Santos",
    date: "2024-01-12",
    category: "15 Anos",
  },
  {
    id: 3,
    title: "Como Economizar na Organização de Eventos",
    excerpt: "Dicas práticas para reduzir custos sem comprometer a qualidade do seu evento.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Ana Costa",
    date: "2024-01-10",
    category: "Dicas",
  },
]

export function BlogSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-fest-black2 mb-4">Blog Fest</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dicas, tendências e tutoriais para organizar eventos incríveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-fest-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-fest-black2 mb-3 line-clamp-2">{post.title}</h3>

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

                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" className="group/btn p-0 h-auto text-fest-primary hover:text-fest-dark">
                      Ler mais
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">Ver Todos os Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
