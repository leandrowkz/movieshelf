import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { NotFound } from '../404'
import { PeopleContext } from 'src/context/PeopleContext'
import { ShowList } from 'src/components/ShowList'
import { Container } from 'src/components/Container'
import { PersonDetails as PersonDetailsBlock } from 'src/components/PersonDetails'
import type { ShowType } from 'src/types'
import styles from './styles.module.css'
import { ShowTypeFilters } from 'src/components/ShowTypeFilters'

export function PersonDetails(): JSX.Element {
  const { personId } = useParams()
  const [filter, setFilter] = useState<ShowType>('movie')

  const {
    person,
    movies,
    tvShows,
    fetchPerson,
    fetchMovies,
    fetchTVShows,
    isLoading,
    hasErrors,
  } = useContext(PeopleContext)

  useEffect(() => {
    const id = Number(personId)

    fetchPerson(id)
    fetchMovies(id)
    fetchTVShows(id)
  }, [personId])

  if (!person || hasErrors.fetchPerson) {
    return <NotFound data-testid="person-not-found" />
  }

  return (
    <Page>
      <Container>
        <PersonDetailsBlock person={person} isLoading={isLoading.fetchPerson} />
        {!isLoading.fetchPerson && (
          <ShowTypeFilters
            value={filter}
            onFilter={(type) => setFilter(type)}
            className={styles.filters}
          />
        )}
        {filter === 'movie' &&
          movies.map((list, index) => (
            <ShowList
              key={`list-movies-${index}-${list.job}`}
              title={list.job}
              shows={list.data}
              className={styles.list}
            />
          ))}
        {filter === 'tv' &&
          tvShows.map((list, index) => (
            <ShowList
              key={`list-tvShows-${index}-${list.job}`}
              title={list.job}
              shows={list.data}
              className={styles.list}
            />
          ))}
      </Container>
    </Page>
  )
}
