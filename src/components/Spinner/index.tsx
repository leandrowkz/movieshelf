import React, { HTMLAttributes } from 'react'
import css from './styles.module.css'
import classNames from 'classnames'

export function Spinner({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const classes = classNames(css.spinner, className)

  return <span className={classes} {...props} />
}
