import { getMoviesTrending } from "@/actions/movies/get-movies-trending"

export default async function HomePage() {
  const trending = await getMoviesTrending()
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">MovieShelf</h1>
      <p className="mt-2 text-muted-foreground">
        Trending this week ({trending.count} results, page {trending.page}/{trending.pages})
      </p>
      <ul className="mt-4 list-disc pl-6">
        {trending.data.slice(0, 5).map((m) => (
          <li key={m.id}>
            {m.title} — {m.release_date}
          </li>
        ))}
      </ul>
    </main>
  )
}
