import React, { HTMLAttributes, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { Movie } from '../../types/Movie'
import classNames from 'classnames'
import { Button } from '../Button'
import { Link } from 'react-router-dom'
import { MovieHelper } from '../../services/MovieHelper'
import { Motion } from '../Motion'
import { Text } from '../Text'
import { useScreenSize } from '../../hooks/useScreenSize'

interface Props extends HTMLAttributes<HTMLElement> {
  shows: Movie[]
}

export function BannerPages({ shows, ...props }: Props) {
  const isMobile = useScreenSize('mobile')
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

  const headerLevel = isMobile ? 2 : 1
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
    <section {...props}>
      <div key={show.id} className={styles.slide} title={show.title}>
        <Motion className={styles.backdropImage}>
          <div style={{ backgroundImage: `url(${banner})` }} />
        </Motion>
        <div className={styles.info}>
          <Motion>
            <Heading
              title={show.title}
              level={headerLevel}
              className={styles.title}
            />
          </Motion>
          <div className={styles.controls}>
            <Motion className={styles.overview}>
              <Text>{show.overview}</Text>
            </Motion>
            <Link to={`/movies/${show.id}`} data-testid="show-link">
              <Button size="large">See more &nbsp;🎬</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.bullets} data-testid="bullets">
        {bullets}
      </div>
    </section>
  )
}
