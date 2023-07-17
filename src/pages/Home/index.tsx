import React, { useContext, useEffect } from 'react'
import { Banner } from '../../components/Banner'
import { Page } from '../../components/Page'
import { ShowCarousel } from '../../components/ShowCarousel'
import { MovieListsContext } from '../../context/MovieListsContext'
import { TVShowListsContext } from '../../context/TVShowListsContext'
import styles from './styles.module.css'

export function Home() {
  const {
    trending,
    popular: moviesPopular,
    inTheatres,
    bestFamily,
    bestComedies,
    bestDocumentaries,
    bestScifiAndFantasy,
    fetchPopular: fetchMoviesPopular,
    fetchTrending,
    fetchInTheatres,
    fetchBestComedies,
    fetchBestScifiAndFantasy,
    fetchBestFamily,
    fetchBestDocumentaries,
  } = useContext(MovieListsContext)

  const {
    airingToday,
    onTheAir,
    popular: tvShowsPopular,
    topRated,
    fetchAiringToday,
    fetchOnTheAir,
    fetchPopular: fetchTVShowsPopular,
    fetchTopRated,
  } = useContext(TVShowListsContext)

  useEffect(() => {
    fetchMoviesPopular()
    fetchInTheatres()
    fetchTrending()
    fetchBestFamily()
    fetchBestComedies()
    fetchBestDocumentaries()
    fetchBestScifiAndFantasy()

    fetchAiringToday()
    fetchOnTheAir()
    fetchTopRated()
    fetchTVShowsPopular()
  }, [])

  return (
    <Page className={styles.home}>
      <Banner
        shows={trending.data}
        className={styles.banner}
        isLoading={trending.isLoading}
        data-testid="banner"
      />
      <ShowCarousel
        title="Movies in theaters"
        shows={inTheatres.data}
        isLoading={inTheatres.isLoading}
        size="large"
        data-testid="carousel-in-theaters"
      />
      <ShowCarousel
        title="Popular movies"
        shows={moviesPopular.data}
        isLoading={moviesPopular.isLoading}
        data-testid="carousel-most-popular"
      />
      <ShowCarousel
        title="Best comedy movies"
        shows={bestComedies.data}
        isLoading={bestComedies.isLoading}
        data-testid="carousel-best-comedies"
      />
      <ShowCarousel
        title="Sci-Fi & fantasy movies"
        shows={bestScifiAndFantasy.data}
        isLoading={bestScifiAndFantasy.isLoading}
        data-testid="carousel-sci-fi-fantasy"
      />
      <ShowCarousel
        title="Family movies"
        shows={bestFamily.data}
        isLoading={bestFamily.isLoading}
        data-testid="carousel-family"
      />
      <ShowCarousel
        title="Top rated documentaries"
        shows={bestDocumentaries.data}
        isLoading={bestDocumentaries.isLoading}
        data-testid="carousel-top-rated-documentaries"
      />
      <ShowCarousel
        title="TV shows airing today"
        size="large"
        shows={airingToday.data}
        isLoading={airingToday.isLoading}
        data-testid="carousel-tv-airing-today"
      />
      <ShowCarousel
        title="TV shows on the air"
        shows={onTheAir.data}
        isLoading={onTheAir.isLoading}
        data-testid="carousel-tv-on-the-air"
      />
      <ShowCarousel
        title="Popular TV shows"
        shows={tvShowsPopular.data}
        isLoading={tvShowsPopular.isLoading}
        data-testid="carousel-tv-popular"
      />
      <ShowCarousel
        title="Top rated TV shows"
        shows={topRated.data}
        isLoading={topRated.isLoading}
        data-testid="carousel-tv-top-rated"
      />
    </Page>
  )
}
