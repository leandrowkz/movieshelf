import React, { useContext, useEffect } from 'react'
import { Page } from '../../components/Page'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { ShowList } from 'src/components/ShowList'
import styles from './styles.module.css'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Pagination } from 'src/components/Pagination'
import { ShowListsContext } from 'src/context/ShowListsContext'

export function Favorites(): JSX.Element {
  const isMobile = useScreenSize('mobile')
  const { favorites, fetchShowList } = useContext(ShowListsContext)
  const { movies, tvShows } = favorites

  useEffect(() => {
    fetchShowList(1, 'favorites', 'movie')
    fetchShowList(1, 'favorites', 'tv')
  }, [])

  return (
    <Page isProtected>
      <Container>
        <Heading level={1} title="💜 Favorites" data-testid="heading" />
        <ShowList
          shows={favorites.movies.data}
          size={isMobile ? 'small' : 'medium'}
          type="movie"
          title="Your favorite movies"
          isSoftLoading={favorites.movies.isLoading}
          data-testid="list-movies"
        />
        <Pagination
          className={styles.pagination}
          pages={movies.pages || 0}
          current={movies.page}
          isLoading={movies.isLoading}
          onPageChange={(page) => fetchShowList(page, 'favorites', 'movie')}
        />
        <ShowList
          shows={tvShows.data}
          size={isMobile ? 'small' : 'medium'}
          type="tv"
          title="Your favorite TV Shows"
          isSoftLoading={tvShows.isLoading}
          className={styles.list}
          data-testid="list-tv-shows"
        />
        <Pagination
          className={styles.pagination}
          pages={tvShows.pages || 0}
          current={tvShows.page}
          isLoading={tvShows.isLoading}
          onPageChange={(page) => fetchShowList(page, 'favorites', 'tv')}
        />
      </Container>
    </Page>
  )
}
