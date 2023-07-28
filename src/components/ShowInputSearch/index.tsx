/* eslint-disable no-var */
import React, {
  type HTMLAttributes,
  useContext,
  useState,
  useEffect,
} from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from '../Dropdown'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Input } from '../Input'
import { MovieListsContext } from 'src/context/MovieListsContext'
import { ShowPoster } from '../ShowPoster'
import { Rating } from '../Rating'
import { useHelpers } from 'src/hooks/useHelpers'
import { ShowGenres } from '../ShowGenres'

const { getShowReleaseYear } = useHelpers()

export function ShowInputSearch(props: HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const { search, fetchSearch } = useContext(MovieListsContext)

  useEffect(() => {
    const searchData = setTimeout(() => {
      fetchSearch({ query: value })
    }, 200)

    return () => clearTimeout(searchData)
  }, [value])

  return (
    <div {...props} className={styles.input} data-testid="user-menu">
      <Dropdown.Wrapper>
        <Dropdown.Trigger>
          <Input
            placeholder="Search for movies, tv shows..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Dropdown.Trigger>
        <Dropdown.Menu className={styles.dropdown}>
          {search.data.map((item) => (
            <Dropdown.Item
              key={`search-movie-${item.id}`}
              onClick={() => navigate(`/movies/${item.id}`)}
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
