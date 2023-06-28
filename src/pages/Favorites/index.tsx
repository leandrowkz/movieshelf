import React, { useContext, useEffect } from 'react'
import { Page } from '../../components/Page'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { FavoritesContext } from 'src/context/FavoritesContext'
import { ShowList } from 'src/components/ShowList'
import styles from './styles.module.css'
import { AuthContext } from 'src/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Pagination } from 'src/components/Pagination'

export function Favorites(): JSX.Element {
  const navigate = useNavigate()
  const isMobile = useScreenSize('mobile')
  const { session, isLoadingSignIn } = useContext(AuthContext)
  const { movies, tvShows, fetchMoviesFavorites, fetchTVShowsFavorites } =
    useContext(FavoritesContext)

  useEffect(() => {
    if (!session && !isLoadingSignIn) {
      return navigate('/sign-up')
    }

    fetchMoviesFavorites(1)
    fetchTVShowsFavorites(1)
  }, [])

  if (!session) {
    return <></>
  }

  return (
    <Page>
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
