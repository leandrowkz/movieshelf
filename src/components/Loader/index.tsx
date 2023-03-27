import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

export function Loader({ className }: ComponentPropsWithoutRef<'div'>) {
  const classes = classNames(styles.loader, className)

  return <div className={classes} />
}
