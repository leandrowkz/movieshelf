import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { Genre, GenreCode, type MovieItem } from '@leandrowkz/tmdb'
import { moviesAPI } from '../services/MoviesAPI'
import { ListByGenre } from 'src/types/ListByGenre'

type MovieListsState = {
  inTheatres: MovieItem[]
  trending: MovieItem[]
  similar: MovieItem[]
  recommended: MovieItem[]
  mostPopular: MovieItem[]
  bestComedies: MovieItem[]
  scifiAndFantasy: MovieItem[]
  topRatedDocumentaries: MovieItem[]
  family: MovieItem[]
  listsByGenres: ListByGenre<MovieItem>[]
  category: MovieItem[]

  isLoadingTrending: boolean
  isLoadingInTheatres: boolean
  isLoadingSimilar: boolean
  isLoadingRecommended: boolean
  isLoadingMostPopular: boolean
  isLoadingBestComedies: boolean
  isLoadingScifiAndFantasy: boolean
  isLoadingFamily: boolean
  isLoadingTopRatedDocumentaries: boolean
  isLoadingByCategory: boolean
  isLoadingListsByGenres: boolean
  hasCategoryErrors: boolean

  fetchTrending: () => void
  fetchInTheatres: () => void
  fetchSimilar: (movieId: number) => void
  fetchRecommended: (movieId: number) => void
  fetchMostPopular: () => void
  fetchBestComedies: () => void
  fetchScifiAndFantasy: () => void
  fetchFamily: () => void
  fetchTopRatedDocumentaries: () => void
  fetchByCategory: (categoryId: number) => void
  fetchListsByGenres: (genres: Genre[]) => void
}

export const MovieListsContext = createContext<MovieListsState>({
  trending: [],
  inTheatres: [],
  similar: [],
  recommended: [],
  mostPopular: [],
  bestComedies: [],
  topRatedDocumentaries: [],
  scifiAndFantasy: [],
  family: [],
  category: [],
  listsByGenres: [],

  isLoadingTrending: false,
  isLoadingInTheatres: false,
  isLoadingSimilar: false,
  isLoadingRecommended: false,
  isLoadingMostPopular: false,
  isLoadingBestComedies: false,
  isLoadingScifiAndFantasy: false,
  isLoadingFamily: false,
  isLoadingTopRatedDocumentaries: false,
  isLoadingListsByGenres: false,
  isLoadingByCategory: false,
  hasCategoryErrors: false,

  fetchTrending: () => null,
  fetchSimilar: () => null,
  fetchRecommended: () => null,
  fetchMostPopular: () => null,
  fetchBestComedies: () => null,
  fetchScifiAndFantasy: () => null,
  fetchFamily: () => null,
  fetchTopRatedDocumentaries: () => null,
  fetchInTheatres: () => null,
  fetchByCategory: () => null,
  fetchListsByGenres: () => null,
})

export const MovieListsContextProvider = ({ children }: PropsWithChildren) => {
  const [trending, setTrending] = useState<MovieItem[]>([])
  const [similar, setSimilar] = useState<MovieItem[]>([])
  const [recommended, setRecommended] = useState<MovieItem[]>([])
  const [mostPopular, setMostPopular] = useState<MovieItem[]>([])
  const [bestComedies, setBestComedies] = useState<MovieItem[]>([])
  const [scifiAndFantasy, setScifiAndFantasy] = useState<MovieItem[]>([])
  const [family, setFamily] = useState<MovieItem[]>([])
  const [category, setCategory] = useState<MovieItem[]>([])
  const [topRatedDocumentaries, setTopRatedDocumentaries] = useState<
    MovieItem[]
  >([])
  const [inTheatres, setInTheatres] = useState<MovieItem[]>([])
  const [listsByGenres, setListsByGenres] = useState<ListByGenre<MovieItem>[]>(
    []
  )

  const [isLoadingTrending, setIsLoadingTrending] = useState(false)
  const [isLoadingInTheatres, setIsLoadingInTheatres] = useState(false)
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false)
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false)
  const [isLoadingMostPopular, setIsLoadingMostPopular] = useState(false)
  const [isLoadingBestComedies, setIsLoadingBestComedies] = useState(false)
  const [isLoadingFamily, setIsLoadingFamily] = useState(false)
  const [isLoadingScifiAndFantasy, setIsLoadingScifiAndFantasy] =
    useState(false)
  const [isLoadingTopRatedDocumentaries, setIsLoadingTopRatedDocumentaries] =
    useState(false)
  const [isLoadingByCategory, setIsLoadingByCategory] = useState(false)
  const [isLoadingListsByGenres, setIsLoadingListsByGenres] =
    useState<boolean>(false)

  const [hasCategoryErrors, setHasCategoryErrors] = useState(false)

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

    const data = await moviesAPI.fetchListByGenre([GenreCode.COMEDY], {
      'vote_average.gte': 7.5,
    })

    setBestComedies(data)
    setIsLoadingBestComedies(false)
  }, [moviesAPI])

  const fetchScifiAndFantasy = useCallback(async () => {
    setScifiAndFantasy([])
    setIsLoadingScifiAndFantasy(true)

    const data = await moviesAPI.fetchListByGenre([
      GenreCode.SCIENCE_FICTION,
      GenreCode.FANTASY,
    ])

    setScifiAndFantasy(data)
    setIsLoadingScifiAndFantasy(false)
  }, [moviesAPI])

  const fetchFamily = useCallback(async () => {
    setFamily([])
    setIsLoadingFamily(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.FAMILY])

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
    const data = await moviesAPI.fetchListByGenre(
      [GenreCode.DOCUMENTARY],
      filters
    )

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

  const fetchByCategory = useCallback(
    async (categoryId: number) => {
      try {
        setCategory([])
        setHasCategoryErrors(false)
        setIsLoadingByCategory(true)

        const data = await moviesAPI.fetchListByGenre([categoryId])

        setCategory(data)
      } catch {
        setHasCategoryErrors(true)
      } finally {
        setIsLoadingByCategory(false)
      }
    },
    [moviesAPI]
  )

  const fetchListsByGenres = useCallback(
    async (genres: Genre[]) => {
      setListsByGenres([])
      setIsLoadingListsByGenres(true)

      const genreIds = genres.map((genre) => genre.id)
      const data = await moviesAPI.fetchListsByGenres(genreIds)

      setListsByGenres(data)
      setIsLoadingListsByGenres(false)
    },
    [moviesAPI]
  )

  const state = {
    trending,
    similar,
    recommended,
    mostPopular,
    bestComedies,
    scifiAndFantasy,
    topRatedDocumentaries,
    family,
    category,
    inTheatres,
    listsByGenres,

    isLoadingTrending,
    isLoadingInTheatres,
    isLoadingSimilar,
    isLoadingRecommended,
    isLoadingMostPopular,
    isLoadingBestComedies,
    isLoadingScifiAndFantasy,
    isLoadingFamily,
    isLoadingTopRatedDocumentaries,
    isLoadingByCategory,
    isLoadingListsByGenres,
    hasCategoryErrors,

    fetchTrending,
    fetchSimilar,
    fetchRecommended,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
    fetchInTheatres,
    fetchByCategory,
    fetchListsByGenres,
  }

  return (
    <MovieListsContext.Provider value={state}>
      {children}
    </MovieListsContext.Provider>
  )
}
