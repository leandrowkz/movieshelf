import React, { type HTMLAttributes } from 'react'
import styles from './styles.module.css'
import { Loader, Paragraph, Rectangle } from '../Loader'
import { Motion } from '../Motion'

export function TVEpisodeListLoader(props: HTMLAttributes<HTMLDivElement>) {
  const content = []

  for (let i = 0; i < 10; i++) {
    content.push(
      <Loader className={styles.loaderItem} key={`loader-${i * Math.random()}`}>
        <Rectangle className={styles.loaderImage} />
        <Rectangle className={styles.loaderTitle} />
        <Paragraph className={styles.loaderOverview} lines={1} />
        <Rectangle className={styles.loaderMetadata} width="40%" />
      </Loader>
    )
  }

  return (
    <Motion className={styles.loaderList} {...props}>
      {content}
    </Motion>
  )
}
