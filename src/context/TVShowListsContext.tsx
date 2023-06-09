import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { Genre, type TVShowItem } from '@leandrowkz/tmdb'
import { api } from '../services/TVShowsAPI'
import { ListByGenre } from 'src/types/ListByGenre'

type TVShowListsState = {
  airingToday: TVShowItem[]
  onTheAir: TVShowItem[]
  popular: TVShowItem[]
  topRated: TVShowItem[]
  similar: TVShowItem[]
  recommended: TVShowItem[]
  listsByGenres: ListByGenre<TVShowItem>[]
  genre: TVShowItem[]

  isLoadingAiringToday: boolean
  isLoadingOnTheAir: boolean
  isLoadingPopular: boolean
  isLoadingTopRated: boolean
  isLoadingSimilar: boolean
  isLoadingRecommended: boolean
  isLoadingByGenre: boolean
  isLoadingListsByGenres: boolean
  hasGenreErrors: boolean

  fetchAiringToday: () => void
  fetchOnTheAir: () => void
  fetchPopular: () => void
  fetchTopRated: () => void
  fetchSimilar: (tvShowId: number) => void
  fetchRecommended: (tvShowId: number) => void
  fetchByGenre: (genreId: number) => void
  fetchListsByGenres: (genres: Genre[]) => void
}

export const TVShowListsContext = createContext<TVShowListsState>({
  airingToday: [],
  onTheAir: [],
  popular: [],
  topRated: [],
  similar: [],
  recommended: [],
  listsByGenres: [],
  genre: [],

  isLoadingAiringToday: false,
  isLoadingOnTheAir: false,
  isLoadingPopular: false,
  isLoadingTopRated: false,
  isLoadingSimilar: false,
  isLoadingRecommended: false,
  isLoadingListsByGenres: false,
  isLoadingByGenre: false,

  hasGenreErrors: false,

  fetchAiringToday: () => null,
  fetchOnTheAir: () => null,
  fetchPopular: () => null,
  fetchTopRated: () => null,
  fetchSimilar: () => null,
  fetchRecommended: () => null,
  fetchByGenre: () => null,
  fetchListsByGenres: () => null,
})

export const TVShowListsContextProvider = ({ children }: PropsWithChildren) => {
  const [airingToday, setAiringToday] = useState<TVShowItem[]>([])
  const [onTheAir, setOnTheAir] = useState<TVShowItem[]>([])
  const [popular, setPopular] = useState<TVShowItem[]>([])
  const [topRated, setTopRated] = useState<TVShowItem[]>([])
  const [similar, setSimilar] = useState<TVShowItem[]>([])
  const [recommended, setRecommended] = useState<TVShowItem[]>([])
  const [genre, setGenre] = useState<TVShowItem[]>([])
  const [listsByGenres, setListsByGenres] = useState<ListByGenre<TVShowItem>[]>(
    []
  )

  const [isLoadingAiringToday, setIsLoadingAiringToday] =
    useState<boolean>(false)
  const [isLoadingOnTheAir, setIsLoadingOnTheAir] = useState<boolean>(false)
  const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(false)
  const [isLoadingTopRated, setIsLoadingTopRated] = useState<boolean>(false)
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(false)
  const [isLoadingRecommended, setIsLoadingRecommended] =
    useState<boolean>(false)
  const [isLoadingListsByGenres, setIsLoadingListsByGenres] =
    useState<boolean>(false)
  const [isLoadingByGenre, setIsLoadingByGenre] = useState<boolean>(false)
  const [hasGenreErrors, setHasGenreErrors] = useState<boolean>(false)

  const fetchListsByGenres = useCallback(
    async (genres: Genre[]) => {
      setListsByGenres([])
      setIsLoadingListsByGenres(true)

      const genreIds = genres.map((genre) => genre.id)
      const data = await api.fetchListsByGenres(genreIds)

      setListsByGenres(data)
      setIsLoadingListsByGenres(false)
    },
    [api]
  )

  const fetchByGenre = useCallback(
    async (genreId: number) => {
      try {
        setGenre([])
        setHasGenreErrors(false)
        setIsLoadingByGenre(true)

        const data = await api.fetchListByGenre([genreId])

        setGenre(data)
      } catch {
        setHasGenreErrors(true)
      } finally {
        setIsLoadingByGenre(false)
      }
    },
    [api]
  )

  const fetchAiringToday = useCallback(async () => {
    setAiringToday([])
    setIsLoadingAiringToday(true)

    const data = await api.fetchListAiringToday()

    setAiringToday(data)
    setIsLoadingAiringToday(false)
  }, [api])

  const fetchOnTheAir = useCallback(async () => {
    setOnTheAir([])
    setIsLoadingOnTheAir(true)

    const data = await api.fetchListOnTheAir()

    setOnTheAir(data)
    setIsLoadingOnTheAir(false)
  }, [api])

  const fetchPopular = useCallback(async () => {
    setPopular([])
    setIsLoadingPopular(true)

    const data = await api.fetchListPopular()

    setPopular(data)
    setIsLoadingPopular(false)
  }, [api])

  const fetchTopRated = useCallback(async () => {
    setTopRated([])
    setIsLoadingTopRated(true)

    const data = await api.fetchListTopRated()

    setTopRated(data)
    setIsLoadingTopRated(false)
  }, [api])

  const fetchSimilar = useCallback(
    async (TVShowId: number) => {
      setSimilar([])
      setIsLoadingSimilar(true)

      const data = await api.fetchListSimilar(TVShowId)

      setSimilar(data)
      setIsLoadingSimilar(false)
    },
    [api]
  )

  const fetchRecommended = useCallback(
    async (TVShowId: number) => {
      setRecommended([])
      setIsLoadingRecommended(true)

      const data = await api.fetchListRecommended(TVShowId)

      setRecommended(data)
      setIsLoadingRecommended(false)
    },
    [api]
  )

  const state = {
    airingToday,
    onTheAir,
    popular,
    topRated,
    similar,
    recommended,
    listsByGenres,
    genre,

    isLoadingAiringToday,
    isLoadingOnTheAir,
    isLoadingPopular,
    isLoadingTopRated,
    isLoadingSimilar,
    isLoadingRecommended,
    isLoadingListsByGenres,
    isLoadingByGenre,

    hasGenreErrors,

    fetchAiringToday,
    fetchOnTheAir,
    fetchPopular,
    fetchTopRated,
    fetchSimilar,
    fetchRecommended,
    fetchByGenre,
    fetchListsByGenres,
  }

  return (
    <TVShowListsContext.Provider value={state}>
      {children}
    </TVShowListsContext.Provider>
  )
}
