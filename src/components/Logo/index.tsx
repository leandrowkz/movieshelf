import React, { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import classNames from 'classnames'
import { Heading } from '../Heading'

interface Props extends ComponentPropsWithoutRef<'a'> {
  onlyIcon?: boolean
}

export function Logo({ className, onlyIcon = false, ...props }: Props) {
  const classes = classNames(styles.logo, className)
  const title = onlyIcon ? '🍿' : '🍿 movieshelf'

  return (
    <Link to="/" className={classes} {...props}>
      <Heading title={title} level={2} className={styles.logoName} />
    </Link>
  )
}
