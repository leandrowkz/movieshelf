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

  if (isLoading) {
    return (
      <div className={classes}>
        <Header title={title} />
        <Motion data-testid="loader">
          <ShowListLoader />
        </Motion>
      </div>
    )
  }

  return (
    <div className={classes} {...props}>
      <Header title={title} />
      <List size={size} shows={shows} />
    </div>
  )
}

function Header({ title }: Pick<Props, 'title'>) {
  return (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
    </div>
  )
}

function List({ size, shows }: Pick<Props, 'size' | 'shows'>) {
  const classes = classNames(styles.list, {
    [styles.listSmall]: size === 'small',
    [styles.listLarge]: size === 'large',
  })

  return (
    <div className={classes}>
      {shows.map((show, index) => (
        <Motion key={`show-${show.id}-${index}`}>
          <ShowItem
            className={styles.show}
            show={show}
            size={size}
            data-testid="show-item"
          />
        </Motion>
      ))}
    </div>
  )
}
