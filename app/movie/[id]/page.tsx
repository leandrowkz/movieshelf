import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getMovieDetails } from "@/actions/movies/get-movie-details"
import { getMovieCredits } from "@/actions/movies/get-movie-credits"
import { getMovieVideos } from "@/actions/movies/get-movie-videos"
import { getMovieSimilar } from "@/actions/movies/get-movie-similar"
import { getMovieRecommended } from "@/actions/movies/get-movie-recommended"
import { getMoviesTrending } from "@/actions/movies/get-movies-trending"
import { BackdropShow } from "@/components/backdrop-show/backdrop-show"
import { PosterShow } from "@/components/poster-show/poster-show"
import { RatingScore } from "@/components/rating-score/rating-score"
import { ListGenres } from "@/components/list-genres/list-genres"
import { ListPeople } from "@/components/list-people/list-people"
import { ButtonTrailer } from "@/components/button-trailer/button-trailer"
import { ProvidersShow } from "@/components/providers-show/providers-show"
import { CarouselShows } from "@/components/carousel-shows/carousel-shows"
import { Separator } from "@/components/ui/separator"
import { buildMetadata, buildMovieJsonLd, movieTitleWithYear } from "@/lib/seo"
import { getTmdbImageUrl } from "@/lib/images"
import { formatRuntime, formatYear } from "@/lib/format"
import { getCreditsDirector } from "@/lib/shows"

type Params = { id: string }

export async function generateStaticParams() {
  const { data } = await getMoviesTrending()
  return data.slice(0, 20).map((m) => ({ id: String(m.id) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const movie = await getMovieDetails(Number(id))
    return buildMetadata({
      title: movieTitleWithYear(movie),
      description: movie.overview,
      image: getTmdbImageUrl(movie.backdrop_path, "w1280"),
      type: "video.movie",
      url: `/movie/${id}`,
    })
  } catch {
    return { title: "Movie not found" }
  }
}

export default async function MoviePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { id } = await params
  const movieId = Number(id)
  if (!Number.isFinite(movieId)) notFound()

  let movie: Awaited<ReturnType<typeof getMovieDetails>>
  try {
    movie = await getMovieDetails(movieId)
  } catch {
    notFound()
  }

  const [credits, videos, similar, recommended] = await Promise.all([
    getMovieCredits(movieId),
    getMovieVideos(movieId),
    getMovieSimilar(movieId),
    getMovieRecommended(movieId),
  ])

  const director = getCreditsDirector(credits)

  return (
    <>
      <BackdropShow path={movie.backdrop_path} alt={movie.title} />
      <article className="relative z-10 container mx-auto -mt-32 px-4 sm:-mt-48">
        <div className="grid gap-6 sm:grid-cols-[200px_1fr] sm:gap-8">
          <div className="hidden sm:block">
            <PosterShow path={movie.poster_path} alt={movie.title} priority />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-muted-foreground mt-1 italic">{movie.tagline}</p>
            )}
            <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span>{formatYear(movie.release_date)}</span>
              {movie.runtime > 0 && <span>{formatRuntime(movie.runtime)}</span>}
              <RatingScore value={movie.vote_average} size="md" />
            </div>
            <ListGenres genres={movie.genres} showType="movie" className="mt-3" />
            {movie.overview && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed">
                {movie.overview}
              </p>
            )}
            {director && (
              <p className="text-muted-foreground mt-3 text-sm">
                Directed by{" "}
                <Link
                  href={`/person/${director.id}`}
                  className="text-foreground font-medium hover:underline"
                >
                  {director.name}
                </Link>
              </p>
            )}
            <div className="mt-5">
              <ButtonTrailer videos={videos.results} title={movie.title} />
            </div>
          </div>
        </div>

        <Separator className="my-10" />
        <ProvidersShow showId={movieId} showType="movie" />

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
            <CarouselShows title="Similar movies" shows={similar.data} />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildMovieJsonLd(movie)) }}
      />
    </>
  )
}
