import React, { useContext, useEffect, useState } from 'react'
import type { ShowType } from 'src/types'
import styles from './styles.module.css'
import { Page } from '../../components/Page'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { ShowList } from 'src/components/ShowList'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Pagination } from 'src/components/Pagination'
import { UserListsContext } from 'src/context/UserListsContext'
import { ShowTypeFilters } from 'src/components/ShowTypeFilters'

export function Favorites(): JSX.Element {
  const isMobile = useScreenSize('mobile')
  const [filter, setFilter] = useState<ShowType>('movie')
  const { favorites, fetchList } = useContext(UserListsContext)
  const { movies, tvShows } = favorites

  useEffect(() => {
    fetchList(1, 'favorites', 'movie')
    fetchList(1, 'favorites', 'tv')
  }, [])

  const paginate = (page: number, showType: ShowType) => {
    fetchList(page, 'favorites', showType)
    window.scrollTo(0, 0)
  }

  return (
    <Page isProtected>
      <Container>
        <Heading level={1} title="💜 Favorites" data-testid="heading" />
        <ShowTypeFilters value={filter} onFilter={(type) => setFilter(type)} />
        {filter === 'movie' && (
          <>
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
              onPageChange={(page) => paginate(page, 'movie')}
            />
          </>
        )}
        {filter === 'tv' && (
          <>
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
              onPageChange={(page) => paginate(page, 'tv')}
            />
          </>
        )}
      </Container>
    </Page>
  )
}
