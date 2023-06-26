import React, { PropsWithChildren, createContext, useState } from 'react'
import type {
  Movie,
  MovieAccountStates,
  PersonCast,
  Video,
} from '@leandrowkz/tmdb'
import { MovieDetailsState } from './types'
import { initialState } from './state'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'

export const MovieDetailsContext = createContext<MovieDetailsState>({
  ...initialState,
})

export const MovieDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const api = useMoviesAPI()
  const [movie, setMovie] = useState<Movie>({} as Movie)
  const [accountStates, setAccountStates] = useState<MovieAccountStates>(
    {} as MovieAccountStates
  )
  const [cast, setCast] = useState<PersonCast[]>([])
  const [crew, setCrew] = useState<PersonCast[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoadingMovie, setIsLoadingMovie] = useState(false)
  const [isLoadingCredits, setIsLoadingCredits] = useState(false)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [isLoadingAccountStates, setIsLoadingAccountStates] = useState(false)
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

  const fetchAccountStates = async (movieId: number) => {
    setAccountStates({} as MovieAccountStates)
    setIsLoadingAccountStates(true)

    const accountStates = await api.fetchAccountStates(movieId)

    setAccountStates(accountStates)
    setIsLoadingAccountStates(false)
  }

  const state = {
    movie,
    cast,
    crew,
    videos,
    accountStates,
    isLoadingCredits,
    isLoadingMovie,
    isLoadingVideos,
    isLoadingAccountStates,
    hasMovieErrors,
    fetchCredits,
    fetchMovie,
    fetchVideos,
    fetchAccountStates,
  }

  return (
    <MovieDetailsContext.Provider value={state}>
      {children}
    </MovieDetailsContext.Provider>
  )
}
