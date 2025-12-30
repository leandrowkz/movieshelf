import React, { useContext, useEffect, useState } from 'react'
import { Page } from '../../components/Page'
import { Heading } from '../../components/Heading'
import { Container } from '../../components/Container'
import { ShowList } from '../../components/ShowList'
import styles from './styles.module.css'
import { useScreenSize } from '../../hooks/useScreenSize'
import { Pagination } from '../../components/Pagination'
import { UserListsContext } from '../../context/UserListsContext'
import type { ShowType } from '../../types'
import { ShowTypeFilters } from '../../components/ShowTypeFilters'
import { Link } from 'react-router-dom'

export function Watched(): JSX.Element {
  const isMobile = useScreenSize('mobile')
  const [filter, setFilter] = useState<ShowType>('movie')
  const { watched, fetchList } = useContext(UserListsContext)
  const { movies, tvShows } = watched

  useEffect(() => {
    fetchList(1, 'watched', 'movie')
    fetchList(1, 'watched', 'tv')
  }, [])

  const paginate = (page: number, showType: ShowType) => {
    fetchList(page, 'watched', showType)
    window.scrollTo(0, 0)
  }

  return (
    <Page isProtected>
      <Container>
        <section className={styles.header}>
          <Heading level={1} title="✅ Watched" data-testid="heading" />
          <Link to="/watchlist">Go to your Watchlist 🎬</Link>
        </section>
        <ShowTypeFilters value={filter} onFilter={(type) => setFilter(type)} />
        {filter === 'movie' && (
          <>
            <ShowList
              shows={movies.data}
              size={isMobile ? 'small' : 'medium'}
              title={`Movies you already watched (${movies.count})`}
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
              title={`TV Shows you already watched (${tvShows.count})`}
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
