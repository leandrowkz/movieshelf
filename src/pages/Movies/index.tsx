import React, { useContext, useEffect, useState } from 'react'
import { Page } from '../../components/Page'
import { ShowCarousel } from '../../components/ShowCarousel'
import { ShowFilters } from '../../components/ShowFilters'
import { MovieListsContext } from 'src/context/MovieListsContext'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import styles from './styles.module.css'
import { GenresContext } from 'src/context/GenresContext'
import { MoviesLoader } from './loader'

export function Movies(): JSX.Element {
  const [genreCodes, setGenreCodes] = useState<(number | null)[]>([null])
  const { moviesGenres: genres, isLoadingMoviesGenres } =
    useContext(GenresContext)
  const { listsByGenres, isLoadingListsByGenres, fetchListsByGenres } =
    useContext(MovieListsContext)

  useEffect(() => {
    fetchListsByGenres(genres)
  }, [genres])

  if (isLoadingListsByGenres || isLoadingMoviesGenres) {
    return <MoviesLoader data-testid="movies-loader" />
  }

  return (
    <Page>
      <Container>
        <Heading level={1} title="Discover" />
        <Heading level={2} title="Movies by genre" />
      </Container>
      <ShowFilters
        onFilter={(genreCodes) => setGenreCodes(genreCodes)}
        type="movie"
        data-testid="filters"
        className={styles.filters}
      />
      {listsByGenres
        .filter((list) =>
          genreCodes.length > 0 && !genreCodes.includes(null)
            ? genreCodes.includes(list.genre.id)
            : true
        )
        .map((list) => (
          <ShowCarousel
            key={`list-genre-${list.genre.id}`}
            title={list.genre.name}
            shows={list.data}
            genreId={list.genre.id}
            role="list"
            type="movie"
          />
        ))}
    </Page>
  )
}
