import React, { type ComponentPropsWithoutRef } from 'react'
import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Rating } from '../Rating'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ShowPoster } from '../ShowPoster'
import { ShowGenres } from '../ShowGenres'
import { Heading } from '../Heading'
import { useHelpers } from 'src/hooks/useHelpers'
import type { ShowType } from 'src/types'

interface Props extends ComponentPropsWithoutRef<'div'> {
  show: MovieItem | TVShowItem
  size?: 'small' | 'medium' | 'large'
  type?: ShowType
  isSoftLoading?: boolean
}

export function ShowItem({
  show,
  size = 'medium',
  type = 'movie',
  isSoftLoading = false,
  className,
  ...props
}: Props) {
  const { getShowTitle } = useHelpers()
  const classes = classNames(className, styles.item, {
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',
    [styles.softLoading]: isSoftLoading,
  })

  const path = type === 'movie' ? '/movies' : '/tv'

  return (
    <div className={classes} {...props}>
      <Link to={`${path}/${show.id}`} data-testid="show-poster-link">
        <ShowPoster show={show} className={styles.poster} />
      </Link>
      <div className={styles.header}>
        <Heading
          level={3}
          title={getShowTitle(show)}
          className={styles.title}
          data-testid="show-title"
        />
        <Rating
          score={show.vote_average}
          className={styles.rating}
          size="small"
          data-testid="show-rating"
        />
      </div>
      <div className={styles.categories}>
        <ShowGenres show={show} size="small" data-testid="show-categories" />
      </div>
    </div>
  )
}
