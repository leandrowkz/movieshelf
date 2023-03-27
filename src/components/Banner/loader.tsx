import React from 'react'
import styles from './styles.module.css'
import { Loader } from '../Loader'

export function BannerLoader() {
  return (
    <div>
      <Loader className={styles.loaderBanner} />
      <div className={styles.bullets}>
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
        <Loader className={styles.loaderBullet} />
      </div>
    </div>
  )
}
