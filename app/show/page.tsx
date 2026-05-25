import type { Metadata } from "next"
import { getShowsPopular } from "@/actions/shows/get-shows-popular"
import { getShowGenreLists } from "@/actions/genres/get-show-genre-lists"
import { CarouselShows } from "@/components/carousel-shows/carousel-shows"
import { ListShows } from "@/components/list-shows/list-shows"
import { PaginationShows } from "@/components/pagination-shows/pagination-shows"
import { buildMetadata } from "@/lib/seo"

const POPULAR_GENRES = [10759, 18, 35, 80, 9648, 10765, 16, 10751]

type SearchParams = { page?: string }

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "TV Shows",
    description:
      "Discover popular TV shows, browse by genre and find what to watch next.",
    url: "/show",
  })
}

export default async function ShowsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Math.min(500, Number(pageParam) || 1))

  const [popular, genreLists] = await Promise.all([
    getShowsPopular(page),
    page === 1 ? getShowGenreLists(POPULAR_GENRES) : Promise.resolve([]),
  ])

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">TV Shows</h1>
        <p className="text-muted-foreground mt-2">
          Browse popular TV shows and discover by genre.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Popular</h2>
        <ListShows shows={popular.data} />
        <PaginationShows page={popular.page} pages={popular.pages} basePath="/show" />
      </section>

      {page === 1 && genreLists.length > 0 && (
        <div className="mt-16 space-y-12">
          {genreLists.map((list) => (
            <CarouselShows
              key={list.genre.id}
              title={list.genre.name}
              shows={list.data.data}
              viewAllHref={`/show/genre/${list.genre.id}`}
            />
          ))}
        </div>
      )}
    </main>
  )
}
