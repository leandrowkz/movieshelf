import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie, TVShow } from '@leandrowkz/tmdb'
import { Button, ButtonProps } from '../../components/Button'
import { ShowType } from 'src/types/ShowType'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { UserShowStates } from 'src/types/UserShowStates'

interface Props extends ButtonProps {
  show: Movie | TVShow
  states: UserShowStates
  showType: ShowType
}

export function FavoriteButton({
  show,
  showType,
  states,
  ...props
}: Props): JSX.Element {
  const navigate = useNavigate()
  const { session } = useContext(AuthContext)

  const {
    addToList,
    removeFromList,
    isLoading: isLoadingFromContext,
  } = useContext(UserListsContext)

  const { setStates: setMovieStates } = useContext(MovieDetailsContext)
  const { setStates: setTVShowStates } = useContext(TVShowDetailsContext)

  const { favorited } = states

  const isLoading = isLoadingFromContext.favorites && Boolean(session)

  const toggleFavorite = async (
    showId: number,
    type: ShowType,
    favorite: boolean
  ) => {
    if (!session) {
      return navigate('/sign-in')
    }

    const refreshedStates = !favorite
      ? await addToList('favorites', showId, type)
      : await removeFromList('favorites', showId, type)

    if (type === 'movie') {
      setMovieStates(refreshedStates)
    } else {
      setTVShowStates(refreshedStates)
    }
  }

  const icon = favorited ? <IoHeart color="red" /> : <IoHeartOutline />

  return (
    <Button
      size="large"
      variant="secondary"
      isLoading={isLoading}
      icon={icon}
      onClick={() => toggleFavorite(show.id, showType, favorited)}
      {...props}
    />
  )
}
