import React, { useContext, useEffect } from 'react'
import { Page } from '../../components/Page'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { FavoritesContext } from 'src/context/FavoritesContext'
import { ShowList } from 'src/components/ShowList'
import styles from './styles.module.css'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Pagination } from 'src/components/Pagination'

export function Favorites(): JSX.Element {
  const isMobile = useScreenSize('mobile')
  const { movies, tvShows, fetchMoviesFavorites, fetchTVShowsFavorites } =
    useContext(FavoritesContext)

  useEffect(() => {
    fetchMoviesFavorites(1)
    fetchTVShowsFavorites(1)
  }, [])

  return (
    <Page isProtected>
      <Container>
        <Heading level={1} title="💜 Favorites" data-testid="heading" />
        <ShowList
          shows={movies.data}
          size={isMobile ? 'small' : 'medium'}
          type="movie"
          title="Your favorite movies"
          isSoftLoading={movies.isLoading}
          data-testid="list-movies"
        />
        <Pagination
          className={styles.pagination}
          pages={movies.pages || 0}
          current={movies.page}
          isLoading={movies.isLoading}
          onPageChange={(page) => fetchMoviesFavorites(page)}
        />
        <ShowList
          shows={tvShows.data}
          size={isMobile ? 'small' : 'medium'}
          type="tv"
          title="Your favorite TV Shows"
          isSoftLoading={tvShows.isLoading}
          data-testid="list-tv-shows"
        />
        <Pagination
          className={styles.pagination}
          pages={tvShows.pages || 0}
          current={tvShows.page}
          isLoading={tvShows.isLoading}
          onPageChange={(page) => fetchTVShowsFavorites(page)}
        />
      </Container>
    </Page>
  )
}
