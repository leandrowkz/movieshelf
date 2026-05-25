"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Film, Home, Menu, Monitor, Moon, Search, Sun, Tv } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useSearchStore } from "@/hooks/stores/use-search-store"
import { cn } from "@/lib/cn"

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/movie", label: "Movies", icon: Film },
  { href: "/show", label: "TV Shows", icon: Tv },
] as const

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

export function MenuMobile() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const openSearch = useSearchStore((s) => s.openSearch)
  const { theme, setTheme } = useTheme()

  const handleSearchClick = () => {
    setOpen(false)
    openSearch()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        type="button"
        aria-label="Open menu"
        className="hover:bg-accent inline-flex size-9 items-center justify-center rounded-md transition-colors"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Browse movies, TV shows, search, and switch theme.
          </SheetDescription>
        </SheetHeader>
        <nav className="px-2">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`))
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium",
                      "text-muted-foreground hover:bg-accent hover:text-foreground",
                      active && "bg-accent text-foreground",
                    )}
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <button
                type="button"
                onClick={handleSearchClick}
                className="text-muted-foreground hover:bg-accent hover:text-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-base font-medium"
              >
                <Search className="size-4" />
                Search
              </button>
            </li>
          </ul>
        </nav>

        <Separator className="my-2" />

        <div className="px-2">
          <p className="text-muted-foreground px-3 py-2 text-xs font-medium tracking-wider uppercase">
            Theme
          </p>
          <ul className="flex flex-col gap-1">
            {THEMES.map((t) => {
              const Icon = t.icon
              const active = theme === t.value
              return (
                <li key={t.value}>
                  <button
                    type="button"
                    onClick={() => setTheme(t.value)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-base font-medium",
                      "text-muted-foreground hover:bg-accent hover:text-foreground",
                      active && "bg-accent text-foreground",
                    )}
                  >
                    <Icon className="size-4" />
                    {t.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  )
}
