import React from 'react'
import styles from './styles.module.css'
import { Loader, Rectangle } from '../Loader'
import { Motion } from '../Motion'
import classNames from 'classnames'
import { useScreenSize } from 'src/hooks/useScreenSize'

export function ShowListLoader() {
  const content = []
  const isMobile = useScreenSize('mobile')
  const classes = classNames(styles.container, {
    [styles.mobile]: isMobile,
  })

  for (let i = 0; i < 12; i++) {
    content.push(
      <Loader className={styles.loaderItem} key={`loader-${i * Math.random()}`}>
        <Rectangle className={styles.loaderPoster} />
        <Rectangle className={styles.loaderTitle} />
        <Rectangle className={styles.loaderRating} />
      </Loader>
    )
  }

  return (
    <section className={classes}>
      <Motion className={styles.list}>{content}</Motion>
    </section>
  )
}
