"use client"

import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { UserNav } from "@/components/auth/user-nav"
import { useState } from "react"

export function Header({ onCartClick }: { onCartClick: () => void }) {
  const { totalItems } = useCart()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center bg-foreground text-background">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">ACME STORE</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-muted-foreground">
            All
          </Link>
          <Link href="/category/laptops" className="text-sm font-medium transition-colors hover:text-muted-foreground">
            Gaming Laptops
          </Link>
          <Link href="/category/mice" className="text-sm font-medium transition-colors hover:text-muted-foreground">
            Gaming Mice
          </Link>
          <Link href="/category/chairs" className="text-sm font-medium transition-colors hover:text-muted-foreground">
            Gaming Chairs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-64 rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <button
            onClick={onCartClick}
            className="relative flex h-10 w-10 items-center justify-center rounded-md border border-input transition-colors hover:bg-accent"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                {totalItems}
              </span>
            )}
          </button>

          <UserNav />
        </div>
      </div>
    </header>
  )
}
