import React, { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react'
import { MovieAPI } from 'src/services/MovieAPI'
import { Movie } from 'src/types/Movie'
import { MovieGenre } from 'src/types/MovieGenre'
import { Nullable } from 'src/types/Nullable'

type MovieState = {
  trending: Movie[],
  mostPopular: Movie[],
  bestComedies: Movie[],
  movieDetails: Nullable<Movie>,
  fetchTrending: () => void,
  fetchMostPopular: () => void,
  fetchBestComedies: () => void,
  fetchMovieDetails: (movieId: number) => void,
}

export const MovieContext = createContext<MovieState>({
  trending: [],
  mostPopular: [],
  bestComedies: [],
  movieDetails: null,
  fetchTrending: () => {},
  fetchMostPopular: () => {},
  fetchBestComedies: () => {},
  fetchMovieDetails: () => {},
})

export const MovieContextProvider = ({ children }: PropsWithChildren) => {
  const [trending, setTrending] = useState<Movie[]>([])
  const [mostPopular, setMostPopular] = useState<Movie[]>([])
  const [bestComedies, setBestComedies] = useState<Movie[]>([])
  const [movieDetails, setMovieDetails] = useState<Nullable<Movie>>(null)

  const api = useMemo(() => new MovieAPI(), [])

  const fetchTrending = useCallback(async () => {
    const data = await api.fetchMovieListTrending()

    setTrending(data)
  }, [api])

  const fetchMostPopular = useCallback(async () => {
    const data = await api.fetchMovieListMostPopular()

    setMostPopular(data)
  }, [api])

  const fetchBestComedies = useCallback(async () => {
    const data = await api.fetchMovieListByGenre([MovieGenre.COMEDY], {  'vote_average.gte': 7.5 })

    setBestComedies(data)
  }, [api])

  const fetchMovieDetails = useCallback(async (movieId: number) => {
    const data = await api.fetchMovieDetails(movieId)

    setMovieDetails(data)
  }, [api])

  const state = {
    trending,
    mostPopular,
    bestComedies,
    movieDetails,
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
    fetchMovieDetails,
  }

  return (
    <MovieContext.Provider value={state}>
      {children}
    </MovieContext.Provider>
  )
}
