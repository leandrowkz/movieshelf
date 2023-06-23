import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { api } from '../services/FavoritesAPI'
import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ShowType } from 'src/types/ShowType'

type FavoritesState = {
  movies: MovieItem[]
  tvShows: TVShowItem[]
  isLoadingMoviesFavorites: boolean
  isLoadingTVShowsFavorites: boolean
  isLoadingAddFavorite: boolean
  isLoadingRemoveFavorite: boolean
  hasMoviesFavoritesErrors: boolean
  hasTVShowsFavoritesErrors: boolean
  hasAddFavoriteErrors: boolean
  hasRemoveFavoriteErrors: boolean
  fetchMoviesFavorites: () => void
  fetchTVShowsFavorites: () => void
  addFavorite: (showId: number, showType: ShowType) => Promise<void>
  removeFavorite: (showId: number, showType: ShowType) => Promise<void>
}

export const FavoritesContext = createContext<FavoritesState>({
  movies: [],
  tvShows: [],
  isLoadingMoviesFavorites: false,
  isLoadingTVShowsFavorites: false,
  isLoadingAddFavorite: false,
  isLoadingRemoveFavorite: false,
  hasAddFavoriteErrors: false,
  hasRemoveFavoriteErrors: false,
  hasMoviesFavoritesErrors: false,
  hasTVShowsFavoritesErrors: false,
  fetchMoviesFavorites: () => null,
  fetchTVShowsFavorites: () => null,
  addFavorite: () => Promise.resolve(),
  removeFavorite: () => Promise.resolve(),
})

export const FavoritesContextProvider = ({ children }: PropsWithChildren) => {
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

  const fetchMoviesFavorites = useCallback(async () => {
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
  }, [api])

  const fetchTVShowsFavorites = useCallback(async () => {
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
  }, [api])

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
