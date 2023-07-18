import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { MovieListsContext } from '../../context/MovieListsContext'
import { Container } from '../../components/Container'
import { ShowList } from 'src/components/ShowList'
import { GenresContext } from 'src/context/GenresContext'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { NotFound } from '../404'
import { Pagination } from 'src/components/Pagination'
import styles from './styles.module.css'
import { ShowCarousel } from 'src/components/ShowCarousel'

export function MovieGenre() {
  const { genreId } = useParams()
  const {
    moviesGenresCodes,
    moviesGenresList,
    fetchMoviesGenresList,
    isLoading,
    hasErrors,
  } = useContext(GenresContext)

  const { popular, fetchPopular } = useContext(MovieListsContext)

  const [title, setTitle] = useState('Movies')
  const isMobile = useScreenSize('mobile')
  const size = isMobile ? 'small' : 'medium'

  useEffect(() => {
    fetchPopular()
  }, [])

  useEffect(() => {
    const id = Number(genreId)

    fetchMoviesGenresList(id)
  }, [genreId])

  useEffect(() => {
    const genre = moviesGenresCodes.find(
      (genre) => genre.id === Number(genreId)
    ) || {
      name: 'Genre',
    }

    setTitle(`${genre.name} movies`)
  }, [genreId, moviesGenresCodes])

  if (hasErrors.fetchMoviesGenresList) {
    return <NotFound data-testid="category-not-found" />
  }

  return (
    <Page>
      <Container>
        <ShowList
          size={size}
          title={title}
          shows={moviesGenresList.data}
          isSoftLoading={isLoading.fetchMoviesGenresList}
          data-testid="list-movies-by-category"
        />
        <Pagination
          className={styles.pagination}
          pages={moviesGenresList.pages || 0}
          current={moviesGenresList.page}
          isLoading={isLoading.fetchMoviesGenresList}
          onPageChange={(page) =>
            fetchMoviesGenresList(Number(genreId), { page })
          }
        />
      </Container>
      <ShowCarousel
        size={size}
        title="Popular movies"
        shows={popular.data}
        isLoading={popular.isLoading}
        data-testid="carousel-popular"
      />
    </Page>
  )
}
