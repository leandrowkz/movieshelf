"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDebounce } from "@/hooks/use-debounce"
import { useSearchStore } from "@/hooks/stores/use-search-store"
import { searchMulti, type SearchMultiResult } from "@/actions/search/search-multi"
import { cn } from "@/lib/cn"

export function FormSearch() {
  const router = useRouter()
  const open = useSearchStore((s) => s.open)
  const setOpen = useSearchStore((s) => s.setOpen)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchMultiResult>({
    movies: [],
    shows: [],
    people: [],
  })
  const [loading, setLoading] = React.useState(false)
  const debounced = useDebounce(query, 250)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, setOpen])

  React.useEffect(() => {
    if (!debounced.trim()) {
      setResults({ movies: [], shows: [], people: [] })
      return
    }
    let cancelled = false
    setLoading(true)
    searchMulti(debounced)
      .then((res) => {
        if (!cancelled) setResults(res)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [debounced])

  const go = (path: string) => {
    setOpen(false)
    setQuery("")
    router.push(path)
  }

  const totalResults =
    results.movies.length + results.shows.length + results.people.length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="top-[8%] translate-y-0 overflow-hidden p-0 sm:top-[12%] sm:max-w-2xl"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Search movies, shows, and people.</DialogDescription>
        </DialogHeader>
        <Command shouldFilter={false}>
          <div className="flex items-center gap-2 border-b px-4">
            <Search className="text-muted-foreground size-5 shrink-0" />
            <CommandPrimitive.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Search movies, shows, people…"
              className={cn(
                "h-14 flex-1 bg-transparent text-base outline-none",
                "placeholder:text-muted-foreground",
              )}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close search"
              className="hover:bg-accent inline-flex size-8 shrink-0 items-center justify-center rounded-md"
            >
              <X className="size-4" />
            </button>
          </div>
          <CommandList className="max-h-[60vh]">
            {loading && (
              <div className="text-muted-foreground px-4 py-6 text-sm">Searching…</div>
            )}
            {!loading && query && totalResults === 0 && (
              <CommandEmpty>No results.</CommandEmpty>
            )}
            {results.movies.length > 0 && (
              <CommandGroup heading="Movies">
                {results.movies.map((m) => (
                  <CommandItem
                    key={`m-${m.id}`}
                    value={`movie-${m.id}`}
                    onSelect={() => go(`/movie/${m.id}`)}
                  >
                    {m.title}
                    {m.release_date && (
                      <span className="text-muted-foreground ml-2 text-xs">
                        {new Date(m.release_date).getUTCFullYear()}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.shows.length > 0 && (
              <>
                {results.movies.length > 0 && <CommandSeparator />}
                <CommandGroup heading="TV Shows">
                  {results.shows.map((s) => (
                    <CommandItem
                      key={`s-${s.id}`}
                      value={`show-${s.id}`}
                      onSelect={() => go(`/show/${s.id}`)}
                    >
                      {s.name}
                      {s.first_air_date && (
                        <span className="text-muted-foreground ml-2 text-xs">
                          {new Date(s.first_air_date).getUTCFullYear()}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
            {results.people.length > 0 && (
              <>
                {(results.movies.length > 0 || results.shows.length > 0) && (
                  <CommandSeparator />
                )}
                <CommandGroup heading="People">
                  {results.people.map((p) => (
                    <CommandItem
                      key={`p-${p.id}`}
                      value={`person-${p.id}`}
                      onSelect={() => go(`/person/${p.id}`)}
                    >
                      {p.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
