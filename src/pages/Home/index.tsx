import React from 'react'
import { Banner } from 'src/components/Banner'
import { Header } from 'src/components/Header'
import { Page } from 'src/components/Page'
import { ShowList } from 'src/components/ShowList'

export function Home () {
  const shows = require('../../services/movies.json')

  return (
    <Page>
      <Header />
      <Banner shows={shows} />
      <ShowList title="Most popular" shows={shows} />
    </Page>
  )
}
