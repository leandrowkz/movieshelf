import type { Genre } from "@leandrowkz/tmdb"
import { BadgeGenre } from "@/components/badge-genre/badge-genre"
import { cn } from "@/lib/cn"
import type { ShowType } from "@/types/show-type"

type ListGenresProps = {
  genres: Genre[]
  showType: ShowType
  className?: string
}

export function ListGenres({ genres, showType, className }: ListGenresProps) {
  if (!genres.length) return null

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {genres.map((g) => (
        <li key={g.id}>
          <BadgeGenre id={g.id} name={g.name} showType={showType} />
        </li>
      ))}
    </ul>
  )
}
