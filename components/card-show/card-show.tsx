import Link from "next/link"
import type { TVShowItem } from "@leandrowkz/tmdb"
import { PosterShow } from "@/components/poster-show/poster-show"
import { RatingScore } from "@/components/rating-score/rating-score"
import { formatYear } from "@/lib/format"
import { cn } from "@/lib/cn"

type CardShowProps = {
  show: TVShowItem
  className?: string
  priority?: boolean
}

export function CardShow({ show, className, priority }: CardShowProps) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/show/${show.id}`} className="block">
        <PosterShow
          path={show.poster_path}
          alt={show.name}
          priority={priority}
          className="transition-transform group-hover:scale-[1.02]"
        />
        <div className="mt-2">
          <h3 className="line-clamp-2 text-sm font-medium leading-tight">
            {show.name}
          </h3>
          <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
            <span>{formatYear(show.first_air_date)}</span>
            <RatingScore value={show.vote_average} />
          </div>
        </div>
      </Link>
    </article>
  )
}
