"use client"

import { useState } from "react"
import { products } from "@/lib/products"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { InfiniteScrollProducts } from "@/components/infinite-scroll-products"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Filter products by category
  const filteredProducts = products.filter((p) => p.category === params.category)

  const categoryNames: Record<string, string> = {
    laptops: "Gaming Laptops",
    mice: "Gaming Mice",
    chairs: "Gaming Chairs",
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">{categoryNames[params.category] || "Products"}</h1>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">No products found in this category.</div>
        )}

        {/* Featured Products Section */}
        <div className="mt-16">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Featured Products</h2>
          <InfiniteScrollProducts products={products} />
        </div>
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
