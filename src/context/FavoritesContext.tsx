import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { api } from '../services/GenresAPI'
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
  addFavorite: (showId: number, showType: ShowType) => void
  removeFavorite: (showId: number, showType: ShowType) => void
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
  addFavorite: () => null,
  removeFavorite: () => null,
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

      // const data = await api.fetchMoviesGenres()

      setMovies([])
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

      // const data = await api.fetchMoviesGenres()

      setTVShows([])
    } catch (e) {
      setHasTVShowsFavoritesErrors(true)
    } finally {
      setIsLoadingTVShowsFavorites(false)
    }
  }, [api])

  const addFavorite = useCallback(
    async (showId: number, showType: ShowType) => {
      try {
        setIsLoadingAddFavorite(true)
        setHasAddFavoriteErrors(false)

        if (showType === 'movie') {
          // const data = await api.fetchMoviesGenres()
          fetchMoviesFavorites()
        } else {
          // const data = await api.fetchMoviesGenres()
          fetchTVShowsFavorites()
        }
      } catch (e) {
        setHasAddFavoriteErrors(true)
      } finally {
        setIsLoadingAddFavorite(false)
      }
    },
    [api]
  )

  const removeFavorite = useCallback(
    async (showId: number, showType: ShowType) => {
      try {
        setIsLoadingRemoveFavorite(true)
        setHasRemoveFavoriteErrors(false)

        if (showType === 'movie') {
          // const data = await api.fetchMoviesGenres()
          fetchMoviesFavorites()
        } else {
          // const data = await api.fetchMoviesGenres()
          fetchTVShowsFavorites()
        }
      } catch (e) {
        setHasRemoveFavoriteErrors(true)
      } finally {
        setIsLoadingRemoveFavorite(false)
      }
    },
    [api]
  )

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
