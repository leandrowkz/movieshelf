import React, { PropsWithChildren } from 'react'
import { ScrollRestoration } from 'react-router-dom'
import { Footer } from '../Footer'
import styles from './styles.module.css'
import { Header } from '../Header'

export function Page({ children }: PropsWithChildren) {
  return (
    <>
      <section className={styles.page}>
        <ScrollRestoration />
        <Header />
        {children}
      </section>
      <Footer />
    </>
  )
}
