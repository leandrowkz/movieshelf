import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie, TVShow } from '@leandrowkz/tmdb'
import type { ShowType, UserShowStates } from 'src/types'
import { Button, type ButtonProps } from '../../components/Button'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'
import { MdPlaylistAdd, MdFactCheck } from 'react-icons/md'

interface Props extends ButtonProps {
  show: Movie | TVShow
  states: UserShowStates
}

export function WatchlistButton({ show, states, ...rest }: Props): JSX.Element {
  const navigate = useNavigate()
  const { session } = useContext(AuthContext)

  const {
    addToList,
    removeFromList,
    isLoading: isLoadingFromContext,
  } = useContext(UserListsContext)

  const { setStates: setMovieStates } = useContext(MovieDetailsContext)
  const { setStates: setTVShowStates } = useContext(TVShowDetailsContext)

  const { watchlist } = states

  const isLoading = isLoadingFromContext.watchlist && Boolean(session)

  const toggleWatchlist = async (
    showId: number,
    type: ShowType,
    watchlist: boolean
  ) => {
    if (!session) {
      return navigate('/sign-in')
    }

    const refreshedStates = !watchlist
      ? await addToList('watchlist', showId, type)
      : await removeFromList('watchlist', showId, type)

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

  if (watchlist) {
    buttonProps.icon = <MdFactCheck color="green" />
    buttonProps.title = 'Watchlist'
    buttonProps.dataTestId = 'button-on'
  } else {
    buttonProps.icon = <MdPlaylistAdd />
    buttonProps.title = 'Add to watchlist'
    buttonProps.dataTestId = 'button-off'
  }

  return (
    <Button
      {...rest}
      variant="secondary"
      isLoading={isLoading}
      icon={buttonProps.icon}
      onClick={() =>
        toggleWatchlist(show.id, show.media_type || 'movie', watchlist)
      }
      data-testid={buttonProps.dataTestId}
    >
      {buttonProps.title}
    </Button>
  )
}
