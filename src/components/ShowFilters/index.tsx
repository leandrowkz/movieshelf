import React, {
  type HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import { Button } from '../Button'
import { Container } from '../Container'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { GenresContext } from 'src/context/GenresContext'
import type { ShowType } from 'src/types'

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
  const [selected, setSelected] = useState<number[]>([])
  const isMobile = useScreenSize('mobile')

  const { moviesGenres, tvShowsGenres } = useContext(GenresContext)
  const genres = type === 'tv' ? tvShowsGenres : moviesGenres
  const storageKey = type === 'tv' ? 'TV_SHOWS_FILTERS' : 'MOVIES_FILTERS'

  useEffect(() => {
    try {
      const filters = JSON.parse(localStorage.getItem(storageKey) || '[]')

      if (Array.isArray(filters) && filters.length > 0) {
        setSelected(filters)
      }
    } catch (e) {
      setSelected([])
    }
  }, [])

  useEffect(() => {
    onFilter(selected)
  }, [selected])

  const toggleFilter = (id: number) => {
    let newSelected: number[] = []

    if (selected.includes(id)) {
      newSelected = [...selected.filter((innerId) => innerId !== id)]
    } else if (!selected.includes(id)) {
      newSelected = [...selected, id]
    }

    setSelected(newSelected)
    localStorage.setItem(storageKey, JSON.stringify(newSelected))
  }

  const classes = classNames(styles.filters, className, {
    [styles.mobile]: isMobile,
  })

  return (
    <Container className={classes} {...props}>
      {genres.map((genre) => (
        <Button
          key={`button-filter-${genre.id}`}
          data-testid={`button-filter-${genre.id}`}
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
