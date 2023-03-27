import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { Movie } from 'src/types/Movie'
import classNames from 'classnames'
import { Button } from '../Button'
import { Link } from 'react-router-dom'
import { MovieHelper } from 'src/services/MovieHelper'
import { Motion } from '../Motion'

interface Props extends ComponentPropsWithoutRef<'section'> {
  shows: Movie[]
  isLoading?: boolean
}

export function BannerPages({ shows }: Props) {
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

  const banner = MovieHelper.getImageUrl(show.backdrop_path, 500)
  const countShows = shows.length

  const bullets = []
  for (let i = 0; i < countShows; i++) {
    const bulletClass = classNames(styles.bullet, {
      [`${styles.bulletActive}`]: i === currentSlide,
    })
    const bullet = (
      <div
        key={`bullet-${i}`}
        className={bulletClass}
        onClick={() => setCurrentSlide(i)}
      ></div>
    )

    bullets.push(bullet)
  }

  return (
    <>
      <div key={show.id} className={styles.slide} title={show.title}>
        <Motion className={styles.backdropImage}>
          <div style={{ backgroundImage: `url(${banner})` }} />
        </Motion>
        <div className={styles.info}>
          <Motion>
            <Heading title={show.title} level={1} className={styles.title} />
          </Motion>
          <div className={styles.controls}>
            <Motion className={styles.overview}>{show.overview}</Motion>
            <Link to={`/movies/${show.id}`}>
              <Button size="large">See more &nbsp;🎬</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.bullets}>{bullets}</div>
    </>
  )
}
