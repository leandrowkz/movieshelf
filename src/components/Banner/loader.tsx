import React, { HTMLAttributes } from 'react'
import styles from './styles.module.css'
import { Circle, Loader, Rectangle } from '../Loader'
import { Motion } from '../Motion'

export function BannerLoader(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Motion {...props}>
      <Loader>
        <Rectangle className={styles.loaderBannerPage} />
      </Loader>
      <Loader className={styles.bullets}>
        <Circle width={20} />
        <Circle width={20} />
        <Circle width={20} />
        <Circle width={20} />
        <Circle width={20} />
        <Circle width={20} />
        <Circle width={20} />
      </Loader>
    </Motion>
  )
}
