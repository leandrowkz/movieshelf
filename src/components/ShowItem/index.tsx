import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { Rating } from '../Rating'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ShowPoster } from '../ShowPoster'
import { Text } from '../Text'

interface Props extends ComponentPropsWithoutRef<'div'> {
  show: Movie
}

export function ShowItem({ show, className }: Props) {
  const classes = classNames(className, styles.container)

  return (
    <div className={classes}>
      <Link to={`/movies/${show.id}`}>
        <ShowPoster show={show} />
      </Link>
      <div className={styles.header}>
        <Text className={styles.title}>{show.title}</Text>
        <Rating
          score={show.vote_average}
          className={styles.rating}
          size="small"
        />
      </div>
      <div className={styles.categories}>
        {show.genres?.map((genre, index) => (
          <span key={index} className={styles.category}>
            {index > 0 ? <span>&nbsp;/&nbsp;</span> : ''}
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  )
}
