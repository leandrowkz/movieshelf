"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import { searchMulti, type SearchMultiResult } from "@/actions/search/search-multi"

export function FormSearch() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
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
        setOpen((v) => !v)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

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
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-muted-foreground w-full justify-between gap-2 sm:w-auto sm:min-w-64"
      >
        <span className="inline-flex items-center gap-2">
          <Search className="size-4" />
          <span>Search…</span>
        </span>
        <kbd className="bg-muted text-muted-foreground hidden rounded border px-1.5 font-mono text-xs sm:inline-block">
          ⌘K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>Search movies, shows, and people.</DialogDescription>
          </DialogHeader>
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search movies, shows, people…"
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {loading && <div className="text-muted-foreground px-4 py-6 text-sm">Searching…</div>}
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
    </>
  )
}
