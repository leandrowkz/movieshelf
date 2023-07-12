import React, { useContext, useEffect, useState } from 'react'
import { Page } from '../../components/Page'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { ShowList } from 'src/components/ShowList'
import styles from './styles.module.css'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Pagination } from 'src/components/Pagination'
import { UserListsContext } from 'src/context/UserListsContext'
import type { ShowType } from 'types'
import { ShowTypeFilters } from 'src/components/ShowTypeFilters'
import { Link } from 'react-router-dom'

export function Watchlist(): JSX.Element {
  const isMobile = useScreenSize('mobile')
  const [filter, setFilter] = useState<ShowType>('movie')
  const { watchlist, fetchList } = useContext(UserListsContext)
  const { movies, tvShows } = watchlist

  useEffect(() => {
    fetchList(1, 'watchlist', 'movie')
    fetchList(1, 'watchlist', 'tv')
  }, [])

  const paginate = (page: number, showType: ShowType) => {
    fetchList(page, 'watchlist', showType)
    window.scrollTo(0, 0)
  }

  return (
    <Page isProtected>
      <Container>
        <section className={styles.header}>
          <Heading level={1} title="🎬 Watchlist" data-testid="heading" />
          <Link to="/watched">Go to your watched list ✅</Link>
        </section>
        <ShowTypeFilters value={filter} onFilter={(type) => setFilter(type)} />
        {filter === 'movie' && (
          <>
            <ShowList
              shows={movies.data}
              size={isMobile ? 'small' : 'medium'}
              type="movie"
              title="Movies you want to watch"
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
              title="TV Shows you want to watch"
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
