import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { TVShowListsContext } from '../../context/TVShowListsContext'
import { Container } from '../../components/Container'
import { ShowList } from 'src/components/ShowList'
import { GenresContext } from 'src/context/GenresContext'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { NotFound } from '../404'

export function TVShowCategory(): JSX.Element {
  const { genreId } = useParams()
  const { tvShowsGenres: genres } = useContext(GenresContext)
  const { genre, isLoadingByGenre, hasGenreErrors, fetchByGenre } =
    useContext(TVShowListsContext)
  const [title, setTitle] = useState('TV Shows')
  const isMobile = useScreenSize('mobile')
  const size = isMobile ? 'small' : 'medium'

  useEffect(() => {
    const id = Number(genreId)

    fetchByGenre(id)
  }, [genreId])

  useEffect(() => {
    const genre = genres.find((genre) => genre.id === Number(genreId)) || {
      name: 'Genre',
    }

    setTitle(`${genre.name} TV Shows`)
  }, [genreId, genres])

  if (hasGenreErrors) {
    return <NotFound data-testid="category-not-found" />
  }

  return (
    <Page>
      <Container>
        <ShowList
          title={title}
          shows={genre}
          size={size}
          isLoading={isLoadingByGenre}
          data-testid="list-tv-shows-by-category"
          type="tv"
        />
      </Container>
    </Page>
  )
}
