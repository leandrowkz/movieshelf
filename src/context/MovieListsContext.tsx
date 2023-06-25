import React, { PropsWithChildren, createContext, useState } from 'react'
import { Genre, GenreCode, type MovieItem } from '@leandrowkz/tmdb'
import { ListByGenre } from 'src/types/ListByGenre'
import { useAPI } from 'src/hooks/useAPI'

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
  const api = useAPI('movies')
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

  const fetchSimilar = async (movieId: number) => {
    setSimilar([])
    setIsLoadingSimilar(true)

    const data = await api.fetchListSimilar(movieId)

    setSimilar(data)
    setIsLoadingSimilar(false)
  }

  const fetchRecommended = async (movieId: number) => {
    setRecommended([])
    setIsLoadingRecommended(true)

    const data = await api.fetchListRecommended(movieId)

    setRecommended(data)
    setIsLoadingRecommended(false)
  }

  const fetchTrending = async () => {
    setTrending([])
    setIsLoadingTrending(true)

    const data = await api.fetchListTrending()

    setTrending(data)
    setIsLoadingTrending(false)
  }

  const fetchMostPopular = async () => {
    setMostPopular([])
    setIsLoadingMostPopular(true)

    const data = await api.fetchListMostPopular()

    setMostPopular(data)
    setIsLoadingMostPopular(false)
  }

  const fetchBestComedies = async () => {
    setBestComedies([])
    setIsLoadingBestComedies(true)

    const data = await api.fetchListByGenre([GenreCode.COMEDY], {
      'vote_average.gte': 7.5,
    })

    setBestComedies(data)
    setIsLoadingBestComedies(false)
  }

  const fetchScifiAndFantasy = async () => {
    setScifiAndFantasy([])
    setIsLoadingScifiAndFantasy(true)

    const data = await api.fetchListByGenre([
      GenreCode.SCIENCE_FICTION,
      GenreCode.FANTASY,
    ])

    setScifiAndFantasy(data)
    setIsLoadingScifiAndFantasy(false)
  }

  const fetchFamily = async () => {
    setFamily([])
    setIsLoadingFamily(true)

    const data = await api.fetchListByGenre([GenreCode.FAMILY])

    setFamily(data)
    setIsLoadingFamily(false)
  }

  const fetchTopRatedDocumentaries = async () => {
    setTopRatedDocumentaries([])
    setIsLoadingTopRatedDocumentaries(true)

    const filters = {
      sort_by: 'popularity.desc',
      'vote_average.gte': 9,
    }
    const data = await api.fetchListByGenre([GenreCode.DOCUMENTARY], filters)

    setTopRatedDocumentaries(data)
    setIsLoadingTopRatedDocumentaries(false)
  }

  const fetchInTheatres = async () => {
    setInTheatres([])
    setIsLoadingInTheatres(true)

    const data = await api.fetchListInTheatres()

    setInTheatres(data)
    setIsLoadingInTheatres(false)
  }

  const fetchByCategory = async (categoryId: number) => {
    try {
      setCategory([])
      setHasCategoryErrors(false)
      setIsLoadingByCategory(true)

      const data = await api.fetchListByGenre([categoryId])

      setCategory(data)
    } catch {
      setHasCategoryErrors(true)
    } finally {
      setIsLoadingByCategory(false)
    }
  }

  const fetchListsByGenres = async (genres: Genre[]) => {
    setListsByGenres([])
    setIsLoadingListsByGenres(true)

    const genreIds = genres.map((genre) => genre.id)
    const data = await api.fetchListsByGenres(genreIds)

    setListsByGenres(data)
    setIsLoadingListsByGenres(false)
  }

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
