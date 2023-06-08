import React, { HTMLAttributes } from 'react'
import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'
import classNames from 'classnames'
import { Motion } from '../Motion'
import { ShowListLoader } from './loader'
import { ShowType } from 'src/types/ShowType'

interface Props extends HTMLAttributes<HTMLDivElement> {
  shows: MovieItem[] | TVShowItem[]
  title: string
  type?: ShowType
  size?: 'large' | 'medium' | 'small'
  isLoading?: boolean
}

export function ShowList({
  shows,
  title,
  className,
  isLoading = false,
  size = 'medium',
  type = 'movie',
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
      <List size={size} shows={shows} type={type} />
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

function List({ size, shows, type }: Pick<Props, 'size' | 'shows' | 'type'>) {
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
            type={type}
            data-testid="show-item"
          />
        </Motion>
      ))}
    </div>
  )
}
