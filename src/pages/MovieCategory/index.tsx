import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { MovieListsContext } from '../../store/MovieListsContext'
import { Container } from '../../components/Container'
import { ShowList } from 'src/components/ShowList'
import { MovieGenresContext } from 'src/store/MovieGenresContext'

export function MovieCategory(): JSX.Element {
  const { genreId } = useParams()
  const { genres } = useContext(MovieGenresContext)
  const { category, isLoadingByCategory, fetchByCategory } =
    useContext(MovieListsContext)
  const [title, setTitle] = useState('Movies')

  useEffect(() => {
    const id = Number(genreId)
    const genre = genres.find((genre) => genre.id === Number(genreId)) || {
      name: 'Genre',
    }

    setTitle(`${genre.name} movies`)
    fetchByCategory(id)
  }, [genreId, genres])

  return (
    <Page>
      <Container>
        <ShowList
          title={title}
          shows={category}
          isLoading={isLoadingByCategory}
        />
      </Container>
    </Page>
  )
}
