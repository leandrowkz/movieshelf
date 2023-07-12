import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { Genre } from '@leandrowkz/tmdb'
import type { GenresState } from './types'
import { initialState } from './state'
import { useGenresAPI } from 'src/hooks/apis/useGenresAPI'

export const GenresContext = createContext<GenresState>({ ...initialState })

export const GenresContextProvider = ({ children }: PropsWithChildren) => {
  const api = useGenresAPI()
  const [tvShowsGenres, setTVShowsGenres] = useState<Genre[]>([])
  const [moviesGenres, setMoviesGenres] = useState<Genre[]>([])
  const [isLoadingMoviesGenres, setIsLoadingMoviesGenres] = useState(false)
  const [hasMoviesGenresErrors, setHasMoviesGenresErrors] = useState(false)
  const [isLoadingTVShowsGenres, setIsLoadingTVShowsGenres] = useState(false)
  const [hasTVShowsGenresErrors, setHasTVShowsGenresErrors] = useState(false)

  const fetchMoviesGenres = async () => {
    try {
      setMoviesGenres([])
      setIsLoadingMoviesGenres(true)
      setHasMoviesGenresErrors(false)

      const data = await api.fetchMoviesGenres()

      setMoviesGenres(data)
    } catch (e) {
      setHasMoviesGenresErrors(true)
    } finally {
      setIsLoadingMoviesGenres(false)
    }
  }

  const fetchTVShowsGenres = async () => {
    try {
      setTVShowsGenres([])
      setIsLoadingTVShowsGenres(true)
      setHasTVShowsGenresErrors(false)

      const data = await api.fetchTVShowsGenres()

      setTVShowsGenres(data)
    } catch (e) {
      setHasTVShowsGenresErrors(true)
    } finally {
      setIsLoadingTVShowsGenres(false)
    }
  }

  const state = {
    moviesGenres,
    tvShowsGenres,
    isLoadingMoviesGenres,
    isLoadingTVShowsGenres,
    hasMoviesGenresErrors,
    hasTVShowsGenresErrors,
    fetchMoviesGenres,
    fetchTVShowsGenres,
  }

  return (
    <GenresContext.Provider value={state}>{children}</GenresContext.Provider>
  )
}
