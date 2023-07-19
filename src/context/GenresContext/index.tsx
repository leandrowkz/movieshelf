import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { GenreCode } from '@leandrowkz/tmdb'
import type { GenresState } from './types'
import { initialState } from './state'
import { useGenresAPI } from 'src/hooks/apis/useGenresAPI'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'
import { useTVShowsAPI } from 'src/hooks/apis/useTVShowsAPI'

export const GenresContext = createContext<GenresState>({ ...initialState })

export const GenresContextProvider = ({ children }: PropsWithChildren) => {
  const genresAPI = useGenresAPI()
  const moviesAPI = useMoviesAPI()
  const tvShowsAPI = useTVShowsAPI()

  const [moviesGenresCodes, setMoviesGenresCodes] = useState(
    initialState.moviesGenresCodes
  )
  const [moviesGenresLists, setMoviesGenresLists] = useState(
    initialState.moviesGenresLists
  )
  const [moviesGenresList, setMoviesGenresList] = useState(
    initialState.moviesGenresList
  )
  const [tvShowsGenresCodes, setTVShowsGenresCodes] = useState(
    initialState.tvShowsGenresCodes
  )
  const [tvShowsGenresLists, setTVShowsGenresLists] = useState(
    initialState.tvShowsGenresLists
  )
  const [tvShowsGenresList, setTVShowsGenresList] = useState(
    initialState.tvShowsGenresList
  )

  const [isLoading, setIsLoading] = useState(initialState.isLoading)
  const [hasErrors, setHasErrors] = useState(initialState.hasErrors)

  const fetchMoviesGenresCodes = async () => {
    try {
      setMoviesGenresCodes([])
      setIsLoading((prev) => ({ ...prev, fetchMoviesGenresCodes: true }))
      setHasErrors((prev) => ({ ...prev, fetchMoviesGenresCodes: false }))

      const data = await genresAPI.fetchMoviesGenresCodes()

      setMoviesGenresCodes(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchMoviesGenresCodes: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchMoviesGenresCodes: false }))
    }
  }

  const fetchMoviesGenresLists = async (genres: GenreCode[] = []) => {
    try {
      setMoviesGenresLists([])
      setIsLoading((prev) => ({ ...prev, fetchMoviesGenresLists: true }))
      setHasErrors((prev) => ({ ...prev, fetchMoviesGenresLists: false }))

      const data = await genresAPI.fetchMoviesGenresLists({
        with_genres: genres,
      })

      setMoviesGenresLists(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchMoviesGenresLists: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchMoviesGenresLists: false }))
    }
  }

  const fetchMoviesGenresList = async (genreId: number, filters = {}) => {
    try {
      setIsLoading((prev) => ({ ...prev, fetchMoviesGenresList: true }))
      setHasErrors((prev) => ({ ...prev, fetchMoviesGenresList: false }))

      const data = await moviesAPI.fetchListDiscover({
        ...filters,
        with_genres: [genreId],
      })

      setMoviesGenresList(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchMoviesGenresList: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchMoviesGenresList: false }))
    }
  }

  const fetchTVShowsGenresCodes = async () => {
    try {
      setTVShowsGenresCodes([])
      setIsLoading((prev) => ({ ...prev, fetchTVShowsGenresCodes: true }))
      setHasErrors((prev) => ({ ...prev, fetchTVShowsGenresCodes: false }))

      const data = await genresAPI.fetchTVShowsGenresCodes()

      setTVShowsGenresCodes(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchTVShowsGenresCodes: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchTVShowsGenresCodes: false }))
    }
  }

  const fetchTVShowsGenresLists = async (genres: GenreCode[] = []) => {
    try {
      setTVShowsGenresLists([])
      setIsLoading((prev) => ({ ...prev, fetchTVShowsGenresLists: true }))
      setHasErrors((prev) => ({ ...prev, fetchTVShowsGenresLists: false }))

      const data = await genresAPI.fetchTVShowsGenresLists({
        with_genres: genres,
      })

      setTVShowsGenresLists(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchTVShowsGenresLists: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchTVShowsGenresLists: false }))
    }
  }

  const fetchTVShowsGenresList = async (genreId: number, filters = {}) => {
    try {
      setIsLoading((prev) => ({ ...prev, fetchTVShowsGenresList: true }))
      setHasErrors((prev) => ({ ...prev, fetchTVShowsGenresList: false }))

      const data = await tvShowsAPI.fetchListDiscover({
        ...filters,
        with_genres: [genreId],
      })

      setTVShowsGenresList(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchTVShowsGenresList: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchTVShowsGenresList: false }))
    }
  }

  const state = {
    moviesGenresList,
    moviesGenresLists,
    moviesGenresCodes,

    tvShowsGenresList,
    tvShowsGenresLists,
    tvShowsGenresCodes,

    isLoading,
    hasErrors,

    fetchMoviesGenresList,
    fetchMoviesGenresLists,
    fetchMoviesGenresCodes,

    fetchTVShowsGenresList,
    fetchTVShowsGenresLists,
    fetchTVShowsGenresCodes,
  }

  return (
    <GenresContext.Provider value={state}>{children}</GenresContext.Provider>
  )
}
