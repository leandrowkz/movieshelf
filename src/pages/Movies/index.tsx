import React, { useContext, useEffect, useState } from 'react'
import { Page } from '../../components/Page'
import { ShowCarousel } from '../../components/ShowCarousel'
import { ShowFilters } from '../../components/ShowFilters'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { GenresContext } from 'src/context/GenresContext'
import { MoviesLoader } from './loader'
import styles from './styles.module.css'

export function Movies(): JSX.Element {
  const [genreCodes, setGenreCodes] = useState<(number | null)[]>([null])
  const {
    moviesGenresCodes,
    moviesGenresLists = [],
    isLoading,
    fetchMoviesGenresLists,
  } = useContext(GenresContext)

  useEffect(() => {
    const codes = moviesGenresCodes.map((genre) => genre.id)

    fetchMoviesGenresLists(codes)
  }, [moviesGenresCodes])

  if (isLoading.fetchMoviesGenresLists || isLoading.fetchMoviesGenresCodes) {
    return <MoviesLoader data-testid="movies-loader" />
  }

  return (
    <Page>
      <Container>
        <Heading level={1} title="Discover" />
        <Heading level={2} title="Movies by genre" />
      </Container>
      <ShowFilters
        onFilter={(genresCodes) => setGenreCodes(genresCodes)}
        type="movie"
        data-testid="filters"
        className={styles.filters}
      />
      {moviesGenresLists
        .filter((list) =>
          genreCodes.length > 0 && !genreCodes.includes(null)
            ? genreCodes.includes(list.genre.id)
            : true
        )
        .map((list) => (
          <ShowCarousel
            key={`list-genre-${list.genre.id}`}
            title={list.genre.name}
            shows={list.data.data}
            genreId={list.genre.id}
            role="list"
          />
        ))}
    </Page>
  )
}
