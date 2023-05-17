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

  const classes = classNames(styles.container, className)

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

  return (
    <div className={classes} {...props}>
      {header}
      <List size={size} shows={shows} />
    </div>
  )
}

type ListProps = Pick<Props, 'size' | 'shows'>

function List({ size, shows }: ListProps) {
  const classes = classNames(styles.list, {
    [styles.listSmall]: size === 'small',
    [styles.listLarge]: size === 'large',
  })

  return (
    <div className={classes}>
      {shows.map((show) => (
        <Motion className={styles.page} key={show.id}>
          <ShowItem show={show} className={styles.show} size={size} />
        </Motion>
      ))}
    </div>
  )
}
