/* eslint-disable no-var */
import React, {
  type HTMLAttributes,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import { Dropdown } from '../Dropdown'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Input } from '../Input'
import { MovieListsContext } from 'src/context/MovieListsContext'
import { ShowPoster } from '../ShowPoster'
import { Rating } from '../Rating'
import { useHelpers } from 'src/hooks/useHelpers'
import { ShowGenres } from '../ShowGenres'
import { MdOutlineSearch } from 'react-icons/md'
import { useClickOutside } from 'src/hooks/useClickOutside'

const { getShowReleaseYear } = useHelpers()

export function ShowInputSearch(props: HTMLAttributes<HTMLDivElement>) {
  const wrapperRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { searchList, searchMovies } = useContext(MovieListsContext)

  useEffect(() => {
    const searchData = setTimeout(() => {
      if (value) {
        searchMovies({ query: value })
      }
    }, 200)

    return () => clearTimeout(searchData)
  }, [value])

  useClickOutside(wrapperRef, () => setOpen(false))

  if (!open) {
    const classes = classNames(styles.searchButton, props.className)

    return (
      <div className={classes} onClick={() => setOpen(true)}>
        <MdOutlineSearch />
      </div>
    )
  }

  return (
    <div
      {...props}
      className={styles.input}
      data-testid="input-search"
      ref={wrapperRef}
    >
      <Dropdown.Wrapper>
        <Dropdown.Trigger>
          <Input
            placeholder="Search for movies, tv shows..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Dropdown.Trigger>
        <Dropdown.Menu className={styles.dropdown}>
          {searchList.isLoading && (
            <Dropdown.Header>
              <Text>Searching...</Text>
            </Dropdown.Header>
          )}
          {searchList.data.map((item) => (
            <Dropdown.Item
              key={`search-movie-${item.id}`}
              onClick={() => (window.location.href = `/movies/${item.id}`)}
            >
              <div className={styles.item}>
                <ShowPoster show={item} className={styles.poster} />
                <Heading
                  level={3}
                  title={item.title}
                  className={styles.title}
                />
                <Text className={styles.overview} size="small">
                  {item.overview}
                </Text>
                <div className={styles.metadata}>
                  <Rating
                    score={item.vote_average}
                    size="small"
                    className={styles.rating}
                    data-testid="show-rating"
                  />
                  <Text isMuted size="small" data-testid="show-year">
                    {getShowReleaseYear(item)}
                  </Text>
                  <ShowGenres
                    show={item}
                    separator=", "
                    size="small"
                    limit={5}
                    data-testid="show-genres"
                  />
                </div>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Wrapper>
    </div>
  )
}
