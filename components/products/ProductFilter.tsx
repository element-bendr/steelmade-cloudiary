"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
]

export function ProductFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams?.get("sort") ?? "newest"

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "")
    params.set("sort", value)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}