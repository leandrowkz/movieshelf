import React, { PropsWithChildren } from 'react'
import styles from './styles.module.css'

export function Page({ children }: PropsWithChildren) {
  return <section className={styles.page}>{children}</section>
}
