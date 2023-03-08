import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends ComponentPropsWithoutRef<'div'> {
  title: string
  level: 1 | 2 | 3
  isThin?: boolean
}

export function Heading({
  title,
  level = 1,
  isThin = false,
  className,
}: Props) {
  const classes = classNames({
    [`${className}`]: true,
    [`${styles[`heading${level}`]}`]: true,
    [styles.headingThin]: isThin,
  })

  return <div className={classes}>{title}</div>
}
