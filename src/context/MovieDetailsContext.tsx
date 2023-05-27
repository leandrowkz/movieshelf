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
  videos: Video[]
  isLoadingMovie: boolean
  isLoadingCast: boolean
  isLoadingVideos: boolean
  hasMovieErrors: boolean
  fetchMovie: (movieId: number) => void
  fetchCast: (movieId: number) => void
  fetchVideos: (movieId: number) => void
}

export const MovieDetailsContext = createContext<MovieDetailsState>({
  movie: {} as Movie,
  cast: [],
  videos: [],
  isLoadingMovie: false,
  isLoadingCast: false,
  isLoadingVideos: false,
  hasMovieErrors: false,
  fetchMovie: () => null,
  fetchCast: () => null,
  fetchVideos: () => null,
})

export const MovieDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [movie, setMovie] = useState<Movie>({} as Movie)
  const [cast, setCast] = useState<PersonCast[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoadingMovie, setIsLoadingMovie] = useState(false)
  const [isLoadingCast, setIsLoadingCast] = useState(false)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [hasMovieErrors, setHasMovieErrors] = useState(false)

  const fetchMovie = useCallback(
    async (movieId: number) => {
      try {
        setMovie({} as Movie)
        setIsLoadingMovie(true)

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

  const fetchCast = useCallback(
    async (movieId: number) => {
      setIsLoadingCast(true)

      const { cast } = await moviesAPI.fetchCredits(movieId)

      setCast(cast)
      setIsLoadingCast(false)
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
    videos,
    isLoadingCast,
    isLoadingMovie,
    isLoadingVideos,
    hasMovieErrors,
    fetchCast,
    fetchMovie,
    fetchVideos,
  }

  return (
    <MovieDetailsContext.Provider value={state}>
      {children}
    </MovieDetailsContext.Provider>
  )
}