"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/cn"

const NAV_LINKS = [
  { href: "/movie", label: "Movies" },
  { href: "/show", label: "TV Shows" },
] as const

export function MenuMain() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main">
      <ul className="flex items-center gap-1">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  active && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
