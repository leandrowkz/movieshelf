import React, { PropsWithChildren, createContext, useState } from 'react'
import { MovieAPI } from 'src/services/MovieAPI'
import { Movie } from 'src/types/Movie'

type MovieState = {
  trending: Movie[],
  mostPopular: Movie[],
  fetchTrending: (() => void) | null,
  fetchMostPopular: (() => void) | null,
}

export const MovieContext = createContext<MovieState>({
  trending: [],
  mostPopular: [],
  fetchTrending: null,
  fetchMostPopular: null,
})

export const MovieContextProvider = ({ children }: PropsWithChildren) => {
  const [trending, setTrending] = useState<Movie[]>([])
  const [mostPopular, setMostPopular] = useState<Movie[]>([])

  const api = new MovieAPI()

  const fetchTrending = async () => {
    const data = await api.fetchMovieListTrending()

    setTrending(data)
  }

  const fetchMostPopular = async () => {
    const data = await api.fetchMovieListMostPopular()

    setMostPopular(data)
  }

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
