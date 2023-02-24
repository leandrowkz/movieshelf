import React from 'react'
import styles from './styles.module.css'
import { Heading } from '../Heading'

export function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.heading}>
        <Heading title="Recommended&nbsp;" level={1} />
        <Heading title="to you" level={1} isThin />
      </div>
      carousel goes here
    </section>
  )
}
