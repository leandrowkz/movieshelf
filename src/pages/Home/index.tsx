import React from 'react'
import { Banner } from 'src/components/Banner'
import { Header } from 'src/components/Header'
import { Page } from 'src/components/Page'
import { ShowList } from 'src/components/ShowList'

export function Home () {
  const movie = require('../../services/movie.json')
  return (
    <Page>
      <Header />
      <Banner />
      <ShowList title="Most popular" shows={[movie,movie,movie,movie,movie,movie,movie,]} />
    </Page>
  )
}
