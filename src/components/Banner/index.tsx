import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { Movie } from 'src/types/Movie'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface Props extends ComponentPropsWithoutRef<'section'> {
  shows: Movie[],
}

export function Banner({ shows, className }: Props) {
  const classes = classNames(className, styles.container)

  return (
    <section className={classes}>
      <div className={styles.heading}>
        <Heading title="Recommended&nbsp;" level={1} />
        <Heading title="to you" level={1} isThin />
      </div>
      {shows.map(show => {
        const poster = `https://image.tmdb.org/t/p/w500/${show.backdrop_path}`

        return (
          <div className={styles.slide}>
            <div className={styles.poster}>
              <img src={poster} alt={show.title}  />
            </div>
            <div className={styles.controls}>
              <Heading title={show.title} level={1} className={styles.title} />
              <div className={styles.overview}>{show.overview}</div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
