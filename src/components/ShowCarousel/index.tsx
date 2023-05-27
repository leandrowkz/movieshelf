import React, { HTMLAttributes } from 'react'
import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'
import classNames from 'classnames'
import { Motion } from '../Motion'
import { ShowCarouselLoader } from './loader'
import { Link } from 'react-router-dom'
import { useScreenSize } from 'src/hooks/useScreenSize'

interface Props extends HTMLAttributes<HTMLDivElement> {
  shows: MovieItem[] | TVShowItem[]
  title: string
  isLoading?: boolean
  size?: 'large' | 'medium' | 'small'
  type?: 'movie' | 'tv'
  genreId?: number
}

export function ShowCarousel({
  shows,
  title,
  className,
  isLoading = false,
  size = 'medium',
  type,
  genreId,
  ...props
}: Props) {
  const isTablet = useScreenSize('tablet')
  const isMobile = useScreenSize('mobile')

  if (!shows.length && !isLoading) {
    return <></>
  }

  const classes = classNames(styles.carousel, className, {
    [styles.smallDevices]: isTablet || isMobile,
  })
  const showClass = classNames(styles.show)

  if (isLoading) {
    return (
      <div className={classes}>
        <Header title={title} genreId={genreId} />
        <Motion data-testid="loader">
          <ShowCarouselLoader />
        </Motion>
      </div>
    )
  }
  const itemsPerPage = 1
  const pagesCount = Math.floor(shows.length / itemsPerPage)
  const pagesList: (MovieItem[] | TVShowItem[])[] = []

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
              type={type}
              show={show}
              className={showClass}
              size={size}
            />
          ))}
        </Motion>
      ))}
    </div>
  )

  return (
    <div className={classes} {...props}>
      <Header title={title} genreId={genreId} />
      {pages}
    </div>
  )
}

type HeaderProps = {
  title: string
  genreId?: number
}

function Header({ title, genreId }: HeaderProps) {
  return (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
      {genreId && (
        <Link to={`/movies/category/${genreId}`} className={styles.link}>
          View all ➡️
        </Link>
      )}
    </div>
  )
}
