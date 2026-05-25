import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"

type PaginationShowsProps = {
  page: number
  pages: number
  basePath: string
  className?: string
}

export function PaginationShows({
  page,
  pages,
  basePath,
  className,
}: PaginationShowsProps) {
  if (pages <= 1) return null

  const capped = Math.min(pages, 500)
  const prevPage = Math.max(1, page - 1)
  const nextPage = Math.min(capped, page + 1)
  const hasPrev = page > 1
  const hasNext = page < capped

  const link = (p: number) =>
    p <= 1 ? basePath : `${basePath}?page=${p}`

  return (
    <nav
      aria-label="Pagination"
      className={cn("mt-8 flex items-center justify-center gap-3", className)}
    >
      {hasPrev ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={link(prevPage)} prefetch={false}>
            <ChevronLeft />
            Previous
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft />
          Previous
        </Button>
      )}
      <span className="text-muted-foreground text-sm">
        Page {page} of {capped}
      </span>
      {hasNext ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={link(nextPage)} prefetch={false}>
            Next
            <ChevronRight />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Next
          <ChevronRight />
        </Button>
      )}
    </nav>
  )
}
