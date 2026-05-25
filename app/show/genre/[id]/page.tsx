import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getShowGenres } from "@/actions/genres/get-show-genres"
import { getShowsByGenre } from "@/actions/shows/get-shows-by-genre"
import { ListShows } from "@/components/list-shows/list-shows"
import { PaginationShows } from "@/components/pagination-shows/pagination-shows"
import { buildMetadata } from "@/lib/seo"

type Params = { id: string }
type SearchParams = { page?: string }

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { id } = await params
  const genres = await getShowGenres()
  const genre = genres.find((g) => g.id === Number(id))
  if (!genre) return { title: "Genre not found" }
  return buildMetadata({
    title: `${genre.name} TV shows`,
    description: `Browse ${genre.name.toLowerCase()} TV shows on MovieShelf.`,
    url: `/show/genre/${id}`,
  })
}

export default async function ShowGenrePage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const [{ id }, { page: pageParam }] = await Promise.all([
    params,
    searchParams,
  ])
  const genreId = Number(id)
  if (!Number.isFinite(genreId)) notFound()

  const page = Math.max(1, Math.min(500, Number(pageParam) || 1))

  const [genres, list] = await Promise.all([
    getShowGenres(),
    getShowsByGenre(genreId, page),
  ])

  const genre = genres.find((g) => g.id === genreId)
  if (!genre) notFound()

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <p className="text-muted-foreground text-sm">TV Shows / Genre</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          {genre.name}
        </h1>
      </header>
      <ListShows shows={list.data} />
      <PaginationShows
        page={list.page}
        pages={list.pages}
        basePath={`/show/genre/${genreId}`}
      />
    </main>
  )
}
