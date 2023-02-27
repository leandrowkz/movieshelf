import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { Movie } from 'src/types/Movie'
import classNames from 'classnames'

interface Props extends ComponentPropsWithoutRef<'section'> {
  shows: Movie[],
}

export function Banner({ shows, className }: Props) {
  const classes = classNames(className, styles.container)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      let current = currentSlide + 1

      if (current >= shows.length) {
        current = 0
      }

      setCurrentSlide(current)
    }, 5000)

    return () => clearInterval(interval)
  })

  const show = shows.find((_show, index: number) => index === currentSlide)

  if (!show) {
    return <></>
  }

  console.log(show, shows)
  const poster = `https://image.tmdb.org/t/p/w500/${show.backdrop_path}`

  return (
    <section className={classes}>
      <div className={styles.heading}>
        <Heading title="Trending&nbsp;" level={1} />
        <Heading title="now" level={1} isThin />
      </div>
      <div key={show.id} className={styles.slide}>
        <div className={styles.poster}>
          <img src={poster} alt={show.title}  />
        </div>
        <div className={styles.controls}>
          <Heading title={show.title} level={1} className={styles.title} />
          <div className={styles.overview}>{show.overview}</div>
        </div>
      </div>
    </section>
  )
}
