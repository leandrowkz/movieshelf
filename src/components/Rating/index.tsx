import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends ComponentPropsWithoutRef<'div'> {
  score: number
}

export function Rating({ score, className }: Props) {
  const classes = classNames(className, styles.rating)

  return (
    <div className={classes}>
      ★ {score.toFixed(1)}
    </div>
  )
}
