import React, { useContext, useEffect, useState } from 'react'
import { Page } from '../../components/Page'
import { ShowCarousel } from '../../components/ShowCarousel'
import { ShowFilters } from '../../components/ShowFilters'
import { TVShowListsContext } from 'src/context/TVShowListsContext'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import styles from './styles.module.css'
import { GenresContext } from 'src/context/GenresContext'
import { TVShowsLoader } from './loader'

export function TVShows(): JSX.Element {
  const [genreCodes, setGenreCodes] = useState<(number | null)[]>([null])
  const { tvShowsGenres: genres, isLoadingTVShowsGenres } =
    useContext(GenresContext)
  const { listsByGenres, isLoadingListsByGenres, fetchListsByGenres } =
    useContext(TVShowListsContext)

  useEffect(() => {
    fetchListsByGenres(genres)
  }, [genres])

  if (isLoadingListsByGenres || isLoadingTVShowsGenres) {
    return <TVShowsLoader data-testid="tv-shows-loader" />
  }

  return (
    <Page>
      <Container>
        <Heading level={1} title="Discover" />
        <Heading level={2} title="TV Shows by genre" />
      </Container>
      <ShowFilters
        onFilter={(genreCodes) => setGenreCodes(genreCodes)}
        type="tv"
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
            type="tv"
          />
        ))}
    </Page>
  )
}
