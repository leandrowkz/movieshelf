import React, { useContext, useEffect } from 'react'
import { Banner } from 'src/components/Banner'
import { Page } from 'src/components/Page'
import { ShowCarousel } from 'src/components/ShowCarousel'
import { MovieContext } from 'src/store/MovieContext'
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
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
    fetchInTheatres,
  } = useContext(MovieContext)

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
      <ShowCarousel title="In theaters" shows={inTheatres} itemsPerPage={3} />
      <ShowCarousel title="Most popular" shows={mostPopular} />
      <ShowCarousel title="Best comedies" shows={bestComedies} />
      <ShowCarousel title="Sci-Fi & fantasy" shows={scifiAndFantasy} />
      <ShowCarousel title="Family" shows={family} />
      <ShowCarousel
        title="Top rated documentaries"
        shows={topRatedDocumentaries}
      />
    </Page>
  )
}
