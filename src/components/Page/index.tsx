import React, { type HTMLAttributes, useContext, useEffect } from 'react'
import { Footer } from '../Footer'
import styles from './styles.module.css'
import { Header } from '../Header'
import classNames from 'classnames'
import { AuthContext } from 'src/context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface Props extends HTMLAttributes<HTMLDivElement> {
  darkHeader?: boolean
  isProtected?: boolean
}

export function Page({
  children,
  className,
  darkHeader = false,
  isProtected = false,
  ...props
}: Props) {
  if (isProtected) {
    const navigate = useNavigate()
    const { isAuthenticated, isAutoSignInDone } = useContext(AuthContext)

    const checkAuthAndRedirect = (
      isAutoSignInDone: boolean,
      isAuthenticated: boolean
    ) => {
      if (isAutoSignInDone && !isAuthenticated) {
        return navigate('/sign-up')
      }
    }

    useEffect(() => {
      checkAuthAndRedirect(isAutoSignInDone, isAuthenticated)
    }, [isAutoSignInDone])

    useEffect(() => {
      checkAuthAndRedirect(isAutoSignInDone, isAuthenticated)
    }, [])
  }

  const classes = classNames(styles.page, className)

  return (
    <section className={classes} {...props}>
      <Header
        data-testid="header"
        className={styles.header}
        darkBackground={darkHeader}
      />
      <section data-testid="content" className={styles.content}>
        {children}
      </section>
      <Footer data-testid="footer" className={styles.footer} />
    </section>
  )
}
