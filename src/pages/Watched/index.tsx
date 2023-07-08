import React, { useContext, useEffect, useState } from 'react'
import { Page } from '../../components/Page'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { ShowList } from 'src/components/ShowList'
import styles from './styles.module.css'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Pagination } from 'src/components/Pagination'
import { UserListsContext } from 'src/context/UserListsContext'
import { ShowType } from 'src/types/ShowType'
import { ShowTypeFilters } from 'src/components/ShowTypeFilters'
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
              type="movie"
              title="Movies you already watched"
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
              title="TV Shows you already watched"
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
