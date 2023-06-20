import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import type {
  Movie,
  MovieAccountStates,
  PersonCast,
  Video,
} from '@leandrowkz/tmdb'
import { moviesAPI } from '../services/MoviesAPI'
import { Nullable } from '../types/Nullable'

type MovieDetailsState = {
  movie: Nullable<Movie>
  accountStates: MovieAccountStates
  cast: PersonCast[]
  crew: PersonCast[]
  videos: Video[]
  isLoadingMovie: boolean
  isLoadingCredits: boolean
  isLoadingVideos: boolean
  isLoadingAccountStates: boolean
  hasMovieErrors: boolean
  fetchMovie: (movieId: number) => void
  fetchCredits: (movieId: number) => void
  fetchVideos: (movieId: number) => void
  fetchAccountStates: (movieId: number) => void
}

export const MovieDetailsContext = createContext<MovieDetailsState>({
  movie: {} as Movie,
  accountStates: {} as MovieAccountStates,
  cast: [],
  crew: [],
  videos: [],
  isLoadingMovie: false,
  isLoadingCredits: false,
  isLoadingVideos: false,
  isLoadingAccountStates: false,
  hasMovieErrors: false,
  fetchMovie: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchAccountStates: () => null,
})

export const MovieDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
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

  const fetchMovie = useCallback(
    async (movieId: number) => {
      try {
        setMovie({} as Movie)
        setIsLoadingMovie(true)
        setHasMovieErrors(false)

        const data = await moviesAPI.fetchDetails(movieId)

        setMovie(data)
      } catch (e) {
        setHasMovieErrors(true)
      } finally {
        setIsLoadingMovie(false)
      }
    },
    [moviesAPI]
  )

  const fetchCredits = useCallback(
    async (movieId: number) => {
      setIsLoadingCredits(true)

      const { cast, crew } = await moviesAPI.fetchCredits(movieId)

      setCast(cast)
      setCrew(crew)
      setIsLoadingCredits(false)
    },
    [moviesAPI]
  )

  const fetchVideos = useCallback(
    async (movieId: number) => {
      setIsLoadingVideos(true)

      const data = await moviesAPI.fetchVideos(movieId)

      setVideos(data)
      setIsLoadingVideos(false)
    },
    [moviesAPI]
  )

  const fetchAccountStates = useCallback(
    async (movieId: number) => {
      setAccountStates({} as MovieAccountStates)
      setIsLoadingAccountStates(true)

      const accountStates = await moviesAPI.fetchAccountStates(movieId)

      setAccountStates(accountStates)
      setIsLoadingAccountStates(false)
    },
    [moviesAPI]
  )

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
