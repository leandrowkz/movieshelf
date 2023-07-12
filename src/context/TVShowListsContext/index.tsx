import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { Genre, TVShowItem } from '@leandrowkz/tmdb'
import type { ListByGenre } from 'types'
import type { TVShowListsState } from './types'
import { initialState } from './state'
import { useTVShowsAPI } from 'src/hooks/apis/useTVShowsAPI'

export const TVShowListsContext = createContext<TVShowListsState>({
  ...initialState,
})

export const TVShowListsContextProvider = ({ children }: PropsWithChildren) => {
  const api = useTVShowsAPI()
  const [airingToday, setAiringToday] = useState<TVShowItem[]>([])
  const [onTheAir, setOnTheAir] = useState<TVShowItem[]>([])
  const [popular, setPopular] = useState<TVShowItem[]>([])
  const [topRated, setTopRated] = useState<TVShowItem[]>([])
  const [similar, setSimilar] = useState<TVShowItem[]>([])
  const [recommended, setRecommended] = useState<TVShowItem[]>([])
  const [listsByGenres, setListsByGenres] = useState<ListByGenre<TVShowItem>[]>(
    []
  )

  const [category, setCategory] = useState<TVShowItem[]>([])
  const [pageCategory, setPageCategory] = useState(0)
  const [pagesCategory, setPagesCategory] = useState(0)
  const [countCategory, setCountCategory] = useState(0)

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
  const [isLoadingListCategory, setIsLoadingListCategory] = useState(false)
  const [hasListCategoryErrors, setHasListCategoryErrors] = useState(false)

  const fetchListsByGenres = async (genres: Genre[]) => {
    setListsByGenres([])
    setIsLoadingListsByGenres(true)

    const genreIds = genres.map((genre) => genre.id)
    const data = await api.fetchListsByGenres(genreIds)

    setListsByGenres(data)
    setIsLoadingListsByGenres(false)
  }

  const fetchAiringToday = async () => {
    setAiringToday([])
    setIsLoadingAiringToday(true)

    const data = await api.fetchListAiringToday()

    setAiringToday(data)
    setIsLoadingAiringToday(false)
  }

  const fetchOnTheAir = async () => {
    setOnTheAir([])
    setIsLoadingOnTheAir(true)

    const data = await api.fetchListOnTheAir()

    setOnTheAir(data)
    setIsLoadingOnTheAir(false)
  }

  const fetchPopular = async () => {
    setPopular([])
    setIsLoadingPopular(true)

    const data = await api.fetchListPopular()

    setPopular(data)
    setIsLoadingPopular(false)
  }

  const fetchTopRated = async () => {
    setTopRated([])
    setIsLoadingTopRated(true)

    const data = await api.fetchListTopRated()

    setTopRated(data)
    setIsLoadingTopRated(false)
  }

  const fetchSimilar = async (TVShowId: number) => {
    setSimilar([])
    setIsLoadingSimilar(true)

    const data = await api.fetchListSimilar(TVShowId)

    setSimilar(data)
    setIsLoadingSimilar(false)
  }

  const fetchRecommended = async (TVShowId: number) => {
    setRecommended([])
    setIsLoadingRecommended(true)

    const data = await api.fetchListRecommended(TVShowId)

    setRecommended(data)
    setIsLoadingRecommended(false)
  }

  const fetchListCategory = async (categoryId: number, page = 1) => {
    try {
      setHasListCategoryErrors(false)
      setIsLoadingListCategory(true)

      const {
        data,
        page: current,
        pages,
        count,
      } = await api.fetchListPaginatedByGenre([categoryId], { page })

      setCategory(data)
      setPageCategory(current)
      setPagesCategory(pages)
      setCountCategory(count)
    } catch {
      setCategory([])
      setHasListCategoryErrors(true)
    } finally {
      setIsLoadingListCategory(false)
    }
  }

  const state = {
    airingToday,
    onTheAir,
    popular,
    topRated,
    similar,
    recommended,
    listsByGenres,
    category: {
      data: category,
      page: pageCategory,
      pages: pagesCategory,
      count: countCategory,
    },

    isLoadingAiringToday,
    isLoadingOnTheAir,
    isLoadingPopular,
    isLoadingTopRated,
    isLoadingSimilar,
    isLoadingRecommended,
    isLoadingListsByGenres,
    isLoadingListCategory,

    hasListCategoryErrors,

    fetchAiringToday,
    fetchOnTheAir,
    fetchPopular,
    fetchTopRated,
    fetchSimilar,
    fetchRecommended,
    fetchListCategory,
    fetchListsByGenres,
  }

  return (
    <TVShowListsContext.Provider value={state}>
      {children}
    </TVShowListsContext.Provider>
  )
}
