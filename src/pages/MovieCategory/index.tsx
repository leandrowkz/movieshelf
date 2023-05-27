import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { MovieListsContext } from '../../context/MovieListsContext'
import { Container } from '../../components/Container'
import { ShowList } from 'src/components/ShowList'
import { MovieGenresContext } from 'src/context/MovieGenresContext'
import { useScreenSize } from 'src/hooks/useScreenSize'

export function MovieCategory(): JSX.Element {
  const { genreId } = useParams()
  const { genres } = useContext(MovieGenresContext)
  const { category, isLoadingByCategory, fetchByCategory } =
    useContext(MovieListsContext)
  const [title, setTitle] = useState('Movies')
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

    setTitle(`${genre.name} movies`)
  }, [genreId, genres])

  return (
    <Page>
      <Container>
        <ShowList
          title={title}
          shows={category}
          size={size}
          isLoading={isLoadingByCategory}
        />
      </Container>
    </Page>
  )
}
