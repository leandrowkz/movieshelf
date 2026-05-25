"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useCountryStore } from "@/hooks/stores/use-country-store"
import { COUNTRIES, getCountryOption } from "@/lib/countries"
import { cn } from "@/lib/cn"

export function SelectorCountry() {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const country = useCountryStore((s) => s.country)
  const setCountry = useCountryStore((s) => s.setCountry)
  const current = getCountryOption(country)

  React.useEffect(() => setMounted(true), [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          aria-expanded={open}
          className="w-44 justify-between"
          suppressHydrationWarning
        >
          {mounted ? (
            <>
              <span className="mr-1">{current.flag}</span>
              <span className="truncate">{current.name}</span>
            </>
          ) : (
            <span className="truncate">Loading…</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <Command>
          <CommandInput placeholder="Search country…" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {COUNTRIES.map((c) => (
                <CommandItem
                  key={c.code}
                  value={c.name}
                  onSelect={() => {
                    setCountry(c.code)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      country === c.code ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="mr-2">{c.flag}</span>
                  {c.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
