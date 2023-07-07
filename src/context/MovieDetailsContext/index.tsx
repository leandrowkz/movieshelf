import React, { PropsWithChildren, createContext, useState } from 'react'
import type { Movie, PersonCast, Video } from '@leandrowkz/tmdb'
import { MovieDetailsState } from './types'
import { initialState } from './state'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'
import { UserShowStates } from 'src/types/UserShowStates'

export const MovieDetailsContext = createContext<MovieDetailsState>({
  ...initialState,
})

export const MovieDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const api = useMoviesAPI()
  const [movie, setMovie] = useState<Movie>({} as Movie)
  const [states, setStates] = useState<UserShowStates>({} as UserShowStates)
  const [cast, setCast] = useState<PersonCast[]>([])
  const [crew, setCrew] = useState<PersonCast[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoadingMovie, setIsLoadingMovie] = useState(false)
  const [isLoadingCredits, setIsLoadingCredits] = useState(false)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [isLoadingStates, setIsLoadingStates] = useState(false)
  const [hasMovieErrors, setHasMovieErrors] = useState(false)

  const fetchMovie = async (movieId: number) => {
    try {
      setMovie({} as Movie)
      setIsLoadingMovie(true)
      setHasMovieErrors(false)

      const data = await api.fetchDetails(movieId)

      setMovie(data)
    } catch (e) {
      setHasMovieErrors(true)
    } finally {
      setIsLoadingMovie(false)
    }
  }

  const fetchCredits = async (movieId: number) => {
    setIsLoadingCredits(true)

    const { cast, crew } = await api.fetchCredits(movieId)

    setCast(cast)
    setCrew(crew)
    setIsLoadingCredits(false)
  }

  const fetchVideos = async (movieId: number) => {
    setIsLoadingVideos(true)

    const data = await api.fetchVideos(movieId)

    setVideos(data)
    setIsLoadingVideos(false)
  }

  const fetchStates = async (movieId: number) => {
    setStates({} as UserShowStates)
    setIsLoadingStates(true)

    const states = await api.fetchStates(movieId)

    setStates(states)
    setIsLoadingStates(false)
  }

  const state = {
    movie,
    cast,
    crew,
    videos,
    states,
    isLoadingCredits,
    isLoadingMovie,
    isLoadingVideos,
    isLoadingStates,
    hasMovieErrors,
    fetchCredits,
    fetchMovie,
    fetchVideos,
    fetchStates,
  }

  return (
    <MovieDetailsContext.Provider value={state}>
      {children}
    </MovieDetailsContext.Provider>
  )
}
