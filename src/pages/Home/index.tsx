import React, { useCallback, useContext, useEffect } from 'react'
import { Banner } from 'src/components/Banner'
import { Header } from 'src/components/Header'
import { Page } from 'src/components/Page'
import { ShowList } from 'src/components/ShowList'
import { MovieContext } from 'src/store/MovieContext'

export function Home () {
  // const shows = require('../../services/movies.json')
  const {
    trending,
    mostPopular,
    fetchTrending,
    fetchMostPopular,
  } = useContext(MovieContext)

  useEffect(() => {
    fetchMostPopular()
    fetchTrending()
  }, [fetchMostPopular, fetchTrending])

  return (
    <Page>
      <Header />
      <Banner shows={trending} />
      <ShowList title="Most popular" shows={mostPopular} />
    </Page>
  )
}
