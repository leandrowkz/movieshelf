import React, { HTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
import { Button } from '../Button'
import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  pages: number
  current?: number
  onPageChange: (page: number) => void
}

export function Pagination({
  pages,
  current = 1,
  onPageChange,
  className,
}: Props) {
  const content: ReactNode[] = []
  const maximumPages = 10
  const currentPageChunk = Math.ceil(current / maximumPages)
  const startPage = currentPageChunk * maximumPages - maximumPages + 1
  const endPage =
    startPage + maximumPages > pages ? pages : startPage + maximumPages - 1

  content.push(
    <Button
      key="pagination-button-prev"
      variant="outlined"
      disabled={current <= 1}
      onClick={() => onPageChange(current - 1)}
    >{`<`}</Button>
  )

  for (let i = startPage; i <= endPage; i++) {
    const active = current === i

    content.push(
      <Button
        key={`pagination-button-${i}`}
        active={active}
        variant="outlined"
        onClick={() => onPageChange(i)}
      >
        {i}
      </Button>
    )
  }

  content.push(
    <Button
      key="pagination-button-next"
      disabled={current >= pages}
      variant="outlined"
      onClick={() => onPageChange(current + 1)}
    >{`>`}</Button>
  )

  const classes = classNames(styles.pagination, className)

  return <section className={classes}>{content}</section>
}
