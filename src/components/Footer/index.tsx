import React, { type ComponentPropsWithoutRef } from 'react'
import classNames from 'classnames'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { Text } from '../Text'
import { Image } from '../Image'
import { Container } from '../Container'
import tmdb from '../../assets/images/tmdb-logo.svg'
import iconLinkedin from '../../assets/images/icon-linkedin.svg'
import iconGithub from '../../assets/images/icon-github.svg'
import { useScreenSize } from '../../hooks/useScreenSize'

export function Footer({
  className,
  ...props
}: ComponentPropsWithoutRef<'footer'>) {
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')
  const classes = classNames(styles.footer, className, {
    [styles.mobile]: isMobile || isTablet,
  })

  return (
    <footer className={classes} {...props}>
      <Container className={styles.container}>
        <LogoSection />
        <MenuSection />
        <DisclaimerSection />
      </Container>
    </footer>
  )
}

function LogoSection() {
  return (
    <div className={styles.logoSection} data-testid="logo-section">
      <div>
        <Logo className={styles.movieshelfLogo} />
        <Text size="small">Your personal movie and TV catalog.</Text>
      </div>
      <div className={styles.tmdb}>
        <Link to="https://www.themoviedb.org" target="_blank">
          <Image src={tmdb} className={styles.tmdbLogo} />
        </Link>
        <Text size="small">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB. All the information related to movies and tv displayed on
          carousels, lists, details, etc., comes from the TMDB API.
        </Text>
      </div>
    </div>
  )
}

function MenuSection() {
  return (
    <div className={styles.menuSection} data-testid="menu-section">
      <div className={styles.menu}>
        <Text size="small" isBold isMuted>
          Movieshelf
        </Text>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tv">TV shows</Link>
      </div>
      <div className={styles.menu}>
        <Text size="small" isBold isMuted>
          Social
        </Text>
        <Link to="https://github.com/leandrowkz/movieshelf" target="_blank">
          Github
        </Link>
        <Link to="https://www.themoviedb.org" target="_blank">
          TMDB
        </Link>
        <Link to="https://github.com/sponsors/leandrowkz" target="_blank">
          Be a sponsor
        </Link>
      </div>
    </div>
  )
}

function DisclaimerSection() {
  return (
    <div className={styles.disclaimer} data-testid="disclaimer-section">
      <div>
        <Text size="small">© {new Date().getFullYear()} Movieshelf.</Text>
        <Text size="small">
          {'  '} Made with 💜 by {'  '}
          <Link
            to="https://github.com/leandrowkz"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            @leandrowkz
          </Link>
        </Text>
      </div>
      <div>
        <Link to="https://github.com/leandrowkz" target="_blank">
          <Image src={iconGithub} className={styles.socialIcon} />
        </Link>
        <Link to="https://linkedin.com/in/leandrowkz" target="_blank">
          <Image src={iconLinkedin} className={styles.socialIcon} />
        </Link>
      </div>
    </div>
  )
}
