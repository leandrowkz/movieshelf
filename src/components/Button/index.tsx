import React, { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends PropsWithChildren {
  size?: 'small' | 'medium' | 'large'
  pill?: boolean
}

export function Button({ children, pill = false, size = 'medium' }: Props) {
  const classes = classNames(styles.button, {
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.pill]: pill,
  })

  return <button className={classes}>{children}</button>
}
