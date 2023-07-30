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
import { ShowPoster } from '../ShowPoster'
import { Rating } from '../Rating'
import { useHelpers } from 'src/hooks/useHelpers'
import { ShowGenres } from '../ShowGenres'
import { MdOutlineSearch } from 'react-icons/md'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { SearchContext } from 'src/context/SearchContext'

const { getShowReleaseYear } = useHelpers()

export function ShowInputSearch(props: HTMLAttributes<HTMLDivElement>) {
  const wrapperRef = useRef(null)
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { results, search } = useContext(SearchContext)

  useEffect(() => {
    const searchData = setTimeout(() => {
      if (value) {
        search({ query: value })
      }
    }, 200)

    return () => clearTimeout(searchData)
  }, [value])

  useClickOutside(wrapperRef, () => setOpen(false))

  if (!open) {
    const buttonClasses = classNames(styles.searchButton, props.className, {
      [styles.mobile]: isMobile,
    })

    return (
      <div className={buttonClasses} onClick={() => setOpen(true)}>
        <MdOutlineSearch className={styles.searchIcon} />
        <Text className={styles.searchText}>Search</Text>
      </div>
    )
  }

  const containerClasses = classNames(styles.inputContainer, {
    [styles.mobile]: isMobile || isTablet,
  })

  return (
    <div
      {...props}
      className={containerClasses}
      data-testid="input-search"
      ref={wrapperRef}
    >
      <Dropdown.Wrapper>
        <Dropdown.Trigger className={styles.trigger}>
          <MdOutlineSearch className={styles.inputIcon} />
          <Input
            placeholder="Search for movies, tv shows..."
            value={value}
            className={styles.input}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
          />
        </Dropdown.Trigger>
        <Dropdown.Menu className={styles.dropdown}>
          {results.isLoading && (
            <Dropdown.Header>
              <Text>Searching...</Text>
            </Dropdown.Header>
          )}
          {results.data.map((item) => (
            <Dropdown.Item
              key={`search-show-${item.id}`}
              onClick={() =>
                (window.location.href = `/${
                  item.media_type === 'movie' ? 'movies' : 'tv'
                }/${item.id}`)
              }
            >
              <div className={styles.item}>
                <ShowPoster show={item} className={styles.poster} />
                <Heading
                  level={3}
                  title={item.media_type === 'tv' ? item.name : item.title}
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
                    className={styles.genres}
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
