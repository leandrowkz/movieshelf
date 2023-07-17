import React, { type PropsWithChildren, createContext, useState } from 'react'
import { GenreCode } from '@leandrowkz/tmdb'
import type { TVShowListsState } from './types'
import { initialState } from './state'
import { useHelpers } from 'src/hooks/useHelpers'
import { useTVShowsAPI } from 'src/hooks/apis/useTVShowsAPI'

export const TVShowListsContext = createContext<TVShowListsState>({
  ...initialState,
})

export const TVShowListsContextProvider = ({ children }: PropsWithChildren) => {
  const api = useTVShowsAPI()
  const { getEmptyListPaginated } = useHelpers()

  const [similar, setSimilar] = useState(initialState.similar)
  const [popular, setPopular] = useState(initialState.popular)
  const [recommended, setRecommended] = useState(initialState.recommended)
  const [onTheAir, setOnTheAir] = useState(initialState.onTheAir)
  const [airingToday, setAiringToday] = useState(initialState.airingToday)
  const [topRated, setTopRated] = useState(initialState.topRated)

  const fetchSimilar = async (showId: number, filters = {}) => {
    try {
      setSimilar({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListSimilar(showId, filters)

      setSimilar({ ...data, isLoading: false })
    } catch {
      setSimilar((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchRecommended = async (movieId: number, filters = {}) => {
    try {
      setRecommended({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListRecommended(movieId, filters)

      setRecommended({ ...data, isLoading: false })
    } catch {
      setRecommended((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchPopular = async (filters = {}) => {
    try {
      setPopular({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListPopular(filters)

      setPopular({ ...data, isLoading: false })
    } catch {
      setPopular((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchAiringToday = async (filters = {}) => {
    try {
      setAiringToday({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListAiringToday(filters)

      setAiringToday({ ...data, isLoading: false })
    } catch {
      setAiringToday((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchOnTheAir = async (filters = {}) => {
    try {
      setOnTheAir({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListOnTheAir(filters)

      setOnTheAir({ ...data, isLoading: false })
    } catch {
      setOnTheAir((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchTopRated = async (filters = {}) => {
    try {
      setTopRated({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListTopRated({
        ...filters,
        with_genres: [GenreCode.COMEDY],
        'vote_average.gte': 7.5,
      })

      setTopRated({ ...data, isLoading: false })
    } catch {
      setTopRated((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const state = {
    popular,
    similar,
    recommended,
    onTheAir,
    airingToday,
    topRated,

    fetchPopular,
    fetchSimilar,
    fetchRecommended,
    fetchAiringToday,
    fetchOnTheAir,
    fetchTopRated,
  }

  return (
    <TVShowListsContext.Provider value={state}>
      {children}
    </TVShowListsContext.Provider>
  )
}
