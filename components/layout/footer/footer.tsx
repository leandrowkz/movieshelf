import Link from "next/link"
import { Github } from "lucide-react"
import { Logo } from "@/components/layout/logo/logo"
import { Separator } from "@/components/ui/separator"
import { SITE_NAME } from "@/lib/constants"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="text-muted-foreground mt-3 text-sm">
              {SITE_NAME} uses TMDB and the TMDB APIs but is not endorsed,
              certified, or otherwise approved by TMDB.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2 text-sm sm:items-end">
              <li>
                <Link href="/movie" className="text-muted-foreground hover:text-foreground">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/show" className="text-muted-foreground hover:text-foreground">
                  TV Shows
                </Link>
              </li>
              <li>
                <a
                  href="https://www.themoviedb.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  TMDB ↗
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <Separator className="my-6" />
        <div className="text-muted-foreground flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE_NAME}. All rights reserved.</p>
          <a
            href="https://github.com/leandrowkz/movieshelf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <Github className="size-4" /> GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
