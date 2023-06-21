import React, { useContext, useEffect } from 'react'
import { Page } from '../../components/Page'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { FavoritesContext } from 'src/context/FavoritesContext'
import { ShowList } from 'src/components/ShowList'
import styles from './styles.module.css'

export function Favorites(): JSX.Element {
  const {
    movies,
    tvShows,
    isLoadingMoviesFavorites,
    isLoadingTVShowsFavorites,
    fetchMoviesFavorites,
    fetchTVShowsFavorites,
  } = useContext(FavoritesContext)

  useEffect(() => {
    fetchMoviesFavorites()
    fetchTVShowsFavorites()
  }, [])

  return (
    <Page>
      <Container>
        <Heading level={1} title="💜 Favorites" />
        <ShowList
          shows={movies}
          type="movie"
          title="Your favorite movies"
          isLoading={isLoadingMoviesFavorites}
          data-testid="list-movies"
          className={styles.list}
        />
        <ShowList
          shows={tvShows}
          type="tv"
          title="Your favorite TV Shows"
          isLoading={isLoadingTVShowsFavorites}
          data-testid="list-tv-shows"
        />
      </Container>
    </Page>
  )
}
