import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { Rating } from '../Rating'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ShowPoster } from '../ShowPoster'
import { Text } from '../Text'
import { ShowGenres } from '../ShowGenres'

interface Props extends ComponentPropsWithoutRef<'div'> {
  show: Movie
}

export function ShowItem({ show, className, ...props }: Props) {
  const classes = classNames(className, styles.container)

  return (
    <div className={classes} {...props}>
      <Link to={`/movies/${show.id}`}>
        <ShowPoster show={show} className={styles.poster} />
      </Link>
      <div className={styles.header}>
        <Text className={styles.title} isBold>
          {show.title}
        </Text>
        <Rating
          score={show.vote_average}
          className={styles.rating}
          size="small"
        />
      </div>
      <div className={styles.categories}>
        <ShowGenres show={show} size="small" />
      </div>
    </div>
  )
}
