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

export function MovieCategory(): JSX.Element {
  const { genreId } = useParams()
  const { moviesGenres: genres } = useContext(GenresContext)
  const { category, isLoadingByCategory, hasCategoryErrors, fetchByCategory } =
    useContext(MovieListsContext)
  const [title, setTitle] = useState('Movies')
  const isMobile = useScreenSize('mobile')
  const size = isMobile ? 'small' : 'medium'

  const [current, setCurrent] = useState(1)

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
          data-testid="list-movies-by-category"
          type="movie"
        />
        <Pagination
          pages={54}
          current={current}
          onPageChange={(page) => setCurrent(page)}
        />
      </Container>
    </Page>
  )
}
