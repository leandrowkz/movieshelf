import React from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Container } from '../Container'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <Container>
      <header className={styles.header}>
        <Logo className={styles.logo} />
        <div className={styles.menu}>
          <Link to="/">Movies</Link>
        </div>
      </header>
    </Container>
  )
}
