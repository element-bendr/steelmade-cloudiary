"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-lg">
      <div className="relative flex w-full items-center">
        <Input
          type="search"
          placeholder="Search products..."
          className="pr-10"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-10 hover:bg-transparent"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
        <Button type="submit" size="icon" className="absolute right-0">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}