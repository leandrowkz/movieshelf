import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { TVShowListsContext } from '../../context/TVShowListsContext'
import { Container } from '../../components/Container'
import { ShowList } from 'src/components/ShowList'
import { GenresContext } from 'src/context/GenresContext'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { NotFound } from '../404'
import { Pagination } from 'src/components/Pagination'
import styles from './styles.module.css'

export function TVShowCategory(): JSX.Element {
  const { genreId } = useParams()
  const { tvShowsGenres: genres } = useContext(GenresContext)
  const {
    category,
    isLoadingListCategory,
    hasListCategoryErrors,
    fetchListCategory,
  } = useContext(TVShowListsContext)
  const [title, setTitle] = useState('TV Shows')
  const isMobile = useScreenSize('mobile')
  const size = isMobile ? 'small' : 'medium'

  useEffect(() => {
    const id = Number(genreId)

    fetchListCategory(id)
  }, [genreId])

  useEffect(() => {
    const genre = genres.find((genre) => genre.id === Number(genreId)) || {
      name: 'Genre',
    }

    setTitle(`${genre.name} TV Shows`)
  }, [genreId, genres])

  if (hasListCategoryErrors) {
    return <NotFound data-testid="category-not-found" />
  }

  return (
    <Page>
      <Container>
        <ShowList
          title={title}
          shows={category.data}
          size={size}
          isSoftLoading={isLoadingListCategory}
          data-testid="list-tv-shows-by-category"
          type="tv"
        />
        <Pagination
          className={styles.pagination}
          pages={category.pages || 0}
          current={category.page}
          isLoading={isLoadingListCategory}
          onPageChange={(page) => fetchListCategory(Number(genreId), page)}
        />
      </Container>
    </Page>
  )
}
