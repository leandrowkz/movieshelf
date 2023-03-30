import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

export function Container({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'section'>) {
  const classes = classNames(styles.container, className)

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  )
}
