"use client"

import { useState, useEffect } from "react"
import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Plus, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/currency"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"
import { ProductCard } from "@/components/product-card"
import { InfiniteScrollProducts } from "@/components/infinite-scroll-products"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  colors: { name: string; value: string }[]
  sizes: string[]
  category: string
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [product, setProduct] = useState<Product | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProduct()
    fetchAllProducts()
  }, [params.id])

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || "")
      setSelectedSize(product.sizes[0] || "")
    }
  }, [product])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        notFound()
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      notFound()
    } finally {
      setLoading(false)
    }
  }

  const fetchAllProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setAllProducts(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 5)

  const handleAddToCart = () => {
    // Check if user is authenticated
    if (!session) {
      setShowLoginAlert(true)
      return
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[currentImageIndex] || product.images[0],
      color: selectedColor,
      size: selectedSize,
    })
    setIsCartOpen(true)
    setShowLoginAlert(false)
  }

  const handleLoginRedirect = () => {
    // Save current product in session storage to return after login
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('returnToProduct', params.id)
    }
    router.push('/auth/signin')
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="mx-auto max-w-[1920px] px-3 py-8 sm:px-4 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                quality={100}
                priority
                unoptimized
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Image thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 w-20 overflow-hidden rounded-md border-2 transition-colors ${
                      currentImageIndex === index ? "border-foreground" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      quality={100}
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
              <div className="mt-3 inline-block rounded-full bg-blue-600 px-4 py-2 text-lg font-semibold text-white">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`rounded-full border-2 px-6 py-2 text-sm font-medium transition-colors ${
                        selectedColor === color.name
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground hover:border-muted-foreground"
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border-2 px-6 py-2 text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground hover:border-muted-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Login Alert */}
            {showLoginAlert && (
              <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <LogIn className="h-4 w-4 text-amber-600" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-sm text-amber-900 dark:text-amber-100">
                    Please log in to add items to your cart
                  </span>
                  <Button 
                    onClick={handleLoginRedirect}
                    size="sm"
                    className="ml-2"
                  >
                    Login Now
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-blue-600 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status === "loading"}
            >
              <Plus className="h-5 w-5" />
              {session ? "Add To Cart" : "Login to Purchase"}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
            <InfiniteScrollProducts products={relatedProducts} />
          </div>
        )}
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
