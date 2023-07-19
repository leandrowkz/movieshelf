import React, { type HTMLAttributes } from 'react'
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
  isSoftLoading?: boolean
  size?: 'large' | 'medium' | 'small'
  genreId?: number
}

export function ShowCarousel({
  shows,
  title,
  className,
  isLoading = false,
  isSoftLoading = false,
  size = 'medium',
  genreId,
  ...props
}: Props) {
  const isTablet = useScreenSize('tablet')
  const isMobile = useScreenSize('mobile')

  if ((!shows || !shows.length) && !isLoading) {
    return <></>
  }

  const classes = classNames(styles.carousel, className, {
    [styles.smallDevices]: isTablet || isMobile,
  })
  const showClass = classNames(styles.show)

  if (isLoading) {
    return (
      <div className={classes}>
        <Header title={title} genreId={genreId} shows={shows} />
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
              show={show}
              size={size}
              isSoftLoading={isSoftLoading}
              className={showClass}
            />
          ))}
        </Motion>
      ))}
    </div>
  )

  return (
    <div className={classes} {...props}>
      <Header title={title} genreId={genreId} shows={shows} />
      {pages}
    </div>
  )
}

type HeaderProps = {
  title: string
  shows: MovieItem[] | TVShowItem[]
  genreId?: number
}

function Header({ title, shows, genreId }: HeaderProps) {
  const type = shows[0]?.media_type
  const path = type === 'movie' ? '/movies/category' : '/tv/category'

  return (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
      {genreId && (
        <Link to={`${path}/${genreId}`} className={styles.link}>
          View all ➡️
        </Link>
      )}
    </div>
  )
}
