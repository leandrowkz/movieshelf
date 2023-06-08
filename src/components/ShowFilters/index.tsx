import React, { HTMLAttributes, useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import { Button } from '../Button'
import { Container } from '../Container'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { GenresContext } from 'src/context/GenresContext'
import { ShowType } from 'src/types/ShowType'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  type: ShowType
  onFilter: (genreCodes: (number | null)[]) => void
}

export function ShowFilters({
  type,
  onFilter,
  className,
  ...props
}: Props): JSX.Element {
  const [selected, setSelected] = useState<(number | null)[]>([])
  const isMobile = useScreenSize('mobile')

  const { moviesGenres, tvShowsGenres } = useContext(GenresContext)
  const genres = type === 'tv' ? tvShowsGenres : moviesGenres
  const storageKey = type === 'tv' ? 'TV_SHOWS_FILTERS' : 'MOVIES_FILTERS'

  useEffect(() => {
    try {
      const filters = JSON.parse(localStorage.getItem(storageKey) || '[null]')

      if (Array.isArray(filters) && filters.length > 0) {
        setSelected(filters)
      }
    } catch (e) {
      setSelected([null])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selected))
    onFilter(selected)
  }, [selected])

  const toggleFilter = (id: number | null) => {
    if (id === null) {
      setSelected([null])
      return
    }

    if (selected.includes(id)) {
      const newSelected = [...selected.filter((innerId) => innerId !== id)]
      setSelected(newSelected)

      if (newSelected.length <= 0) {
        setSelected([null])
      }

      return
    }

    if (!selected.includes(id)) {
      setSelected([...selected.filter((inner) => inner !== null), id])
      return
    }
  }

  const classes = classNames(styles.filters, className, {
    [styles.mobile]: isMobile,
  })

  return (
    <Container className={classes} {...props}>
      {genres.map((genre) => (
        <Button
          key={`button-filter-${genre.id}`}
          variant="outlined"
          size="small"
          active={selected.includes(genre.id)}
          onClick={() => toggleFilter(genre.id)}
          value={String(genre.id)}
          pill
        >
          {genre.name}
        </Button>
      ))}
    </Container>
  )
}
