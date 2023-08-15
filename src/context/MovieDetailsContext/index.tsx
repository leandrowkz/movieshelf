import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { CountryCode, Movie, MovieCredits } from '@leandrowkz/tmdb'
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
  const [providers, setProviders] = useState(initialState.providers)
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
    try {
      setStates({} as UserShowStates)
      setIsLoading((prev) => ({ ...prev, fetchStates: true }))
      setHasErrors((prev) => ({ ...prev, fetchStates: false }))

      const data = await api.fetchStates(showId)

      setStates(data)
    } catch {
      setHasErrors((prev) => ({ ...prev, fetchStates: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchStates: false }))
    }
  }

  const fetchCredits = async (showId: number) => {
    try {
      setCredits({} as MovieCredits)
      setIsLoading((prev) => ({ ...prev, fetchCredits: true }))
      setHasErrors((prev) => ({ ...prev, fetchCredits: false }))

      const data = await api.fetchCredits(showId)

      setCredits(data)
    } catch {
      setHasErrors((prev) => ({ ...prev, fetchCredits: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchCredits: false }))
    }
  }

  const fetchVideos = async (showId: number) => {
    try {
      setVideos([])
      setIsLoading((prev) => ({ ...prev, fetchVideos: true }))
      setHasErrors((prev) => ({ ...prev, fetchVideos: false }))

      const data = await api.fetchVideos(showId)

      setVideos(data)
    } catch {
      setHasErrors((prev) => ({ ...prev, fetchVideos: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchVideos: false }))
    }
  }

  const fetchProviders = async (showId: number, country: CountryCode) => {
    try {
      localStorage.setItem('WATCH_PROVIDER_COUNTRY', country)
      setProviders([])
      setIsLoading((prev) => ({ ...prev, fetchProviders: true }))
      setHasErrors((prev) => ({ ...prev, fetchProviders: false }))

      const data = await api.fetchWatchProviders(showId, country)

      setProviders(data)
    } catch {
      setHasErrors((prev) => ({ ...prev, fetchProviders: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchProviders: false }))
    }
  }

  const state = {
    movie,
    credits,
    videos,
    states,
    providers,
    isLoading,
    hasErrors,
    fetchMovie,
    fetchCredits,
    fetchVideos,
    fetchStates,
    fetchProviders,
    setStates,
  }

  return (
    <MovieDetailsContext.Provider value={state}>
      {children}
    </MovieDetailsContext.Provider>
  )
}
