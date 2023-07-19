import React, { useContext, useEffect, useState } from 'react'
import { Page } from '../../components/Page'
import { ShowCarousel } from '../../components/ShowCarousel'
import { ShowFilters } from '../../components/ShowFilters'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { GenresContext } from 'src/context/GenresContext'
import { TVShowsLoader } from './loader'
import styles from './styles.module.css'

export function TVShows(): JSX.Element {
  const [genreCodes, setGenreCodes] = useState<(number | null)[]>([null])
  const {
    tvShowsGenresCodes,
    tvShowsGenresLists,
    isLoading,
    fetchTVShowsGenresLists,
  } = useContext(GenresContext)

  useEffect(() => {
    const codes = tvShowsGenresCodes.map((genre) => genre.id)

    fetchTVShowsGenresLists(codes)
  }, [tvShowsGenresCodes])

  if (isLoading.fetchTVShowsGenresLists || isLoading.fetchTVShowsGenresCodes) {
    return <TVShowsLoader data-testid="tv-shows-loader" />
  }

  return (
    <Page>
      <Container>
        <Heading level={1} title="Discover" />
        <Heading level={2} title="TV Shows by genre" />
      </Container>
      <ShowFilters
        onFilter={(genresCodes) => setGenreCodes(genresCodes)}
        type="tv"
        data-testid="filters"
        className={styles.filters}
      />
      {tvShowsGenresLists
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
