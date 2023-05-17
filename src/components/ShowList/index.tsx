import React, { HTMLAttributes } from 'react'
import type { MovieItem } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'
import classNames from 'classnames'
import { Motion } from '../Motion'
import { ShowListLoader } from './loader'

interface Props extends HTMLAttributes<HTMLDivElement> {
  shows: MovieItem[]
  title: string
  isLoading?: boolean
  size?: 'large' | 'medium' | 'small'
}

export function ShowList({
  shows,
  title,
  className,
  isLoading = false,
  size = 'medium',
  ...props
}: Props) {
  if (!shows.length && !isLoading) {
    return <></>
  }

  const classes = classNames(styles.carousel, className)
  const showClass = classNames(styles.show)

  const header = (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
    </div>
  )

  if (isLoading) {
    return (
      <div className={classes}>
        {header}
        <Motion data-testid="loader">
          <ShowListLoader />
        </Motion>
      </div>
    )
  }

  const list = (
    <div className={styles.list}>
      {shows.map((show) => (
        <Motion className={styles.page} key={show.id}>
          <ShowItem show={show} className={showClass} size={size} />
        </Motion>
      ))}
    </div>
  )

  return (
    <div className={classes} {...props}>
      {header}
      {list}
    </div>
  )
}
