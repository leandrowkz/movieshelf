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
import { FavoritesContext } from 'src/context/FavoritesContext'
import { ShowType } from 'src/types/ShowType'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import favoriteIconOn from 'src/assets/images/icon-favorite-on.svg'
import favoriteIconOff from 'src/assets/images/icon-favorite-off.svg'
import { Image } from '../Image'
import { AuthContext } from 'src/context/AuthContext'

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
    addFavorite,
    removeFavorite,
    isLoadingAddFavorite,
    isLoadingRemoveFavorite,
  } = useContext(FavoritesContext)
  const {
    fetchAccountStates: fetchMovieAccountStates,
    isLoadingAccountStates: isLoadingMovieAccountStates,
  } = useContext(MovieDetailsContext)
  const {
    fetchAccountStates: fetchTVShowAccountStates,
    isLoadingAccountStates: isLoadingTVShowAccountStates,
  } = useContext(TVShowDetailsContext)

  const { favorite } = accountStates

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
      await addFavorite(showId, type)
    } else {
      await removeFavorite(showId, type)
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
      variant={favorite ? 'secondary' : 'outlined'}
      isLoading={isLoading}
      icon={
        <Image
          src={favorite ? favoriteIconOn : favoriteIconOff}
          className={styles.icon}
        />
      }
      onClick={() => toggleFavorite(show.id, type, favorite)}
    >
      <span>{favorite ? 'Favorited' : 'Favorite'}</span>
    </Button>
  )
}