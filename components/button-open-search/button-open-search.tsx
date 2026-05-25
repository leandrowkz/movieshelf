"use client"

import { Search } from "lucide-react"
import { useSearchStore } from "@/hooks/stores/use-search-store"
import { cn } from "@/lib/cn"

type ButtonOpenSearchProps = {
  variant?: "icon" | "input"
  className?: string
}

export function ButtonOpenSearch({
  variant = "icon",
  className,
}: ButtonOpenSearchProps) {
  const openSearch = useSearchStore((s) => s.openSearch)

  if (variant === "input") {
    return (
      <button
        type="button"
        onClick={openSearch}
        className={cn(
          "border-input bg-background hover:bg-accent text-muted-foreground inline-flex h-9 items-center justify-between gap-2 rounded-md border px-3 text-sm transition-colors",
          "w-full sm:w-auto sm:min-w-64",
          className,
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Search className="size-4" />
          <span>Search…</span>
        </span>
        <kbd className="bg-muted text-muted-foreground hidden rounded border px-1.5 font-mono text-xs sm:inline-block">
          ⌘K
        </kbd>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Open search"
      className={cn(
        "hover:bg-accent inline-flex size-9 items-center justify-center rounded-md transition-colors",
        className,
      )}
    >
      <Search className="size-5" />
    </button>
  )
}
