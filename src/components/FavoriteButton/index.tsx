import React, { HTMLAttributes, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  Movie,
  MovieAccountStates,
  TVShow,
  TVShowAccountStates,
} from '@leandrowkz/tmdb'
import { Button } from '../../components/Button'
import styles from './styles.module.css'
import { ShowType } from 'src/types/ShowType'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  show: Movie | TVShow
  accountStates: MovieAccountStates | TVShowAccountStates
  type: ShowType
}

export function FavoriteButton({
  show,
  type,
  accountStates,
}: Props): JSX.Element {
  const navigate = useNavigate()
  const { session } = useContext(AuthContext)
  const {
    addToList,
    removeFromList,
    isLoading: isLoadingFromContext,
  } = useContext(UserListsContext)
  const {
    fetchAccountStates: fetchMovieAccountStates,
    isLoadingAccountStates: isLoadingMovieAccountStates,
  } = useContext(MovieDetailsContext)
  const {
    fetchAccountStates: fetchTVShowAccountStates,
    isLoadingAccountStates: isLoadingTVShowAccountStates,
  } = useContext(TVShowDetailsContext)

  const { favorite } = accountStates
  const {
    addToList: isLoadingAddFavorite,
    removeFromList: isLoadingRemoveFavorite,
  } = isLoadingFromContext

  const isLoading =
    (isLoadingAddFavorite ||
      isLoadingRemoveFavorite ||
      isLoadingMovieAccountStates ||
      isLoadingTVShowAccountStates) &&
    Boolean(session)

  const toggleFavorite = async (
    showId: number,
    type: ShowType,
    favorite: boolean
  ) => {
    if (!session) {
      return navigate('/sign-in')
    }

    if (!favorite) {
      await addToList('favorites', showId, type)
    } else {
      await removeFromList('favorites', showId, type)
    }

    if (type === 'movie') {
      fetchMovieAccountStates(showId)
    } else {
      fetchTVShowAccountStates(showId)
    }
  }

  const icon = favorite ? <IoHeartSharp /> : <IoHeartOutline />

  return (
    <Button
      size="large"
      variant={favorite ? 'secondary' : 'outlined'}
      isLoading={isLoading}
      icon={icon}
      onClick={() => toggleFavorite(show.id, type, favorite)}
    />
  )
}
