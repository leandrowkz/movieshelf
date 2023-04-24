import React from 'react'
import styles from './styles.module.css'
import { Circle, Loader, Paragraph, Rectangle } from '../../components/Loader'
import { Motion } from 'src/components/Motion'

export function LoaderDetails() {
  return (
    <Motion tag="section" className={styles.content}>
      <Loader className={styles.loaderTitle}>
        <Rectangle width="50%" />
        <Rectangle width="10%" />
        <Rectangle width="20%" />
      </Loader>
      <Loader className={styles.loaderMetadata}>
        <Rectangle width="5%" height="1rem" />
        <Rectangle width="15%" height="1rem" />
        <Rectangle width="40%" height="1rem" />
        <Rectangle width="10%" height="1rem" />
      </Loader>
      <Loader className={styles.loaderOverview}>
        <Paragraph lines={5} />
      </Loader>
    </Motion>
  )
}

export function LoaderCast() {
  const cast = []

  for (let i = 0; i < 4; i++) {
    cast.push(
      <Loader
        className={styles.loaderCastPerson}
        key={`loader-cast-${i * Math.random()}`}
      >
        <Circle width={52} />
        <Rectangle className={styles.loaderCastName} />
      </Loader>
    )
  }

  return (
    <Motion tag="section" className={styles.cast}>
      {cast}
    </Motion>
  )
}

export function LoaderActions() {
  return (
    <Loader className={styles.buttons}>
      <Rectangle className={styles.loaderAction} />
      <Rectangle className={styles.loaderAction} />
    </Loader>
  )
}

export function LoaderPoster() {
  return (
    <Loader className={styles.poster}>
      <Rectangle className={styles.loaderPoster} />
    </Loader>
  )
}
