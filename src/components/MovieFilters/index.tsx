import React, { HTMLAttributes, useEffect, useState } from 'react'
import { Button } from '../Button'
import { genres } from './genres'
import styles from './styles.module.css'
import { Container } from '../Container'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  onFilter: (genreCodes: (number | null)[]) => void
}

export function MovieFilters({ onFilter, ...props }: Props): JSX.Element {
  const storageKey = 'MOVIE_FILTERS'
  const [selected, setSelected] = useState<(number | null)[]>([])

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

  return (
    <Container className={styles.filters} {...props}>
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
          {genre.icon} {genre.name}
        </Button>
      ))}
    </Container>
  )
}
