import React, { useContext, useEffect, useState } from 'react'
import type { ShowType } from '../../types'
import styles from './styles.module.css'
import { Page } from '../../components/Page'
import { Heading } from '../../components/Heading'
import { Container } from '../../components/Container'
import { ShowList } from '../../components/ShowList'
import { useScreenSize } from '../../hooks/useScreenSize'
import { Pagination } from '../../components/Pagination'
import { UserListsContext } from '../../context/UserListsContext'
import { ShowTypeFilters } from '../../components/ShowTypeFilters'

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
              title={`Your favorite movies (${movies.count})`}
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
              title={`Your favorite TV Shows (${tvShows.count})`}
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
