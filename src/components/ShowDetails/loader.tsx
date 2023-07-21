import React from 'react'
import styles from './styles.module.css'
import { Circle, Loader, Paragraph, Rectangle } from '../../components/Loader'
import { Motion } from '../../components/Motion'
import { useScreenSize } from 'src/hooks/useScreenSize'

export function LoaderDetails() {
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')
  const isSmallDevice = isMobile || isTablet

  return (
    <Motion tag="section" className={styles.details}>
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
        <Paragraph lines={5} isJustified={isSmallDevice} />
      </Loader>
    </Motion>
  )
}

export function LoaderCast() {
  const cast = []

  for (let i = 0; i < 4; i++) {
    cast.push(
      <Loader
        className={styles.loaderCastItem}
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
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')
  const isSmallDevice = isMobile || isTablet

  return (
    <div className={styles.actions}>
      <Loader className={styles.leftActions}>
        <Rectangle className={styles.loaderAction} />
        {!isSmallDevice && <Rectangle className={styles.loaderAction} />}
      </Loader>
      <Loader className={styles.rightActions}>
        <Circle width={52} />
        <Rectangle
          width={150}
          height={52}
          className={styles.loaderActionPill}
        />
      </Loader>
    </div>
  )
}

export function LoaderPoster() {
  return (
    <Loader className={styles.poster}>
      <Rectangle className={styles.loaderPoster} />
    </Loader>
  )
}
