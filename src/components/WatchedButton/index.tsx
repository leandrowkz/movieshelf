import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie, TVShow } from '@leandrowkz/tmdb'
import { Button, type ButtonProps } from '../../components/Button'
import type { ShowType, UserShowStates } from 'src/types'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { ImEyePlus } from 'react-icons/im'

interface Props extends ButtonProps {
  show: Movie | TVShow
  states: UserShowStates
  isSmallDevice?: boolean
}

export function WatchedButton({
  show,
  states,
  isSmallDevice = false,
  ...rest
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

  const { watched = false } = states

  const isLoading = isLoadingFromContext.watched && Boolean(session)

  const toggleWatched = async (
    showId: number,
    type: ShowType,
    watched: boolean
  ) => {
    if (!session) {
      return navigate('/sign-in')
    }

    const refreshedStates = !watched
      ? await addToList('watched', showId, type)
      : await removeFromList('watched', showId, type)

    if (type === 'movie') {
      setMovieStates(refreshedStates)
    } else {
      setTVShowStates(refreshedStates)
    }
  }

  const buttonProps = {
    icon: <></>,
    title: '',
    dataTestId: '',
  }

  if (watched) {
    buttonProps.icon = <IoCheckmarkDoneCircle color="green" />
    buttonProps.title = 'Watched'
    buttonProps.dataTestId = 'button-on'
  } else {
    buttonProps.icon = <ImEyePlus />
    buttonProps.title = 'Add to watched'
    buttonProps.dataTestId = 'button-off'
  }

  return (
    <Button
      {...rest}
      variant="secondary"
      isLoading={isLoading}
      icon={buttonProps.icon}
      onClick={() =>
        toggleWatched(show.id, show.media_type || 'movie', watched)
      }
      data-testid={buttonProps.dataTestId}
    >
      {!isSmallDevice && buttonProps.title}
    </Button>
  )
}
