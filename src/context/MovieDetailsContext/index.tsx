import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { Movie, MovieCredits } from '@leandrowkz/tmdb'
import type { UserShowStates } from 'src/types'
import type { MovieDetailsState } from './types'
import { initialState } from './state'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'

export const MovieDetailsContext = createContext<MovieDetailsState>({
  ...initialState,
})

export const MovieDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const api = useMoviesAPI()

  const [movie, setMovie] = useState(initialState.movie)
  const [states, setStates] = useState(initialState.states)
  const [credits, setCredits] = useState(initialState.credits)
  const [videos, setVideos] = useState(initialState.videos)
  const [isLoading, setIsLoading] = useState(initialState.isLoading)
  const [hasErrors, setHasErrors] = useState(initialState.hasErrors)

  const fetchMovie = async (showId: number) => {
    try {
      setMovie({} as Movie)
      setIsLoading((prev) => ({ ...prev, fetchMovie: true }))
      setHasErrors((prev) => ({ ...prev, fetchMovie: false }))

      const data = await api.fetchMovie(showId)

      setMovie(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchMovie: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchMovie: false }))
    }
  }

  const fetchStates = async (showId: number) => {
    setStates({} as UserShowStates)
    setIsLoading((prev) => ({ ...prev, fetchStates: true }))
    setHasErrors((prev) => ({ ...prev, fetchStates: false }))

    const data = await api.fetchStates(showId)

    setStates(data)

    setIsLoading((prev) => ({ ...prev, fetchStates: false }))
  }

  const fetchCredits = async (showId: number) => {
    setCredits({} as MovieCredits)
    setIsLoading((prev) => ({ ...prev, fetchCredits: true }))
    setHasErrors((prev) => ({ ...prev, fetchCredits: false }))

    const data = await api.fetchCredits(showId)

    setCredits(data)

    setIsLoading((prev) => ({ ...prev, fetchCredits: false }))
  }

  const fetchVideos = async (showId: number) => {
    setVideos([])
    setIsLoading((prev) => ({ ...prev, fetchVideos: true }))
    setHasErrors((prev) => ({ ...prev, fetchVideos: false }))

    const data = await api.fetchVideos(showId)

    setVideos(data)
    setIsLoading((prev) => ({ ...prev, fetchVideos: false }))
  }

  const state = {
    movie,
    credits,
    videos,
    states,
    isLoading,
    hasErrors,
    fetchMovie,
    fetchCredits,
    fetchVideos,
    fetchStates,
    setStates,
  }

  return (
    <MovieDetailsContext.Provider value={state}>
      {children}
    </MovieDetailsContext.Provider>
  )
}
