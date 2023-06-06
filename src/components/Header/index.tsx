import React, { HTMLAttributes } from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Container } from '../Container'
import { Link } from 'react-router-dom'
import { Button } from '../Button'
import { useScreenSize } from '../../hooks/useScreenSize'

export function Header({ ...props }: HTMLAttributes<HTMLDivElement>) {
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')

  return (
    <Container {...props}>
      <header className={styles.header}>
        <Logo
          className={styles.logo}
          data-testid="logo"
          onlyIcon={isMobile || isTablet}
        />
        <div className={styles.menu} data-testid="menu">
          <Link to="/" data-testid="menu-all">
            All
          </Link>
          <Link to="/movies" data-testid="menu-movies">
            Movies
          </Link>
          <Link to="/tv" data-testid="menu-tv-shows">
            TV
          </Link>
        </div>
        <Link
          to="https://github.com/sponsors/leandrowkz"
          target="_blank"
          rel="nofollow noopener noreferrer"
          data-testid="sponsor"
        >
          <Button variant="secondary" size="small" className={styles.sponsor}>
            Sponsor 💜
          </Button>
        </Link>
      </header>
    </Container>
  )
}
