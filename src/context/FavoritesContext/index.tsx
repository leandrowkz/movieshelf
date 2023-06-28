import React, { PropsWithChildren, createContext, useState } from 'react'
import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ShowType } from 'src/types/ShowType'
import { initialState } from './state'
import { FavoritesState } from './types'
import { useFavoritesAPI } from 'src/hooks/apis/useFavoritesAPI'
import { ListPaginated } from 'src/types/ListPaginated'

export const FavoritesContext = createContext<FavoritesState>({
  ...initialState,
})

export const FavoritesContextProvider = ({ children }: PropsWithChildren) => {
  const api = useFavoritesAPI()
  const [movies, setMovies] = useState<ListPaginated<MovieItem>>({
    ...initialState.movies,
  })
  const [tvShows, setTVShows] = useState<ListPaginated<TVShowItem>>({
    ...initialState.tvShows,
  })

  const [isLoadingAddFavorite, setIsLoadingAddFavorite] = useState(false)
  const [isLoadingRemoveFavorite, setIsLoadingRemoveFavorite] = useState(false)
  const [hasAddFavoriteErrors, setHasAddFavoriteErrors] = useState(false)
  const [hasRemoveFavoriteErrors, setHasRemoveFavoriteErrors] = useState(false)

  const fetchMoviesFavorites = async (page: number) => {
    try {
      setMovies((prev) => ({
        ...prev,
        page,
        hasErrors: false,
        isLoading: true,
      }))

      const { data, pages } = await api.fetchMovieFavorites(page)

      setMovies((prev) => ({ ...prev, data, pages }))
    } catch (e) {
      setMovies((prev) => ({ ...prev, data: [], hasErrors: true }))
    } finally {
      setMovies((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const fetchTVShowsFavorites = async (page: number) => {
    try {
      setTVShows((prev) => ({
        ...prev,
        page,
        hasErrors: false,
        isLoading: true,
      }))

      const { data, pages } = await api.fetchTVShowsFavorites(page)

      setTVShows((prev) => ({ ...prev, data, pages }))
    } catch (e) {
      setTVShows((prev) => ({ ...prev, data: [], hasErrors: true }))
    } finally {
      setTVShows((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const addFavorite = async (showId: number, showType: ShowType) => {
    try {
      setIsLoadingAddFavorite(true)
      setHasAddFavoriteErrors(false)

      await api.addFavorite(showId, showType)

      if (showType === 'movie') {
        fetchMoviesFavorites(movies.page)
      } else {
        fetchTVShowsFavorites(tvShows.page)
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
        fetchMoviesFavorites(movies.page)
      } else {
        fetchTVShowsFavorites(tvShows.page)
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
    isLoadingAddFavorite,
    isLoadingRemoveFavorite,
    hasAddFavoriteErrors,
    hasRemoveFavoriteErrors,
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
