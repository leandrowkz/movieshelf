import React, { HTMLAttributes, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie, TVShow } from '@leandrowkz/tmdb'
import { Button } from '../../components/Button'
import { ShowType } from 'src/types/ShowType'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { UserShowStates } from 'src/types/UserShowStates'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  show: Movie | TVShow
  states: UserShowStates
  type: ShowType
}

export function FavoriteButton({ show, type, states }: Props): JSX.Element {
  const navigate = useNavigate()
  const { session } = useContext(AuthContext)

  const {
    addToList,
    removeFromList,
    isLoading: isLoadingFromContext,
  } = useContext(UserListsContext)

  const {
    fetchStates: fetchMovieStates,
    isLoadingStates: isLoadingMovieStates,
  } = useContext(MovieDetailsContext)

  const {
    fetchStates: fetchTVShowStates,
    isLoadingStates: isLoadingTVShowStates,
  } = useContext(TVShowDetailsContext)

  const { favorited } = states

  const {
    addToList: isLoadingAddFavorite,
    removeFromList: isLoadingRemoveFavorite,
  } = isLoadingFromContext

  const isLoading =
    (isLoadingAddFavorite ||
      isLoadingRemoveFavorite ||
      isLoadingMovieStates ||
      isLoadingTVShowStates) &&
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
      fetchMovieStates(showId)
    } else {
      fetchTVShowStates(showId)
    }
  }

  const icon = favorited ? <IoHeart color="red" /> : <IoHeartOutline />

  return (
    <Button
      size="large"
      variant="secondary"
      isLoading={isLoading}
      icon={icon}
      onClick={() => toggleFavorite(show.id, type, favorited)}
    />
  )
}
