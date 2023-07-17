import React, { type HTMLAttributes } from 'react'
import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'
import classNames from 'classnames'
import { Motion } from '../Motion'
import { ShowListLoader } from './loader'
import { useScreenSize } from 'src/hooks/useScreenSize'

interface Props extends HTMLAttributes<HTMLDivElement> {
  shows: MovieItem[] | TVShowItem[]
  title: string
  size?: 'large' | 'medium' | 'small'
  isLoading?: boolean
  isSoftLoading?: boolean
}

export function ShowList({
  shows,
  title,
  className,
  isLoading = false,
  isSoftLoading = false,
  size = 'medium',
  ...props
}: Props) {
  const isMobile = useScreenSize('mobile')
  const classes = classNames(styles.container, className, {
    [styles.mobile]: isMobile,
  })

  if (!shows.length && !isLoading) {
    return <></>
  }

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
      <List size={size} shows={shows} isSoftLoading={isSoftLoading} />
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

function List({
  size,
  shows,
  isSoftLoading,
}: Pick<Props, 'size' | 'shows' | 'isSoftLoading'>) {
  const classes = classNames(styles.list, {
    [styles.listSmall]: size === 'small',
    [styles.listLarge]: size === 'large',
  })

  return (
    <div className={classes}>
      {shows.map((show, index) => (
        <Motion key={`show-${show.id}-${index}`}>
          <ShowItem
            show={show}
            size={size}
            isSoftLoading={isSoftLoading}
            className={styles.show}
            data-testid="show-item"
          />
        </Motion>
      ))}
    </div>
  )
}
