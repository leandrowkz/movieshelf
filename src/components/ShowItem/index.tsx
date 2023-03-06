import React, { BaseSyntheticEvent, ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { Heading } from '../Heading'
import { Rating } from '../Rating'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { MovieHelper } from 'src/services/MovieHelper'

interface Props extends ComponentPropsWithoutRef<'div'> {
  show: Movie
}

export function ShowItem({ show, className }: Props) {
  const classes = classNames(className, styles.container)
  const poster = MovieHelper.getImageUrl(show.poster_path, 300)

  const hideBrokenImage = (event: BaseSyntheticEvent) => {
    const { target } = event

    if (target) {
      target.style.display = 'none'
    }
  }

  return (
    <div className={classes}>
      <Link to={`/movies/${show.id}`}>
        <div className={styles.poster}>
          <img src={poster} alt={show.title} onError={hideBrokenImage} />
        </div>
      </Link>
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
