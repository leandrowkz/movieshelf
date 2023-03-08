import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { MovieAPI } from 'src/services/MovieAPI'
import { Movie } from 'src/types/Movie'
import { MovieGenre } from 'src/types/MovieGenre'
import { Nullable } from 'src/types/Nullable'

type MovieState = {
  movieDetails: Nullable<Movie>
  trending: Movie[]
  mostPopular: Movie[]
  bestComedies: Movie[]
  scifiAndFantasy: Movie[]
  family: Movie[]
  topRatedDocumentaries: Movie[]
  fetchMovieDetails: (movieId: number) => void
  fetchTrending: () => void
  fetchMostPopular: () => void
  fetchBestComedies: () => void
  fetchScifiAndFantasy: () => void
  fetchFamily: () => void
  fetchTopRatedDocumentaries: () => void
}

export const MovieContext = createContext<MovieState>({
  movieDetails: null,
  trending: [],
  mostPopular: [],
  bestComedies: [],
  scifiAndFantasy: [],
  family: [],
  topRatedDocumentaries: [],
  fetchMovieDetails: () => null,
  fetchTrending: () => null,
  fetchMostPopular: () => null,
  fetchBestComedies: () => null,
  fetchScifiAndFantasy: () => null,
  fetchFamily: () => null,
  fetchTopRatedDocumentaries: () => null,
})

export const MovieContextProvider = ({ children }: PropsWithChildren) => {
  const [movieDetails, setMovieDetails] = useState<Nullable<Movie>>(null)
  const [trending, setTrending] = useState<Movie[]>([])
  const [mostPopular, setMostPopular] = useState<Movie[]>([])
  const [bestComedies, setBestComedies] = useState<Movie[]>([])
  const [scifiAndFantasy, setScifiAndFantasy] = useState<Movie[]>([])
  const [family, setFamily] = useState<Movie[]>([])
  const [topRatedDocumentaries, setTopRatedDocumentaries] = useState<Movie[]>(
    []
  )

  const api = useMemo(() => new MovieAPI(), [])

  const fetchMovieDetails = useCallback(
    async (movieId: number) => {
      const data = await api.fetchMovieDetails(movieId)

      setMovieDetails(data)
    },
    [api]
  )

  const fetchTrending = useCallback(async () => {
    const data = await api.fetchMovieListTrending()

    setTrending(data)
  }, [api])

  const fetchMostPopular = useCallback(async () => {
    const data = await api.fetchMovieListMostPopular()

    setMostPopular(data)
  }, [api])

  const fetchBestComedies = useCallback(async () => {
    const data = await api.fetchMovieListByGenre([MovieGenre.COMEDY], {
      'vote_average.gte': 7.5,
    })

    setBestComedies(data)
  }, [api])

  const fetchScifiAndFantasy = useCallback(async () => {
    const data = await api.fetchMovieListByGenre([
      MovieGenre.SCIENCE_FICTION,
      MovieGenre.FANTASY,
    ])

    setScifiAndFantasy(data)
  }, [api])

  const fetchFamily = useCallback(async () => {
    const data = await api.fetchMovieListByGenre([MovieGenre.FAMILY])

    setFamily(data)
  }, [api])

  const fetchTopRatedDocumentaries = useCallback(async () => {
    const filters = {
      sort_by: 'popularity.desc',
      'vote_average.gte': 9,
    }
    const data = await api.fetchMovieListByGenre(
      [MovieGenre.DOCUMENTARY],
      filters
    )

    setTopRatedDocumentaries(data)
  }, [api])

  const state = {
    movieDetails,
    trending,
    mostPopular,
    bestComedies,
    scifiAndFantasy,
    family,
    topRatedDocumentaries,
    fetchMovieDetails,
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
  }

  return <MovieContext.Provider value={state}>{children}</MovieContext.Provider>
}
