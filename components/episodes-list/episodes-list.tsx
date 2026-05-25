import Image from "next/image"
import type { TVEpisode } from "@leandrowkz/tmdb"
import { Card } from "@/components/ui/card"
import { RatingScore } from "@/components/rating-score/rating-score"
import { formatDate, formatRuntime } from "@/lib/format"
import { getTmdbImageUrl } from "@/lib/images"

type EpisodesListProps = {
  episodes: TVEpisode[]
}

export function EpisodesList({ episodes }: EpisodesListProps) {
  if (!episodes.length) {
    return (
      <p className="text-muted-foreground text-sm">No episodes available.</p>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {episodes.map((ep) => {
        const still = getTmdbImageUrl(ep.still_path, "w300")
        return (
          <li key={ep.id}>
            <Card className="flex flex-col gap-3 overflow-hidden p-3 sm:flex-row">
              <div className="bg-muted relative aspect-video w-full shrink-0 overflow-hidden rounded-md sm:w-48">
                {still && (
                  <Image
                    src={still}
                    alt={ep.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 192px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-semibold leading-tight">
                    <span className="text-muted-foreground mr-2 text-sm font-normal">
                      E{ep.episode_number}
                    </span>
                    {ep.name}
                  </h3>
                  <RatingScore value={ep.vote_average} />
                </div>
                <div className="text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  {ep.air_date && <span>{formatDate(ep.air_date)}</span>}
                  {ep.runtime > 0 && <span>{formatRuntime(ep.runtime)}</span>}
                </div>
                {ep.overview && (
                  <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
                    {ep.overview}
                  </p>
                )}
              </div>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
