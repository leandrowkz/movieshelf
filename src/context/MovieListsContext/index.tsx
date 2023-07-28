import React, { type PropsWithChildren, createContext, useState } from 'react'
import { GenreCode } from '@leandrowkz/tmdb'
import type { ListFilters } from 'src/types'
import type { MovieListsState } from './types'
import { initialState } from './state'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'
import { useHelpers } from 'src/hooks/useHelpers'

export const MovieListsContext = createContext<MovieListsState>({
  ...initialState,
})

export const MovieListsContextProvider = ({ children }: PropsWithChildren) => {
  const api = useMoviesAPI()
  const { getEmptyListPaginated } = useHelpers()

  const [search, setSearch] = useState(initialState.search)
  const [similar, setSimilar] = useState(initialState.similar)
  const [popular, setPopular] = useState(initialState.popular)
  const [trending, setTrending] = useState(initialState.trending)
  const [recommended, setRecommended] = useState(initialState.recommended)
  const [inTheatres, setInTheatres] = useState(initialState.inTheatres)
  const [bestComedies, setBestComedies] = useState(initialState.bestComedies)
  const [bestDocumentaries, setBestDocumentaries] = useState(
    initialState.bestDocumentaries
  )
  const [bestScifiAndFantasy, setBestScifiAndFantasy] = useState(
    initialState.bestScifiAndFantasy
  )
  const [bestFamily, setBestFamily] = useState(initialState.bestFamily)

  const fetchSearch = async (filters?: ListFilters) => {
    try {
      setSearch({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListSearch(filters)

      setSearch({ ...data, isLoading: false })
    } catch {
      setSearch((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchSimilar = async (movieId: number, filters = {}) => {
    try {
      setSimilar({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListSimilar(movieId, filters)

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

  const fetchTrending = async (filters = {}) => {
    try {
      setTrending({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListTrending(filters)

      setTrending({ ...data, isLoading: false })
    } catch {
      setTrending((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchInTheatres = async (filters = {}) => {
    try {
      setInTheatres({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListInTheatres(filters)

      setInTheatres({ ...data, isLoading: false })
    } catch {
      setInTheatres((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchBestComedies = async (filters = {}) => {
    try {
      setBestComedies({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListDiscover({
        ...filters,
        with_genres: [GenreCode.COMEDY],
        'vote_average.gte': 7.5,
      })

      setBestComedies({ ...data, isLoading: false })
    } catch {
      setBestComedies((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchBestScifiAndFantasy = async (filters = {}) => {
    try {
      setBestScifiAndFantasy({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListDiscover({
        ...filters,
        with_genres: [GenreCode.SCIENCE_FICTION, GenreCode.FANTASY],
        'vote_average.gte': 7.5,
      })

      setBestScifiAndFantasy({ ...data, isLoading: false })
    } catch {
      setBestScifiAndFantasy((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchBestFamily = async (filters = {}) => {
    try {
      setBestFamily({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListDiscover({
        ...filters,
        with_genres: [GenreCode.FAMILY],
        'vote_average.gte': 7.5,
      })

      setBestFamily({ ...data, isLoading: false })
    } catch {
      setBestFamily((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const fetchBestDocumentaries = async (filters = {}) => {
    try {
      setBestDocumentaries({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const data = await api.fetchListDiscover({
        ...filters,
        with_genres: [GenreCode.DOCUMENTARY],
        'vote_average.gte': 7.5,
      })

      setBestDocumentaries({ ...data, isLoading: false })
    } catch {
      setBestDocumentaries((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const state = {
    search,
    trending,
    popular,
    similar,
    recommended,
    inTheatres,
    bestComedies,
    bestScifiAndFantasy,
    bestDocumentaries,
    bestFamily,

    fetchSearch,
    fetchPopular,
    fetchSimilar,
    fetchInTheatres,
    fetchTrending,
    fetchRecommended,
    fetchBestComedies,
    fetchBestScifiAndFantasy,
    fetchBestFamily,
    fetchBestDocumentaries,
  }

  return (
    <MovieListsContext.Provider value={state}>
      {children}
    </MovieListsContext.Provider>
  )
}
