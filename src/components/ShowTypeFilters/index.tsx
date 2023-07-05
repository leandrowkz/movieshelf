import React, { HTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import { Button } from '../Button'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { ShowType } from 'src/types/ShowType'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  value: ShowType
  onFilter: (showType: ShowType) => void
}

export function ShowTypeFilters({
  value,
  onFilter,
  className,
  ...props
}: Props): JSX.Element {
  const isMobile = useScreenSize('mobile')

  const classes = classNames(styles.filters, className, {
    [styles.mobile]: isMobile,
  })

  return (
    <section className={classes} {...props}>
      <Button
        variant="outlined"
        size="small"
        active={value === 'movie'}
        onClick={() => onFilter('movie')}
        pill
      >
        Movies
      </Button>
      <Button
        variant="outlined"
        size="small"
        active={value === 'tv'}
        onClick={() => onFilter('tv')}
        pill
      >
        TV Shows
      </Button>
    </section>
  )
}
