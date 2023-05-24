import React, { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import classNames from 'classnames'
import { Heading } from '../Heading'

interface Props extends ComponentPropsWithoutRef<'a'> {
  onlyIcon?: boolean
  size?: 'small' | 'medium' | 'large'
}

export function Logo({
  size = 'medium',
  className,
  onlyIcon = false,
  ...props
}: Props) {
  const classes = classNames(styles.logo, className)
  const title = onlyIcon ? '🍿' : '🍿 movieshelf'
  let level: 1 | 2 | 3 = 2

  switch (size) {
    case 'small':
      level = 3
      break
    case 'medium':
      level = 2
      break
    case 'large':
      level = 1
      break
  }

  return (
    <Link to="/" className={classes} {...props}>
      <Heading title={title} level={level} className={styles.logoName} />
    </Link>
  )
}
