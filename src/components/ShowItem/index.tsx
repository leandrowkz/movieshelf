import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { Rating } from '../Rating'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ShowPoster } from '../ShowPoster'
import { ShowGenres } from '../ShowGenres'
import { Heading } from '../Heading'

interface Props extends ComponentPropsWithoutRef<'div'> {
  show: Movie
}

export function ShowItem({ show, className, ...props }: Props) {
  const classes = classNames(className, styles.container)

  return (
    <div className={classes} {...props}>
      <Link to={`/movies/${show.id}`} data-testid="show-poster-link">
        <ShowPoster show={show} className={styles.poster} />
      </Link>
      <div className={styles.header}>
        <Heading
          level={3}
          title={show.title}
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
