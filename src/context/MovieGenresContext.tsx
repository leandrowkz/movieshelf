import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { moviesAPI } from '../services/MoviesAPI'
import type { Genre } from '@leandrowkz/tmdb'

type MovieGenresState = {
  genres: Genre[]
  isLoadingGenres: boolean
  hasErrors: boolean
  fetchGenres: () => void
}

export const MovieGenresContext = createContext<MovieGenresState>({
  genres: [],
  isLoadingGenres: false,
  hasErrors: false,
  fetchGenres: () => null,
})

export const MovieGenresContextProvider = ({ children }: PropsWithChildren) => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoadingGenres, setIsLoadingGenres] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  const fetchGenres = useCallback(async () => {
    try {
      setGenres([])
      setIsLoadingGenres(true)

      const data = await moviesAPI.fetchGenres()

      setGenres(data)
    } catch (e) {
      setHasErrors(true)
    } finally {
      setIsLoadingGenres(false)
    }
  }, [moviesAPI])

  const state = {
    genres,
    isLoadingGenres,
    hasErrors,
    fetchGenres,
  }

  return (
    <MovieGenresContext.Provider value={state}>
      {children}
    </MovieGenresContext.Provider>
  )
}
