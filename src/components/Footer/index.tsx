import React from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { Text } from '../Text'
import { Image } from '../Image'
import tmdb from '../../assets/tmdb-logo.svg'
import { BulletSeparator } from '../BulletSeparator'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Logo className={styles.logo} />
        <div className={styles.menu}>
          <Link to="/">Home</Link>
          <Link to="https://github.com/leandrowkz/movieshelf" target="_blank">
            Github
          </Link>
          <Link to="https://www.themoviedb.org" target="_blank">
            TMDB
          </Link>
          <Link to="https://github.com/leandrowkz/movieshelf" target="_blank">
            Sponsor this project 🤗
          </Link>
        </div>
        <div className={styles.bottom}>
          <Text>
            Made with 💜 by{' '}
            <Link to="https://github.com/leandrowkz" target="_blank">
              @leandrowkz
            </Link>
          </Text>
          <div className={styles.disclaimer}>
            <Text>© {new Date().getFullYear()} Movieshelf</Text>
            <BulletSeparator />
            <Text>Source data from</Text>
            <Link to="https://www.themoviedb.org/" target="_blank">
              <Image src={tmdb} className={styles.sourceDataLogo} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
