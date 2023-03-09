import React, { PropsWithChildren } from 'react'
import { ScrollRestoration } from 'react-router-dom'
import { Footer } from '../Footer'
import styles from './styles.module.css'

export function Page({ children }: PropsWithChildren) {
  return (
    <>
      <section className={styles.page}>
        <ScrollRestoration />
        {children}
      </section>
      <Footer />
    </>
  )
}
