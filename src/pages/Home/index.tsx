import React, { useContext, useEffect } from 'react'
import { Banner } from 'src/components/Banner'
import { Header } from 'src/components/Header'
import { Page } from 'src/components/Page'
import { ShowCarousel } from 'src/components/ShowCarousel'
import { MovieContext } from 'src/store/MovieContext'

export function Home () {
  // const shows = require('../../services/movies.json')
  const {
    family,
    trending,
    mostPopular,
    bestComedies,
    scifiAndFantasy,
    topRatedDocumentaries,
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
  } = useContext(MovieContext)

  useEffect(() => {
    fetchMostPopular()
    fetchTrending()
    fetchBestComedies()
    fetchScifiAndFantasy()
    fetchFamily()
    fetchTopRatedDocumentaries()
  }, [
    fetchMostPopular,
    fetchTrending,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
  ])

  return (
    <Page>
      <Header />
      <Banner shows={trending} />
      <ShowCarousel title="Most popular" shows={mostPopular} />
      <ShowCarousel title="Best comedies" shows={bestComedies} />
      <ShowCarousel title="Sci-Fi & fantasy" shows={scifiAndFantasy} />
      <ShowCarousel title="Family" shows={family} />
      <ShowCarousel title="Top rated documentaries" shows={topRatedDocumentaries} />
    </Page>
  )
}
