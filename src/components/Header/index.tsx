import React from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  )
}
