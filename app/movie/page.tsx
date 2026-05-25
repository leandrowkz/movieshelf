import type { Metadata } from "next"
import { getMoviesPopular } from "@/actions/movies/get-movies-popular"
import { getMovieGenreLists } from "@/actions/genres/get-movie-genre-lists"
import { CarouselShows } from "@/components/carousel-shows/carousel-shows"
import { ListShows } from "@/components/list-shows/list-shows"
import { PaginationShows } from "@/components/pagination-shows/pagination-shows"
import { buildMetadata } from "@/lib/seo"

const POPULAR_GENRES = [28, 35, 18, 27, 878, 16, 80, 10749]

type SearchParams = { page?: string }

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Movies",
    description:
      "Discover popular movies, browse by genre and find what to watch next.",
    url: "/movie",
  })
}

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Math.min(500, Number(pageParam) || 1))

  const [popular, genreLists] = await Promise.all([
    getMoviesPopular(page),
    page === 1 ? getMovieGenreLists(POPULAR_GENRES) : Promise.resolve([]),
  ])

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Movies</h1>
          <p className="text-muted-foreground mt-2">
            Browse popular movies and discover by genre.
          </p>
        </header>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Popular</h2>
          <ListShows shows={popular.data} />
          <PaginationShows page={popular.page} pages={popular.pages} basePath="/movie" />
        </section>
      </div>

      {page === 1 && genreLists.length > 0 && (
        <div className="mt-16 space-y-12">
          {genreLists.map((list) => (
            <CarouselShows
              key={list.genre.id}
              title={list.genre.name}
              shows={list.data.data}
              viewAllHref={`/movie/genre/${list.genre.id}`}
            />
          ))}
        </div>
      )}
    </main>
  )
}
