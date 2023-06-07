import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { TVShowListsContext } from '../../context/TVShowListsContext'
import { Container } from '../../components/Container'
import { ShowList } from 'src/components/ShowList'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { NotFound } from '../404'
import { GenresContext } from 'src/context/GenresContext'

export function TVShowCategory(): JSX.Element {
  const { genreId } = useParams()
  const { tvShowsGenres: genres } = useContext(GenresContext)
  const { category, isLoadingByCategory, hasCategoryErrors, fetchByCategory } =
    useContext(TVShowListsContext)
  const [title, setTitle] = useState('TV Shows')
  const isMobile = useScreenSize('mobile')
  const size = isMobile ? 'small' : 'medium'

  useEffect(() => {
    const id = Number(genreId)

    fetchByCategory(id)
  }, [genreId])

  useEffect(() => {
    const genre = genres.find((genre) => genre.id === Number(genreId)) || {
      name: 'Genre',
    }

    setTitle(`${genre.name} TV Shows`)
  }, [genreId, genres])

  if (hasCategoryErrors) {
    return <NotFound data-testid="category-not-found" />
  }

  return (
    <Page>
      <Container>
        <ShowList
          title={title}
          shows={category}
          size={size}
          isLoading={isLoadingByCategory}
          data-testid="category-shows-list"
        />
      </Container>
    </Page>
  )
}
