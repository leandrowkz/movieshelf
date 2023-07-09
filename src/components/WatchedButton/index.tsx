import React, { HTMLAttributes, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie, TVShow } from '@leandrowkz/tmdb'
import { Button } from '../../components/Button'
import { ShowType } from 'src/types/ShowType'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { TbEyeCheck } from 'react-icons/tb'
import { UserShowStates } from 'src/types/UserShowStates'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  show: Movie | TVShow
  states: UserShowStates
  type: ShowType
}

export function WatchedButton({ show, type, states }: Props): JSX.Element {
  const navigate = useNavigate()
  const { session } = useContext(AuthContext)

  const {
    addToList,
    removeFromList,
    isLoading: isLoadingFromContext,
  } = useContext(UserListsContext)

  const { setStates: setMovieStates } = useContext(MovieDetailsContext)
  const { setStates: setTVShowStates } = useContext(TVShowDetailsContext)

  const { watched } = states

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

  const buttonData = {
    icon: <></>,
    title: '',
  }

  if (watched) {
    buttonData.icon = <IoCheckmarkDoneCircle color="green" />
    buttonData.title = 'Watched'
  } else {
    buttonData.icon = <TbEyeCheck />
    buttonData.title = 'Add to watched'
  }

  return (
    <Button
      size="large"
      variant="secondary"
      isLoading={isLoading}
      icon={buttonData.icon}
      onClick={() => toggleWatched(show.id, type, watched)}
    >
      {buttonData.title}
    </Button>
  )
}
