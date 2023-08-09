import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Text } from 'src/components/Text'
import { NotFound } from '../404'
import { PeopleContext } from 'src/context/PeopleContext'
import { ShowList } from 'src/components/ShowList'
import { Container } from 'src/components/Container'
import styles from './styles.module.css'

export function PersonDetails(): JSX.Element {
  const { personId } = useParams()

  const {
    person,
    movies,
    tvShows,
    fetchPerson,
    fetchMovies,
    fetchTVShows,
    // isLoading,
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
        <Text>{JSON.stringify(person)}</Text>
        {movies.map((list, index) => (
          <ShowList
            key={`list-movies-${index}-${list.job}`}
            title={list.job}
            shows={list.data}
            className={styles.list}
          />
        ))}
        {tvShows.map((list, index) => (
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
