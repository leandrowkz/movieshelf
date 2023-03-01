import React, { useContext, useEffect } from 'react'
import { Banner } from 'src/components/Banner'
import { Header } from 'src/components/Header'
import { Page } from 'src/components/Page'
import { ShowCarousel } from 'src/components/ShowCarousel'
import { MovieContext } from 'src/store/MovieContext'

export function Home () {
  // const shows = require('../../services/movies.json')
  const {
    trending,
    mostPopular,
    bestComedies,
    scifiAndFantasy,
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
  } = useContext(MovieContext)

  useEffect(() => {
    fetchMostPopular()
    fetchTrending()
    fetchBestComedies()
    fetchScifiAndFantasy()
  }, [fetchMostPopular, fetchTrending, fetchBestComedies, fetchScifiAndFantasy])

  return (
    <Page>
      <Header />
      <Banner shows={trending} />
      <ShowCarousel title="Most popular" shows={mostPopular} />
      <ShowCarousel title="Best comedies" shows={bestComedies} />
      <ShowCarousel title="Sci-Fi & Fantasy" shows={scifiAndFantasy} />
    </Page>
  )
}
