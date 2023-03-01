import React, { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react'
import { MovieAPI } from 'src/services/MovieAPI'
import { Movie } from 'src/types/Movie'
import { MovieGenre } from 'src/types/MovieGenre'
import { Nullable } from 'src/types/Nullable'

type MovieState = {
  movieDetails: Nullable<Movie>,
  trending: Movie[],
  mostPopular: Movie[],
  bestComedies: Movie[],
  scifiAndFantasy: Movie[],
  fetchMovieDetails: (movieId: number) => void,
  fetchTrending: () => void,
  fetchMostPopular: () => void,
  fetchBestComedies: () => void,
  fetchScifiAndFantasy: () => void,
}

export const MovieContext = createContext<MovieState>({
  movieDetails: null,
  trending: [],
  mostPopular: [],
  bestComedies: [],
  scifiAndFantasy: [],
  fetchMovieDetails: () => {},
  fetchTrending: () => {},
  fetchMostPopular: () => {},
  fetchBestComedies: () => {},
  fetchScifiAndFantasy: () => {},
})

export const MovieContextProvider = ({ children }: PropsWithChildren) => {
  const [movieDetails, setMovieDetails] = useState<Nullable<Movie>>(null)
  const [trending, setTrending] = useState<Movie[]>([])
  const [mostPopular, setMostPopular] = useState<Movie[]>([])
  const [bestComedies, setBestComedies] = useState<Movie[]>([])
  const [scifiAndFantasy, setScifiAndFantasy] = useState<Movie[]>([])

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

  const fetchScifiAndFantasy = useCallback(async () => {
    const data = await api.fetchMovieListByGenre([MovieGenre.SCIENCE_FICTION, MovieGenre.FANTASY])

    setScifiAndFantasy(data)
  }, [api])

  const fetchMovieDetails = useCallback(async (movieId: number) => {
    const data = await api.fetchMovieDetails(movieId)

    setMovieDetails(data)
  }, [api])

  const state = {
    movieDetails,
    trending,
    mostPopular,
    bestComedies,
    scifiAndFantasy,
    fetchMovieDetails,
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
  }

  return (
    <MovieContext.Provider value={state}>
      {children}
    </MovieContext.Provider>
  )
}
