import { getMoviesTrending } from "@/actions/movies/get-movies-trending"
import { getMoviesPopular } from "@/actions/movies/get-movies-popular"
import { getMoviesInTheatres } from "@/actions/movies/get-movies-in-theatres"
import { getShowsPopular } from "@/actions/shows/get-shows-popular"
import { getShowsAiringToday } from "@/actions/shows/get-shows-airing-today"
import { getShowsTopRated } from "@/actions/shows/get-shows-top-rated"
import { BannerTrending } from "@/components/banner-trending/banner-trending"
import { CarouselShows } from "@/components/carousel-shows/carousel-shows"

export const revalidate = 3600

export default async function HomePage() {
  const [trending, popularMovies, inTheatres, popularShows, airingToday, topRatedShows] =
    await Promise.all([
      getMoviesTrending(),
      getMoviesPopular(),
      getMoviesInTheatres(),
      getShowsPopular(),
      getShowsAiringToday(),
      getShowsTopRated(),
    ])

  return (
    <main className="py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <BannerTrending movies={trending.data} />
      </div>

      <div className="mt-10 space-y-12">
        <CarouselShows
          title="Popular movies"
          shows={popularMovies.data}
          viewAllHref="/movie"
        />
        <CarouselShows
          title="In theatres"
          shows={inTheatres.data}
          viewAllHref="/movie"
        />
        <CarouselShows
          title="Popular TV shows"
          shows={popularShows.data}
          viewAllHref="/show"
        />
        <CarouselShows
          title="Airing today"
          shows={airingToday.data}
          viewAllHref="/show"
        />
        <CarouselShows
          title="Top rated TV shows"
          shows={topRatedShows.data}
          viewAllHref="/show"
        />
      </div>
    </main>
  )
}
