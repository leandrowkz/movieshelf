import React, { HTMLAttributes } from 'react'
import { ScrollRestoration } from 'react-router-dom'
import { Footer } from '../Footer'
import styles from './styles.module.css'
import { Header } from '../Header'
import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  darkBackground?: boolean
}

export function Page({
  children,
  className,
  darkBackground = false,
  ...props
}: Props) {
  const classes = classNames(styles.page, className)

  return (
    <section className={classes} {...props}>
      <ScrollRestoration />
      <Header
        data-testid="header"
        className={styles.header}
        darkBackground={darkBackground}
      />
      <section data-testid="content" className={styles.content}>
        {children}
      </section>
      <Footer data-testid="footer" className={styles.footer} />
    </section>
  )
}
