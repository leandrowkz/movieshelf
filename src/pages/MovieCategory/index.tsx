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

export function MovieCategory(): JSX.Element {
  const { genreId } = useParams()
  const { moviesGenres: genres } = useContext(GenresContext)
  const {
    category,
    isLoadingByCategory,
    hasCategoryErrors,
    fetchListCategory,
  } = useContext(MovieListsContext)
  const [title, setTitle] = useState('Movies')
  const isMobile = useScreenSize('mobile')
  const size = isMobile ? 'small' : 'medium'

  useEffect(() => {
    const id = Number(genreId)

    fetchListCategory(id, 1)
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
          shows={category.data}
          size={size}
          isLoading={isLoadingByCategory}
          data-testid="list-movies-by-category"
          type="movie"
        />
        <Pagination
          className={styles.pagination}
          pages={category.pages || 0}
          current={category.page}
          onPageChange={(page) => fetchListCategory(Number(genreId), page)}
        />
      </Container>
    </Page>
  )
}
