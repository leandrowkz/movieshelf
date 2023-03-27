import React from 'react'
import styles from './styles.module.css'
import { Loader } from '../../components/Loader'
import { Motion } from 'src/components/Motion'

export function LoaderDetails() {
  return (
    <Motion tag="section" className={styles.content}>
      <div className={styles.loaderTitleContainer}>
        <Loader className={styles.loaderTitle} />
        <Loader className={styles.loaderTitle} />
        <Loader className={styles.loaderTitle} />
      </div>
      <div className={styles.metadata}>
        <Loader className={styles.loaderRating} />
        <Loader className={styles.loaderRuntime} />
        <Loader className={styles.loaderGenres} />
        <Loader className={styles.loaderYear} />
      </div>
      <div className={styles.overview}>
        <Loader className={styles.loaderOverview} />
        <Loader className={styles.loaderOverview} />
        <Loader className={styles.loaderOverview} />
        <Loader className={styles.loaderOverview} />
      </div>
    </Motion>
  )
}

export function LoaderCast() {
  return (
    <Motion tag="section" className={styles.cast}>
      <div className={styles.loaderCastPerson}>
        <Loader className={styles.loaderCastAvatar} />
        <Loader className={styles.loaderCastName} />
      </div>
      <div className={styles.loaderCastPerson}>
        <Loader className={styles.loaderCastAvatar} />
        <Loader className={styles.loaderCastName} />
      </div>
      <div className={styles.loaderCastPerson}>
        <Loader className={styles.loaderCastAvatar} />
        <Loader className={styles.loaderCastName} />
      </div>
      <div className={styles.loaderCastPerson}>
        <Loader className={styles.loaderCastAvatar} />
        <Loader className={styles.loaderCastName} />
      </div>
      <div className={styles.loaderCastPerson}>
        <Loader className={styles.loaderCastAvatar} />
        <Loader className={styles.loaderCastName} />
      </div>
    </Motion>
  )
}

export function LoaderActions() {
  return (
    <Motion tag="section" className={styles.buttons}>
      <Loader className={styles.loaderAction} />
      <Loader className={styles.loaderAction} />
    </Motion>
  )
}

export function LoaderPoster() {
  return (
    <Motion tag="section" className={styles.poster}>
      <Loader className={styles.loaderPoster} />
    </Motion>
  )
}
