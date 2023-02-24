import React from 'react'
import styles from './styles.module.css'

type Props = {
  title: string
  level: 1 | 2 | 3 | '1' | '2' | '3'
  isThin?: boolean
}

export function Heading({ title, level = 1, isThin = false }: Props) {
  const classes = `${styles[`heading${level}`]} ${isThin ? styles.headingThin : ''}`

  return (
    <div className={classes}>
      {title}
    </div>
  )
}
