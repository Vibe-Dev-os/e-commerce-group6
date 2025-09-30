"use client"

import { useState } from "react"
import { products } from "@/lib/products"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { InfiniteScrollProducts } from "@/components/infinite-scroll-products"

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProducts = selectedCategory ? products.filter((p) => p.category === selectedCategory) : products

  const featuredProduct = filteredProducts[0]
  const otherProducts = filteredProducts.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Featured product - takes up 2 columns on large screens */}
          <div className="lg:col-span-2 lg:row-span-2">
            <ProductCard product={featuredProduct} featured />
          </div>

          {/* Other products in a grid */}
          {otherProducts.slice(0, 2).map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Featured Products</h2>
          <InfiniteScrollProducts products={filteredProducts} />
        </div>
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
