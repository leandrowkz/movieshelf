import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { Heading } from '../Heading'
import { Rating } from '../Rating'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface Props extends ComponentPropsWithoutRef<'div'> {
  show: Movie
}

export function ShowItem({ show, className }: Props) {
  const classes = classNames(className, styles.container)
  const poster = `https://image.tmdb.org/t/p/w300/${show.poster_path}`

  return (
    <div className={classes}>
      <div className={styles.poster}>
        <Link to={`/movies/${show.id}`}>
          <img src={poster} alt={show.title} />
        </Link>
      </div>
      <div className={styles.header}>
        <Heading title={show.title} level={3} className={styles.title} />
        <Rating score={show.vote_average} className={styles.rating} />
      </div>
      <div className={styles.categories}>
        {show.genres?.map((genre, index) => (
          <span className={styles.category}>
            {index > 0 ? <span>&nbsp;/&nbsp;</span> : ''}
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  )
}
