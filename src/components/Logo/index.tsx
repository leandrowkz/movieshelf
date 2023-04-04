import React, { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import ImgLogo from '../../assets/logo.svg'
import styles from './styles.module.css'
import classNames from 'classnames'
import { Heading } from '../Heading'

export function Logo({ className, ...props }: ComponentPropsWithoutRef<'a'>) {
  const classes = classNames(styles.logo, className)

  return (
    <Link to="/" className={classes} {...props}>
      <Heading title="movieshelf" level={2} className={styles.logoName} />
    </Link>
  )
}
