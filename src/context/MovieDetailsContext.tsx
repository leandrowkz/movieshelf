import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import type { Movie, PersonCast, Video } from '@leandrowkz/tmdb'
import { moviesAPI } from '../services/MoviesAPI'
import { Nullable } from '../types/Nullable'

type MovieDetailsState = {
  movie: Nullable<Movie>
  cast: PersonCast[]
  crew: PersonCast[]
  videos: Video[]
  isLoadingMovie: boolean
  isLoadingCredits: boolean
  isLoadingVideos: boolean
  hasMovieErrors: boolean
  fetchMovie: (movieId: number) => void
  fetchCredits: (movieId: number) => void
  fetchVideos: (movieId: number) => void
}

export const MovieDetailsContext = createContext<MovieDetailsState>({
  movie: {} as Movie,
  cast: [],
  crew: [],
  videos: [],
  isLoadingMovie: false,
  isLoadingCredits: false,
  isLoadingVideos: false,
  hasMovieErrors: false,
  fetchMovie: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
})

export const MovieDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [movie, setMovie] = useState<Movie>({} as Movie)
  const [cast, setCast] = useState<PersonCast[]>([])
  const [crew, setCrew] = useState<PersonCast[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoadingMovie, setIsLoadingMovie] = useState(false)
  const [isLoadingCredits, setIsLoadingCredits] = useState(false)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
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

  const state = {
    movie,
    cast,
    crew,
    videos,
    isLoadingCredits,
    isLoadingMovie,
    isLoadingVideos,
    hasMovieErrors,
    fetchCredits,
    fetchMovie,
    fetchVideos,
  }

  return (
    <MovieDetailsContext.Provider value={state}>
      {children}
    </MovieDetailsContext.Provider>
  )
}
