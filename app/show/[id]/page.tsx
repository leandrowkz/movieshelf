import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getShowDetails } from "@/actions/shows/get-show-details"
import { getShowCredits } from "@/actions/shows/get-show-credits"
import { getShowVideos } from "@/actions/shows/get-show-videos"
import { getShowSimilar } from "@/actions/shows/get-show-similar"
import { getShowRecommended } from "@/actions/shows/get-show-recommended"
import { getShowsPopular } from "@/actions/shows/get-shows-popular"
import { BackdropShow } from "@/components/backdrop-show/backdrop-show"
import { PosterShow } from "@/components/poster-show/poster-show"
import { RatingScore } from "@/components/rating-score/rating-score"
import { ListGenres } from "@/components/list-genres/list-genres"
import { ListPeople } from "@/components/list-people/list-people"
import { ButtonTrailer } from "@/components/button-trailer/button-trailer"
import { ProvidersShow } from "@/components/providers-show/providers-show"
import { CarouselShows } from "@/components/carousel-shows/carousel-shows"
import { SeasonsTabs } from "@/components/seasons-tabs/seasons-tabs"
import { Separator } from "@/components/ui/separator"
import { buildMetadata, buildTvSeriesJsonLd, showTitleWithYear } from "@/lib/seo"
import { getTmdbImageUrl } from "@/lib/images"
import { formatYear } from "@/lib/format"

type Params = { id: string }

export async function generateStaticParams() {
  const { data } = await getShowsPopular()
  return data.slice(0, 20).map((s) => ({ id: String(s.id) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const show = await getShowDetails(Number(id))
    return buildMetadata({
      title: showTitleWithYear(show),
      description: show.overview,
      image: getTmdbImageUrl(show.backdrop_path, "w1280"),
      type: "video.tv_show",
      url: `/show/${id}`,
    })
  } catch {
    return { title: "Show not found" }
  }
}

export default async function ShowPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { id } = await params
  const showId = Number(id)
  if (!Number.isFinite(showId)) notFound()

  let show: Awaited<ReturnType<typeof getShowDetails>>
  try {
    show = await getShowDetails(showId)
  } catch {
    notFound()
  }

  const [credits, videos, similar, recommended] = await Promise.all([
    getShowCredits(showId),
    getShowVideos(showId),
    getShowSimilar(showId),
    getShowRecommended(showId),
  ])

  const creators = show.created_by?.map((c) => c.name) ?? []
  const runtime = show.episode_run_time?.[0]

  return (
    <>
      <BackdropShow path={show.backdrop_path} alt={show.name} />
      <article className="relative z-10 container mx-auto -mt-32 px-4 sm:-mt-48">
        <div className="grid gap-6 sm:grid-cols-[200px_1fr] sm:gap-8">
          <div className="hidden sm:block">
            <PosterShow path={show.poster_path} alt={show.name} priority />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {show.name}
            </h1>
            {show.tagline && (
              <p className="text-muted-foreground mt-1 italic">{show.tagline}</p>
            )}
            <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span>{formatYear(show.first_air_date)}</span>
              {show.number_of_seasons > 0 && (
                <span>
                  {show.number_of_seasons} season
                  {show.number_of_seasons === 1 ? "" : "s"}
                </span>
              )}
              {runtime && runtime > 0 && <span>~{runtime}min episodes</span>}
              <RatingScore value={show.vote_average} size="md" />
            </div>
            <ListGenres genres={show.genres} showType="tv" className="mt-3" />
            {show.overview && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed">
                {show.overview}
              </p>
            )}
            {creators.length > 0 && (
              <p className="text-muted-foreground mt-3 text-sm">
                Created by{" "}
                <span className="text-foreground font-medium">
                  {creators.join(", ")}
                </span>
              </p>
            )}
            <div className="mt-5">
              <ButtonTrailer videos={videos.results} title={show.name} />
            </div>
          </div>
        </div>

        <Separator className="my-10" />
        <ProvidersShow showId={showId} showType="tv" />

        {show.seasons?.length > 0 && (
          <>
            <Separator className="my-10" />
            <section>
              <h2 className="mb-4 text-xl font-semibold">Seasons & episodes</h2>
              <SeasonsTabs showId={showId} seasons={show.seasons} />
            </section>
          </>
        )}

        {credits.cast.length > 0 && (
          <>
            <Separator className="my-10" />
            <section>
              <h2 className="mb-4 text-xl font-semibold">Top cast</h2>
              <ListPeople people={credits.cast} limit={12} />
            </section>
          </>
        )}

        {similar.data.length > 0 && (
          <div className="mt-10">
            <CarouselShows title="Similar shows" shows={similar.data} />
          </div>
        )}
        {recommended.data.length > 0 && (
          <div className="mt-10">
            <CarouselShows title="You might also like" shows={recommended.data} />
          </div>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildTvSeriesJsonLd(show)) }}
      />
    </>
  )
}
