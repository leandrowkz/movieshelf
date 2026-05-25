import type { MovieItem, TVShowItem } from "@leandrowkz/tmdb"
import { CardMovie } from "@/components/card-movie/card-movie"
import { CardShow } from "@/components/card-show/card-show"
import { cn } from "@/lib/cn"

type ListShowsProps = {
  shows: (MovieItem | TVShowItem)[]
  className?: string
}

export function ListShows({ shows, className }: ListShowsProps) {
  if (!shows.length) {
    return (
      <p className="text-muted-foreground py-12 text-center text-sm">
        No results.
      </p>
    )
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        className,
      )}
    >
      {shows.map((show) => (
        <li key={`${show.media_type ?? "show"}-${show.id}`}>
          {"title" in show ? (
            <CardMovie movie={show as MovieItem} />
          ) : (
            <CardShow show={show as TVShowItem} />
          )}
        </li>
      ))}
    </ul>
  )
}
