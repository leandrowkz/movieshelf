import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { moviesAPI } from '../services/MoviesAPI'
import { Movie } from '../types/Movie'
import { Genre } from '../types/Genre'

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
  isLoadingTrending: boolean
  isLoadingInTheatres: boolean
  isLoadingSimilar: boolean
  isLoadingRecommended: boolean
  isLoadingMostPopular: boolean
  isLoadingBestComedies: boolean
  isLoadingScifiAndFantasy: boolean
  isLoadingFamily: boolean
  isLoadingTopRatedDocumentaries: boolean
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
  isLoadingTrending: false,
  isLoadingInTheatres: false,
  isLoadingSimilar: false,
  isLoadingRecommended: false,
  isLoadingMostPopular: false,
  isLoadingBestComedies: false,
  isLoadingScifiAndFantasy: false,
  isLoadingFamily: false,
  isLoadingTopRatedDocumentaries: false,
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
  const [isLoadingTrending, setIsLoadingTrending] = useState(false)
  const [isLoadingInTheatres, setIsLoadingInTheatres] = useState(false)
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false)
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false)
  const [isLoadingMostPopular, setIsLoadingMostPopular] = useState(false)
  const [isLoadingBestComedies, setIsLoadingBestComedies] = useState(false)
  const [isLoadingScifiAndFantasy, setIsLoadingScifiAndFantasy] =
    useState(false)
  const [isLoadingFamily, setIsLoadingFamily] = useState(false)
  const [isLoadingTopRatedDocumentaries, setIsLoadingTopRatedDocumentaries] =
    useState(false)

  const fetchSimilar = useCallback(
    async (movieId: number) => {
      setSimilar([])
      setIsLoadingSimilar(true)

      const data = await moviesAPI.fetchListSimilar(movieId)

      setSimilar(data)
      setIsLoadingSimilar(false)
    },
    [moviesAPI]
  )

  const fetchRecommended = useCallback(
    async (movieId: number) => {
      setRecommended([])
      setIsLoadingRecommended(true)

      const data = await moviesAPI.fetchListRecommended(movieId)

      setRecommended(data)
      setIsLoadingRecommended(false)
    },
    [moviesAPI]
  )

  const fetchTrending = useCallback(async () => {
    setTrending([])
    setIsLoadingTrending(true)

    const data = await moviesAPI.fetchListTrending()

    setTrending(data)
    setIsLoadingTrending(false)
  }, [moviesAPI])

  const fetchMostPopular = useCallback(async () => {
    setMostPopular([])
    setIsLoadingMostPopular(true)

    const data = await moviesAPI.fetchListMostPopular()

    setMostPopular(data)
    setIsLoadingMostPopular(false)
  }, [moviesAPI])

  const fetchBestComedies = useCallback(async () => {
    setBestComedies([])
    setIsLoadingBestComedies(true)

    const data = await moviesAPI.fetchListByGenre([Genre.COMEDY], {
      'vote_average.gte': 7.5,
    })

    setBestComedies(data)
    setIsLoadingBestComedies(false)
  }, [moviesAPI])

  const fetchScifiAndFantasy = useCallback(async () => {
    setScifiAndFantasy([])
    setIsLoadingScifiAndFantasy(true)

    const data = await moviesAPI.fetchListByGenre([
      Genre.SCIENCE_FICTION,
      Genre.FANTASY,
    ])

    setScifiAndFantasy(data)
    setIsLoadingScifiAndFantasy(false)
  }, [moviesAPI])

  const fetchFamily = useCallback(async () => {
    setFamily([])
    setIsLoadingFamily(true)

    const data = await moviesAPI.fetchListByGenre([Genre.FAMILY])

    setFamily(data)
    setIsLoadingFamily(false)
  }, [moviesAPI])

  const fetchTopRatedDocumentaries = useCallback(async () => {
    setTopRatedDocumentaries([])
    setIsLoadingTopRatedDocumentaries(true)

    const filters = {
      sort_by: 'popularity.desc',
      'vote_average.gte': 9,
    }
    const data = await moviesAPI.fetchListByGenre([Genre.DOCUMENTARY], filters)

    setTopRatedDocumentaries(data)
    setIsLoadingTopRatedDocumentaries(false)
  }, [moviesAPI])

  const fetchInTheatres = useCallback(async () => {
    setInTheatres([])
    setIsLoadingInTheatres(true)

    const data = await moviesAPI.fetchListInTheatres()

    setInTheatres(data)
    setIsLoadingInTheatres(false)
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
    isLoadingTrending,
    isLoadingInTheatres,
    isLoadingSimilar,
    isLoadingRecommended,
    isLoadingMostPopular,
    isLoadingBestComedies,
    isLoadingScifiAndFantasy,
    isLoadingFamily,
    isLoadingTopRatedDocumentaries,
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
