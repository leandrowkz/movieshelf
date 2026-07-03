import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { NotFound } from '../404'
import { PeopleContext } from '../../context/PeopleContext'
import { ShowList } from '../../components/ShowList'
import { Container } from '../../components/Container'
import { PersonDetails as PersonDetailsSection } from '../../components/PersonDetails'
import type { ShowType } from '../../types'
import styles from './styles.module.css'
import { ShowTypeFilters } from '../../components/ShowTypeFilters'
import { PersonImagesModal } from '../../components/PersonImagesModal'

export function PersonDetails(): JSX.Element {
  const { personId } = useParams()
  const [filter, setFilter] = useState<ShowType>('movie')

  const {
    person,
    movies,
    tvShows,
    fetchPerson,
    fetchImages,
    fetchMovies,
    fetchTVShows,
    isLoading,
    hasErrors,
  } = useContext(PeopleContext)

  useEffect(() => {
    const id = Number(personId)

    fetchPerson(id)
    fetchImages(id)
    fetchMovies(id)
    fetchTVShows(id)
  }, [personId])

  if (!person || hasErrors.fetchPerson) {
    return <NotFound data-testid="person-not-found" />
  }

  return (
    <Page>
      <Container>
        <PersonDetailsSection data-testid="person-details" />
        {!isLoading.fetchPerson && (
          <ShowTypeFilters
            value={filter}
            onFilter={(type) => setFilter(type)}
            className={styles.filters}
            data-testid="filters"
          />
        )}
        {filter === 'movie' &&
          movies.map((list, index) => (
            <ShowList
              key={`list-movies-${index}-${list.job}`}
              title={list.job}
              shows={list.data}
              className={styles.list}
              data-testid="movies-list"
            />
          ))}
        {filter === 'tv' &&
          tvShows.map((list, index) => (
            <ShowList
              key={`list-tvShows-${index}-${list.job}`}
              title={list.job}
              shows={list.data}
              className={styles.list}
              data-testid="tv-shows-list"
            />
          ))}
      </Container>
      <PersonImagesModal data-testid="person-images-modal" />
    </Page>
  )
}
