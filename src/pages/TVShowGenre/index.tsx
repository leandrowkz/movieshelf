import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { TVShowListsContext } from 'src/context/TVShowListsContext'
import { Container } from '../../components/Container'
import { ShowList } from 'src/components/ShowList'
import { GenresContext } from 'src/context/GenresContext'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { NotFound } from '../404'
import { Pagination } from 'src/components/Pagination'
import styles from './styles.module.css'
import { ShowCarousel } from 'src/components/ShowCarousel'

export function TVShowGenre() {
  const { genreId } = useParams()
  const {
    tvShowsGenresCodes,
    tvShowsGenresList,
    fetchTVShowsGenresList,
    isLoading,
    hasErrors,
  } = useContext(GenresContext)

  const { popular, fetchPopular } = useContext(TVShowListsContext)

  const [title, setTitle] = useState('TV Shows')
  const isMobile = useScreenSize('mobile')
  const size = isMobile ? 'small' : 'medium'

  const paginate = (page: number) => {
    fetchTVShowsGenresList(Number(genreId), { page })
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    fetchPopular()
  }, [])

  useEffect(() => {
    const id = Number(genreId)

    fetchTVShowsGenresList(id)
  }, [genreId])

  useEffect(() => {
    const genre = tvShowsGenresCodes.find(
      (genre) => genre.id === Number(genreId)
    ) || {
      name: 'Genre',
    }

    setTitle(`${genre.name} TV shows`)
  }, [genreId, tvShowsGenresCodes])

  if (hasErrors.fetchTVShowsGenresList) {
    return <NotFound data-testid="genre-not-found" />
  }

  return (
    <Page>
      <Container>
        <ShowList
          size={size}
          title={title}
          shows={tvShowsGenresList.data}
          isSoftLoading={isLoading.fetchTVShowsGenresList}
          data-testid="list-tv-shows-by-genre"
        />
        <Pagination
          className={styles.pagination}
          pages={tvShowsGenresList.pages || 0}
          current={tvShowsGenresList.page}
          isLoading={isLoading.fetchTVShowsGenresList}
          onPageChange={paginate}
        />
      </Container>
      <ShowCarousel
        size="large"
        title="Popular TV Shows"
        shows={popular.data}
        isLoading={popular.isLoading}
        data-testid="carousel-popular"
      />
    </Page>
  )
}
