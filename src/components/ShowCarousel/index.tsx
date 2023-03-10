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
  itemsPerPage?: number
}

export function ShowCarousel({
  shows,
  title,
  className,
  itemsPerPage = Number(process.env.REACT_APP_SHOW_CAROUSEL_ITEMS_PER_PAGE) ||
    5,
}: Props) {
  if (!shows.length) {
    return <></>
  }

  const header = (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
    </div>
  )

  const pagesCount = Math.floor(shows.length / itemsPerPage)
  const pagesList: Movie[][] = []

  for (let page = 1; page <= pagesCount; page++) {
    pagesList.push(shows.slice((page - 1) * itemsPerPage, page * itemsPerPage))
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
