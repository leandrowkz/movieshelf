import Link from "next/link"
import type { MovieItem } from "@leandrowkz/tmdb"
import { PosterShow } from "@/components/poster-show/poster-show"
import { RatingScore } from "@/components/rating-score/rating-score"
import { formatYear } from "@/lib/format"
import { cn } from "@/lib/cn"

type CardMovieProps = {
  movie: MovieItem
  className?: string
  priority?: boolean
}

export function CardMovie({ movie, className, priority }: CardMovieProps) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/movie/${movie.id}`} className="block">
        <PosterShow
          path={movie.poster_path}
          alt={movie.title}
          priority={priority}
        />
        <div className="mt-2">
          <h3 className="line-clamp-2 text-sm font-medium leading-tight">
            {movie.title}
          </h3>
          <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
            <span>{formatYear(movie.release_date)}</span>
            <RatingScore value={movie.vote_average} />
          </div>
        </div>
      </Link>
    </article>
  )
}
