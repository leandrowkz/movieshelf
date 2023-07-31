import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie, TVShow } from '@leandrowkz/tmdb'
import { toast } from 'react-toastify'
import type { ShowType, UserShowStates } from 'src/types'
import { type ButtonProps, Button } from '../../components/Button'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'

interface Props extends ButtonProps {
  show: Movie | TVShow
  states: UserShowStates
}

export function FavoriteButton({ show, states, ...props }: Props): JSX.Element {
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

    let refreshedStates, toastTitle, toastIcon

    if (!favorite) {
      refreshedStates = await addToList('favorites', showId, type)
      toastTitle = 'Added to your favorites list'
      toastIcon = <IoHeart color="red" />
    } else {
      refreshedStates = await removeFromList('favorites', showId, type)
      toastTitle = 'Removed from your favorites list'
      toastIcon = <IoHeartOutline />
    }

    toast(toastTitle, { icon: toastIcon })

    if (type === 'movie') {
      setMovieStates(refreshedStates)
    } else {
      setTVShowStates(refreshedStates)
    }
  }

  const buttonProps = {
    icon: <></>,
    dataTestId: '',
  }

  if (favorited) {
    buttonProps.icon = <IoHeart color="red" />
    buttonProps.dataTestId = 'button-on'
  } else {
    buttonProps.icon = <IoHeartOutline />
    buttonProps.dataTestId = 'button-off'
  }

  return (
    <Button
      size="large"
      variant="secondary"
      isLoading={isLoading}
      icon={buttonProps.icon}
      onClick={() =>
        toggleFavorite(show.id, show.media_type || 'movie', favorited)
      }
      data-testid={buttonProps.dataTestId}
      {...props}
    />
  )
}
