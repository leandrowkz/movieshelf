import React, { HTMLAttributes, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie, TVShow } from '@leandrowkz/tmdb'
import { Button } from '../../components/Button'
import { ShowType } from 'src/types/ShowType'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'
import { MdPlaylistAdd, MdFactCheck } from 'react-icons/md'
import { UserShowStates } from 'src/types/UserShowStates'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  show: Movie | TVShow
  states: UserShowStates
  type: ShowType
}

export function WatchlistButton({ show, type, states }: Props): JSX.Element {
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

  const icon = watchlist ? <MdFactCheck color="green" /> : <MdPlaylistAdd />
  const title = watchlist ? 'Watchlist' : 'Add to watchlist'

  return (
    <Button
      size="large"
      variant="secondary"
      isLoading={isLoading}
      icon={icon}
      onClick={() => toggleWatchlist(show.id, type, watchlist)}
    >
      {title}
    </Button>
  )
}
