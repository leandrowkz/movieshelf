import React, { useContext, useEffect } from 'react'
import { Banner } from '../../components/Banner'
import { Page } from '../../components/Page'
import { ShowCarousel } from '../../components/ShowCarousel'
import { MovieListsContext } from '../../store/MovieListsContext'
import { TVShowListsContext } from '../../store/TVShowListsContext'
import styles from './styles.module.css'

export function Home() {
  const {
    family,
    trending,
    mostPopular,
    bestComedies,
    inTheatres,
    scifiAndFantasy,
    topRatedDocumentaries,
    isLoadingBestComedies,
    isLoadingFamily,
    isLoadingInTheatres,
    isLoadingMostPopular,
    isLoadingScifiAndFantasy,
    isLoadingTopRatedDocumentaries,
    isLoadingTrending,
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
    fetchInTheatres,
  } = useContext(MovieListsContext)

  const {
    airingToday,
    onTheAir,
    popular,
    topRated,
    isLoadingAiringToday,
    isLoadingOnTheAir,
    isLoadingPopular,
    isLoadingTopRated,
    fetchAiringToday,
    fetchOnTheAir,
    fetchPopular,
    fetchTopRated,
  } = useContext(TVShowListsContext)

  useEffect(() => {
    fetchMostPopular()
    fetchInTheatres()
    fetchTrending()
    fetchBestComedies()
    fetchScifiAndFantasy()
    fetchFamily()
    fetchTopRatedDocumentaries()

    fetchAiringToday()
    fetchOnTheAir()
    fetchTopRated()
    fetchPopular()
  }, [])

  return (
    <Page className={styles.home}>
      <Banner
        shows={trending}
        className={styles.banner}
        isLoading={isLoadingTrending}
        data-testid="banner"
      />
      <ShowCarousel
        title="Movies in theaters"
        shows={inTheatres}
        isLoading={isLoadingInTheatres}
        size="large"
        data-testid="carousel-in-theaters"
      />
      <ShowCarousel
        title="Popular movies"
        shows={mostPopular}
        isLoading={isLoadingMostPopular}
        data-testid="carousel-most-popular"
      />
      <ShowCarousel
        title="Best comedy movies"
        shows={bestComedies}
        isLoading={isLoadingBestComedies}
        data-testid="carousel-best-comedies"
      />
      <ShowCarousel
        title="Sci-Fi & fantasy movies"
        shows={scifiAndFantasy}
        isLoading={isLoadingScifiAndFantasy}
        data-testid="carousel-sci-fi-fantasy"
      />
      <ShowCarousel
        title="Family movies"
        shows={family}
        isLoading={isLoadingFamily}
        data-testid="carousel-family"
      />
      <ShowCarousel
        title="Top rated documentaries"
        shows={topRatedDocumentaries}
        isLoading={isLoadingTopRatedDocumentaries}
        data-testid="carousel-top-rated-documentaries"
      />
      <ShowCarousel
        title="TV shows airing today"
        size="large"
        type="tv"
        shows={airingToday}
        isLoading={isLoadingAiringToday}
        data-testid="carousel-tv-airing-today"
      />
      <ShowCarousel
        title="TV shows on the air"
        type="tv"
        shows={onTheAir}
        isLoading={isLoadingOnTheAir}
        data-testid="carousel-tv-on-the-air"
      />
      <ShowCarousel
        title="Popular TV shows"
        type="tv"
        shows={popular}
        isLoading={isLoadingPopular}
        data-testid="carousel-tv-popular"
      />
      <ShowCarousel
        title="Top rated TV shows"
        type="tv"
        shows={topRated}
        isLoading={isLoadingTopRated}
        data-testid="carousel-tv-popular"
      />
    </Page>
  )
}
