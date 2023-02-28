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
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
  } = useContext(MovieContext)

  useEffect(() => {
    fetchMostPopular()
    fetchTrending()
    fetchBestComedies()
  }, [fetchMostPopular, fetchTrending, fetchBestComedies])

  return (
    <Page>
      <Header />
      <Banner shows={trending} />
      <ShowCarousel title="Most popular" shows={mostPopular} />
      <ShowCarousel title="Best comedies" shows={bestComedies} />
    </Page>
  )
}
