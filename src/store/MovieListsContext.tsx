import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { moviesAPI } from 'src/services/MoviesAPI'
import { Movie } from 'src/types/Movie'
import { Genre } from 'src/types/Genre'

type MovieListsState = {
  inTheatres: Movie[]
  trending: Movie[]
  similar: Movie[]
  recommended: Movie[]
  mostPopular: Movie[]
  bestComedies: Movie[]
  scifiAndFantasy: Movie[]
  family: Movie[]
  topRatedDocumentaries: Movie[]
  fetchTrending: () => void
  fetchInTheatres: () => void
  fetchSimilar: (movieId: number) => void
  fetchRecommended: (movieId: number) => void
  fetchMostPopular: () => void
  fetchBestComedies: () => void
  fetchScifiAndFantasy: () => void
  fetchFamily: () => void
  fetchTopRatedDocumentaries: () => void
}

export const MovieListsContext = createContext<MovieListsState>({
  trending: [],
  inTheatres: [],
  similar: [],
  recommended: [],
  mostPopular: [],
  bestComedies: [],
  scifiAndFantasy: [],
  family: [],
  topRatedDocumentaries: [],
  fetchTrending: () => null,
  fetchSimilar: () => null,
  fetchRecommended: () => null,
  fetchMostPopular: () => null,
  fetchBestComedies: () => null,
  fetchScifiAndFantasy: () => null,
  fetchFamily: () => null,
  fetchTopRatedDocumentaries: () => null,
  fetchInTheatres: () => null,
})

export const MovieListsContextProvider = ({ children }: PropsWithChildren) => {
  const [trending, setTrending] = useState<Movie[]>([])
  const [similar, setSimilar] = useState<Movie[]>([])
  const [recommended, setRecommended] = useState<Movie[]>([])
  const [mostPopular, setMostPopular] = useState<Movie[]>([])
  const [bestComedies, setBestComedies] = useState<Movie[]>([])
  const [scifiAndFantasy, setScifiAndFantasy] = useState<Movie[]>([])
  const [family, setFamily] = useState<Movie[]>([])
  const [topRatedDocumentaries, setTopRatedDocumentaries] = useState<Movie[]>(
    []
  )
  const [inTheatres, setInTheatres] = useState<Movie[]>([])

  const fetchSimilar = useCallback(
    async (movieId: number) => {
      const data = await moviesAPI.fetchListSimilar(movieId)

      setSimilar(data)
    },
    [moviesAPI]
  )

  const fetchRecommended = useCallback(
    async (movieId: number) => {
      const data = await moviesAPI.fetchListRecommended(movieId)

      setRecommended(data)
    },
    [moviesAPI]
  )

  const fetchTrending = useCallback(async () => {
    const data = await moviesAPI.fetchListTrending()

    setTrending(data)
  }, [moviesAPI])

  const fetchMostPopular = useCallback(async () => {
    const data = await moviesAPI.fetchListMostPopular()

    setMostPopular(data)
  }, [moviesAPI])

  const fetchBestComedies = useCallback(async () => {
    const data = await moviesAPI.fetchListByGenre([Genre.COMEDY], {
      'vote_average.gte': 7.5,
    })

    setBestComedies(data)
  }, [moviesAPI])

  const fetchScifiAndFantasy = useCallback(async () => {
    const data = await moviesAPI.fetchListByGenre([
      Genre.SCIENCE_FICTION,
      Genre.FANTASY,
    ])

    setScifiAndFantasy(data)
  }, [moviesAPI])

  const fetchFamily = useCallback(async () => {
    const data = await moviesAPI.fetchListByGenre([Genre.FAMILY])

    setFamily(data)
  }, [moviesAPI])

  const fetchTopRatedDocumentaries = useCallback(async () => {
    const filters = {
      sort_by: 'popularity.desc',
      'vote_average.gte': 9,
    }
    const data = await moviesAPI.fetchListByGenre([Genre.DOCUMENTARY], filters)

    setTopRatedDocumentaries(data)
  }, [moviesAPI])

  const fetchInTheatres = useCallback(async () => {
    const data = await moviesAPI.fetchListInTheatres()

    setInTheatres(data)
  }, [moviesAPI])

  const state = {
    trending,
    similar,
    recommended,
    mostPopular,
    bestComedies,
    scifiAndFantasy,
    family,
    topRatedDocumentaries,
    inTheatres,
    fetchTrending,
    fetchSimilar,
    fetchRecommended,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
    fetchInTheatres,
  }

  return (
    <MovieListsContext.Provider value={state}>
      {children}
    </MovieListsContext.Provider>
  )
}
