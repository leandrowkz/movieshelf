import React, { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import ImgLogo from '../../assets/logo.svg'
import styles from './styles.module.css'
import classNames from 'classnames'

export function Logo({ className }: ComponentPropsWithoutRef<'div'>) {
  const classes = classNames(styles.logo, className)

  return (
    <Link to="/" className={classes}>
      <img src={ImgLogo} alt="movieshelf logo" className={styles.logoImg} />
    </Link>
  )
}
