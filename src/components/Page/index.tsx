import React, { ComponentPropsWithoutRef } from 'react'
import { ScrollRestoration } from 'react-router-dom'
import { Footer } from '../Footer'
import styles from './styles.module.css'
import { Header } from '../Header'
import classNames from 'classnames'

export function Page({
  children,
  className,
}: ComponentPropsWithoutRef<'section'>) {
  const classes = classNames(styles.page, className)

  return (
    <section className={classes}>
      <ScrollRestoration />
      <Header />
      {children}
      <Footer />
    </section>
  )
}
