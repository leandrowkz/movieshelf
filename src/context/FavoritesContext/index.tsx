import React, { PropsWithChildren, createContext, useState } from 'react'
import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ShowType } from 'src/types/ShowType'
import { initialState } from './state'
import { FavoritesState } from './types'
import { useFavoritesAPI } from 'src/hooks/apis/useFavoritesAPI'

export const FavoritesContext = createContext<FavoritesState>({
  ...initialState,
})

export const FavoritesContextProvider = ({ children }: PropsWithChildren) => {
  const api = useFavoritesAPI()
  const [movies, setMovies] = useState<MovieItem[]>([])
  const [tvShows, setTVShows] = useState<TVShowItem[]>([])
  const [isLoadingAddFavorite, setIsLoadingAddFavorite] = useState(false)
  const [isLoadingRemoveFavorite, setIsLoadingRemoveFavorite] = useState(false)
  const [isLoadingMoviesFavorites, setIsLoadingMoviesFavorites] =
    useState(false)
  const [isLoadingTVShowsFavorites, setIsLoadingTVShowsFavorites] =
    useState(false)
  const [hasMoviesFavoritesErrors, setHasMoviesFavoritesErrors] =
    useState(false)
  const [hasTVShowsFavoritesErrors, setHasTVShowsFavoritesErrors] =
    useState(false)
  const [hasAddFavoriteErrors, setHasAddFavoriteErrors] = useState(false)
  const [hasRemoveFavoriteErrors, setHasRemoveFavoriteErrors] = useState(false)

  const fetchMoviesFavorites = async () => {
    try {
      setMovies([])
      setIsLoadingMoviesFavorites(true)
      setHasMoviesFavoritesErrors(false)

      const data = await api.fetchMovieFavorites()

      setMovies(data)
    } catch (e) {
      setHasMoviesFavoritesErrors(true)
    } finally {
      setIsLoadingMoviesFavorites(false)
    }
  }

  const fetchTVShowsFavorites = async () => {
    try {
      setTVShows([])
      setIsLoadingTVShowsFavorites(true)
      setHasTVShowsFavoritesErrors(false)

      const data = await api.fetchTVShowsFavorites()

      setTVShows(data)
    } catch (e) {
      setHasTVShowsFavoritesErrors(true)
    } finally {
      setIsLoadingTVShowsFavorites(false)
    }
  }

  const addFavorite = async (showId: number, showType: ShowType) => {
    try {
      setIsLoadingAddFavorite(true)
      setHasAddFavoriteErrors(false)

      await api.addFavorite(showId, showType)

      if (showType === 'movie') {
        fetchMoviesFavorites()
      } else {
        fetchTVShowsFavorites()
      }
    } catch (e) {
      setHasAddFavoriteErrors(true)
    } finally {
      setIsLoadingAddFavorite(false)
    }
  }

  const removeFavorite = async (showId: number, showType: ShowType) => {
    try {
      setIsLoadingRemoveFavorite(true)
      setHasRemoveFavoriteErrors(false)

      await api.removeFavorite(showId, showType)

      if (showType === 'movie') {
        fetchMoviesFavorites()
      } else {
        fetchTVShowsFavorites()
      }
    } catch (e) {
      setHasRemoveFavoriteErrors(true)
    } finally {
      setIsLoadingRemoveFavorite(false)
    }
  }

  const state = {
    movies,
    tvShows,
    isLoadingMoviesFavorites,
    isLoadingTVShowsFavorites,
    isLoadingAddFavorite,
    isLoadingRemoveFavorite,
    hasAddFavoriteErrors,
    hasRemoveFavoriteErrors,
    hasMoviesFavoritesErrors,
    hasTVShowsFavoritesErrors,
    fetchMoviesFavorites,
    fetchTVShowsFavorites,
    addFavorite,
    removeFavorite,
  }

  return (
    <FavoritesContext.Provider value={state}>
      {children}
    </FavoritesContext.Provider>
  )
}
