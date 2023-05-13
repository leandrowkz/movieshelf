import React, { HTMLAttributes } from 'react'
import styles from './styles.module.css'
import { Movie } from '../../types/Movie'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'
import classNames from 'classnames'
import { Motion } from '../Motion'
import { ShowCarouselLoader } from './loader'

interface Props extends HTMLAttributes<HTMLDivElement> {
  shows: Movie[]
  title: string
  isLoading?: boolean
  size?: 'large' | 'medium' | 'small'
}

export function ShowCarousel({
  shows,
  title,
  className,
  isLoading = false,
  size = 'medium',
  ...props
}: Props) {
  if (!shows.length && !isLoading) {
    return <></>
  }

  const classes = classNames(styles.carousel, className)
  const showClass = classNames(styles.show, {
    [styles.large]: size === 'large',
    [styles.small]: size === 'small',
  })

  const header = (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
    </div>
  )

  if (isLoading) {
    return (
      <div className={classes}>
        {header}
        <Motion data-testid="loader">
          <ShowCarouselLoader />
        </Motion>
      </div>
    )
  }
  const itemsPerPage = 1
  const pagesCount = Math.floor(shows.length / itemsPerPage)
  const pagesList: Movie[][] = []

  // const vwAdjustMap = {
  //   default: 3,
  //   1: 15,
  //   2: 10,
  //   3: 6,
  //   4: 5,
  //   5: 5,
  //   6: 1,
  //   8: 0.01,
  //   10: 3,
  // }
  // const vwAdjust =
  //   vwAdjustMap[itemsPerPage as keyof typeof vwAdjustMap] || vwAdjustMap.default
  // const itemWidth = 100 / itemsPerPage - vwAdjust

  for (let page = 1; page <= pagesCount; page++) {
    pagesList.push(shows.slice((page - 1) * itemsPerPage, page * itemsPerPage))
  }

  const pages = (
    <div className={styles.pages}>
      {pagesList.map((page, key) => (
        <Motion className={styles.page} key={key}>
          {page.map((show) => (
            <ShowItem key={show.id} show={show} className={showClass} />
          ))}
        </Motion>
      ))}
    </div>
  )

  return (
    <div className={classes} {...props}>
      {header}
      {pages}
    </div>
  )
}
