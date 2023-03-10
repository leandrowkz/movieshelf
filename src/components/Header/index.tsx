import React from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Container } from '../Container'

export function Header() {
  return (
    <Container>
      <header className={styles.header}>
        <Logo />
      </header>
    </Container>
  )
}
