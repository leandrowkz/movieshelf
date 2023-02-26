import React from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'

type Props = {
  shows: Movie[],
  title: string,
  showViewAll?: boolean,
}

export function ShowList({ shows, title }: Props) {

  const header = (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
    </div>
  )

  const list = (
    <div className={styles.items}>
      {shows.map(show => (<ShowItem key={show.id} show={show} className={styles.show} />))}
    </div>
  )

  return (
    <div className={styles.container}>
      {header}
      {list}
    </div>
  )
}
