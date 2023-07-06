import React, { HTMLAttributes, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  Movie,
  MovieAccountStates,
  TVShow,
  TVShowAccountStates,
} from '@leandrowkz/tmdb'
import { Button } from '../../components/Button'
import { ShowType } from 'src/types/ShowType'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'
import { MdPlaylistAdd, MdFactCheck } from 'react-icons/md'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  show: Movie | TVShow
  accountStates: MovieAccountStates | TVShowAccountStates
  type: ShowType
}

export function WatchlistButton({
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

  const { watchlist } = accountStates
  const {
    addToList: isLoadingAddWatchlist,
    removeFromList: isLoadingRemoveWatchlist,
  } = isLoadingFromContext

  const isLoading =
    (isLoadingAddWatchlist ||
      isLoadingRemoveWatchlist ||
      isLoadingMovieAccountStates ||
      isLoadingTVShowAccountStates) &&
    Boolean(session)

  const toggleWatchlist = async (
    showId: number,
    type: ShowType,
    watchlist: boolean
  ) => {
    if (!session) {
      return navigate('/sign-in')
    }

    if (!watchlist) {
      await addToList('watchlist', showId, type)
    } else {
      await removeFromList('watchlist', showId, type)
    }

    if (type === 'movie') {
      fetchMovieAccountStates(showId)
    } else {
      fetchTVShowAccountStates(showId)
    }
  }

  const icon = watchlist ? <MdFactCheck color="green" /> : <MdPlaylistAdd />
  const title = watchlist ? 'My list' : 'Add to my list'

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
