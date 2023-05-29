import React from 'react'
import styles from './styles.module.css'
import { Loader, Rectangle } from '../Loader'
import { Motion } from '../Motion'

export function ShowCarouselLoader() {
  const content = []

  for (let i = 0; i < 20; i++) {
    content.push(
      <Loader className={styles.loaderItem} key={`loader-${i * Math.random()}`}>
        <Rectangle className={styles.loaderPoster} />
        <Rectangle className={styles.loaderTitle} />
        <Rectangle className={styles.loaderRating} />
      </Loader>
    )
  }

  return <Motion className={styles.loaderCarousel}>{content}</Motion>
}
