import React, { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react'
import { MovieAPI } from 'src/services/MovieAPI'
import { Movie } from 'src/types/Movie'
import { MovieGenre } from 'src/types/MovieGenre'

type MovieState = {
  trending: Movie[],
  mostPopular: Movie[],
  bestComedies: Movie[],
  fetchTrending: () => void,
  fetchMostPopular: () => void,
  fetchBestComedies: () => void,
}

export const MovieContext = createContext<MovieState>({
  trending: [],
  mostPopular: [],
  bestComedies: [],
  fetchTrending: () => {},
  fetchMostPopular: () => {},
  fetchBestComedies: () => {},
})

export const MovieContextProvider = ({ children }: PropsWithChildren) => {
  const [trending, setTrending] = useState<Movie[]>([])
  const [mostPopular, setMostPopular] = useState<Movie[]>([])
  const [bestComedies, setBestComedies] = useState<Movie[]>([])

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
    const data = await api.fetchMovieListByGenre([MovieGenre.COMEDY], {  'vote_average.gte': 8 })

    setBestComedies(data)
  }, [api])

  const state = {
    trending,
    mostPopular,
    bestComedies,
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
  }

  return (
    <MovieContext.Provider value={state}>
      {children}
    </MovieContext.Provider>
  )
}
