import React, { useContext, useEffect } from 'react'
import { Banner } from 'src/components/Banner'
import { Page } from 'src/components/Page'
import { ShowCarousel } from 'src/components/ShowCarousel'
import { MovieListsContext } from 'src/store/MovieListsContext'
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
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
    fetchInTheatres,
  } = useContext(MovieListsContext)

  useEffect(() => {
    fetchMostPopular()
    fetchInTheatres()
    fetchTrending()
    fetchBestComedies()
    fetchScifiAndFantasy()
    fetchFamily()
    fetchTopRatedDocumentaries()
  }, [])

  return (
    <Page className={styles.home}>
      <Banner shows={trending} className={styles.banner} />
      <ShowCarousel
        title="In theaters"
        shows={inTheatres}
        itemsPerPage={3}
        isLoading={isLoadingInTheatres}
      />
      <ShowCarousel
        title="Most popular"
        shows={mostPopular}
        isLoading={isLoadingMostPopular}
      />
      <ShowCarousel
        title="Best comedies"
        shows={bestComedies}
        isLoading={isLoadingBestComedies}
      />
      <ShowCarousel
        title="Sci-Fi & fantasy"
        shows={scifiAndFantasy}
        isLoading={isLoadingScifiAndFantasy}
      />
      <ShowCarousel title="Family" shows={family} isLoading={isLoadingFamily} />
      <ShowCarousel
        title="Top rated documentaries"
        shows={topRatedDocumentaries}
        isLoading={isLoadingTopRatedDocumentaries}
      />
    </Page>
  )
}
