import { Hero } from "@/components/home/hero"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Categories } from "@/components/home/categories"
import { MontesuaFesta } from "@/components/home/monte-sua-festa"
import { BlogSection } from "@/components/home/blog-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <MontesuaFesta />
      <BlogSection />
    </main>
  )
}
