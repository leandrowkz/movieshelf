import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'
import classNames from 'classnames'

interface Props extends ComponentPropsWithoutRef<'div'> {
  shows: Movie[]
  title: string
  showViewAll?: boolean
}

export function ShowCarousel({ shows, title, className }: Props) {
  const ITEMS_PER_PAGE = 4

  if (!shows.length) {
    return <></>
  }

  const header = (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
    </div>
  )

  const pagesCount = Math.floor(shows.length / ITEMS_PER_PAGE)
  const pagesList: Movie[][] = []

  for (let page = 1; page <= pagesCount; page++) {
    pagesList.push(
      shows.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    )
  }

  const pages = (
    <div className={styles.pages}>
      {pagesList.map((page, key) => (
        <div className={styles.page} key={key}>
          {page.map((show) => (
            <ShowItem key={show.id} show={show} className={styles.show} />
          ))}
        </div>
      ))}
    </div>
  )

  const classes = classNames(styles.carousel, className)

  return (
    <div className={classes}>
      {header}
      {pages}
    </div>
  )
}
