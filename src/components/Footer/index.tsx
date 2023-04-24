import React, { ComponentPropsWithoutRef } from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { Text } from '../Text'
import { Image } from '../Image'
import tmdb from '../../assets/tmdb-logo.svg'
import { BulletSeparator } from '../BulletSeparator'
import { Container } from '../Container'

export function Footer({ ...props }: ComponentPropsWithoutRef<'footer'>) {
  return (
    <footer className={styles.footer} {...props}>
      <Container>
        <Logo className={styles.logo} data-testid="logo" />
        <div className={styles.menu} data-testid="menu">
          <Link to="/" data-testid="menu-home">
            Home
          </Link>
          <Link
            to="https://github.com/leandrowkz/movieshelf"
            target="_blank"
            rel="nofollow noopener noreferrer"
            data-testid="menu-github"
          >
            Github
          </Link>
          <Link
            to="https://www.themoviedb.org"
            target="_blank"
            rel="nofollow noopener noreferrer"
            data-testid="menu-tmdb"
          >
            TMDB
          </Link>
          <Link
            to="https://github.com/sponsors/leandrowkz"
            target="_blank"
            rel="nofollow noopener noreferrer"
            data-testid="menu-sponsorship"
          >
            Sponsor this project 🤗
          </Link>
        </div>
        <div className={styles.bottom} data-testid="bottom">
          <Text data-testid="made-with-love">
            Made with 💜 by{' '}
            <Link
              to="https://github.com/leandrowkz"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              @leandrowkz
            </Link>
          </Text>
          <div className={styles.disclaimer} data-testid="disclaimer">
            <Text data-testid="copyright">
              © {new Date().getFullYear()} Movieshelf
            </Text>
            <BulletSeparator />
            <Text>Source data from</Text>
            <Link
              to="https://www.themoviedb.org"
              target="_blank"
              rel="nofollow noopener noreferrer"
              data-testid="link-tmdb"
            >
              <Image src={tmdb} className={styles.sourceDataLogo} />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
