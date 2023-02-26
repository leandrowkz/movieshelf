import React, { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react'
import { MovieAPI } from 'src/services/MovieAPI'
import { Movie } from 'src/types/Movie'

type MovieState = {
  trending: Movie[],
  mostPopular: Movie[],
  fetchTrending: () => void,
  fetchMostPopular: () => void,
}

export const MovieContext = createContext<MovieState>({
  trending: [],
  mostPopular: [],
  fetchTrending: () => {},
  fetchMostPopular: () => {},
})

export const MovieContextProvider = ({ children }: PropsWithChildren) => {
  const [trending, setTrending] = useState<Movie[]>([])
  const [mostPopular, setMostPopular] = useState<Movie[]>([])

  const api = useMemo(() => new MovieAPI(), [])

  const fetchTrending = useCallback(async () => {
    const data = await api.fetchMovieListTrending()

    setTrending(data)
  }, [api])

  const fetchMostPopular = useCallback(async () => {
    const data = await api.fetchMovieListMostPopular()

    setMostPopular(data)
  }, [api])

  const state = {
    trending,
    mostPopular,
    fetchTrending,
    fetchMostPopular,
  }

  return (
    <MovieContext.Provider value={state}>
      {children}
    </MovieContext.Provider>
  )
}
