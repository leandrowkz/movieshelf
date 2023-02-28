import React from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'

type Props = {
  shows: Movie[],
  title: string,
  showViewAll?: boolean,
}

export function ShowCarousel({ shows, title }: Props) {
  const ITEMS_PER_PAGE = 4;

  const header = (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
    </div>
  )

  const pagesCount = Math.floor(shows.length / ITEMS_PER_PAGE)
  const pagesList: Movie[][] = []

  for (let i = 0; i < shows.length; i += pagesCount) {
    pagesList.push(shows.slice(i, i + pagesCount))
  }

  const pages = (
    <div className={styles.pages}>
    {
      pagesList.map((page, key) => (
        <div className={styles.page} key={key}>
          {page.map(show => (<ShowItem key={show.id} show={show} className={styles.show} />))}
        </div>
      ))
    }
    </div>
  )

  return (
    <div className={styles.carousel}>
      {header}
      {pages}
    </div>
  )
}
