import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'
import classNames from 'classnames'
import { LoaderShowCarousel } from '../LoaderShowCarousel'
import { Motion } from '../Motion'

interface Props extends ComponentPropsWithoutRef<'div'> {
  shows: Movie[]
  title: string
  showViewAll?: boolean
  itemsPerPage?: number
  isLoading?: boolean
}

export function ShowCarousel({
  shows,
  title,
  className,
  isLoading = false,
  itemsPerPage = Number(process.env.REACT_APP_SHOW_CAROUSEL_ITEMS_PER_PAGE) ||
    5,
}: Props) {
  if (!shows.length && !isLoading) {
    return <></>
  }

  const classes = classNames(styles.carousel, className)

  const header = (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
    </div>
  )

  if (isLoading) {
    return (
      <div className={classes}>
        {header}
        <Motion>
          <LoaderShowCarousel />
        </Motion>
      </div>
    )
  }

  const pagesCount = Math.floor(shows.length / itemsPerPage)
  const pagesList: Movie[][] = []

  const vwAdjustMap = {
    default: 3,
    1: 15,
    2: 10,
    3: 6,
    4: 5,
    5: 5,
    6: 1,
    8: 0.01,
    10: 3,
  }
  const vwAdjust =
    vwAdjustMap[itemsPerPage as keyof typeof vwAdjustMap] || vwAdjustMap.default
  const itemWidth = 100 / itemsPerPage - vwAdjust

  for (let page = 1; page <= pagesCount; page++) {
    pagesList.push(shows.slice((page - 1) * itemsPerPage, page * itemsPerPage))
  }

  const pages = (
    <div className={styles.pages}>
      {pagesList.map((page, key) => (
        <Motion className={styles.page} key={key}>
          {page.map((show) => (
            <ShowItem
              key={show.id}
              show={show}
              className={styles.show}
              style={{ width: `${itemWidth}vw` }}
            />
          ))}
        </Motion>
      ))}
    </div>
  )

  return (
    <div className={classes}>
      {header}
      {pages}
    </div>
  )
}
