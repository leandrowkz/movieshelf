import React from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Container } from '../Container'
import { Link } from 'react-router-dom'
import { Button } from '../Button'

export function Header() {
  return (
    <Container>
      <header className={styles.header}>
        <Logo className={styles.logo} />
        <Logo className={styles.logoMobile} onlyIcon />
        <div className={styles.menu}>
          <Link to="/">Movies</Link>
        </div>
        <Link
          to="https://github.com/sponsors/leandrowkz"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <Button variant="secondary" size="small" className={styles.sponsor}>
            Sponsor 💜
          </Button>
        </Link>
      </header>
    </Container>
  )
}
