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
import favoriteIconOn from 'src/assets/images/icon-favorite-on.svg'
import favoriteIconOff from 'src/assets/images/icon-favorite-off.svg'
import { Image } from '../Image'
import { AuthContext } from 'src/context/AuthContext'
import { UserListsContext } from 'src/context/UserListsContext'

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

  return (
    <Button
      size="large"
      variant={watchlist ? 'secondary' : 'outlined'}
      isLoading={isLoading}
      icon={
        <Image
          src={watchlist ? favoriteIconOn : favoriteIconOff}
          className={styles.icon}
        />
      }
      onClick={() => toggleWatchlist(show.id, type, watchlist)}
    >
      <span>Watchlist</span>
    </Button>
  )
}
