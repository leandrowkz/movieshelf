import React from 'react'
import { Link } from 'react-router-dom'
import ImgLogo from '../../assets/logo.svg'
import styles from './styles.module.css'

export function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img src={ImgLogo} alt="movieshelf logo" className={styles.logoImg} />
    </Link>
  )
}
