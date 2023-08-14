import React, { type HTMLAttributes } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { Loader, Rectangle } from '../Loader'
import { Motion } from '../Motion'

export function ShowProvidersLoader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const classes = classNames(styles.items, className)

  return (
    <Motion {...props} className={classes}>
      <Loader className={styles.item}>
        <Rectangle className={styles.logo} height={80} width={80} />
        <Rectangle width={70} />
      </Loader>
      <Loader className={styles.item}>
        <Rectangle className={styles.logo} height={80} width={80} />
        <Rectangle width={70} />
      </Loader>
      <Loader className={styles.item}>
        <Rectangle className={styles.logo} height={80} width={80} />
        <Rectangle width={70} />
      </Loader>
      <Loader className={styles.item}>
        <Rectangle className={styles.logo} height={80} width={80} />
        <Rectangle width={70} />
      </Loader>
      <Loader className={styles.item}>
        <Rectangle className={styles.logo} height={80} width={80} />
        <Rectangle width={70} />
      </Loader>
      <Loader className={styles.item}>
        <Rectangle className={styles.logo} height={80} width={80} />
        <Rectangle width={70} />
      </Loader>
    </Motion>
  )
}
