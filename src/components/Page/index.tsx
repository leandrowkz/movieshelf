import React, { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { ScrollRestoration } from 'react-router-dom'

export function Page({ children }: PropsWithChildren) {
  return (
    <section className={styles.page}>
      <ScrollRestoration />
      {children}
    </section>
  )
}
