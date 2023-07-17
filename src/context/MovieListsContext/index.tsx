import React, { type PropsWithChildren, createContext, useState } from 'react'
import { type Genre, GenreCode, type MovieItem } from '@leandrowkz/tmdb'
import type { ListByGenre } from 'src/types'
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

  const [similar, setSimilar] = useState(initialState.similar)
  const [popular, setPopular] = useState(initialState.popular)
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

  const [isLoading, setIsLoading] = useState(initialState.isLoading)
  const [hasErrors, setHasErrors] = useState(initialState.hasErrors)

  const fetchSimilar = async (movieId: number) => {
    setSimilar(getEmptyListPaginated())
    setIsLoading((prev) => ({ ...prev, fetchSimilar: true }))
    setHasErrors((prev) => ({ ...prev, fetchSimilar: false }))

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

  const fetchListCategory = async (categoryId: number, page = 1) => {
    try {
      setHasCategoryErrors(false)
      setIsLoadingByCategory(true)

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
    inTheatres,
    listsByGenres,

    category: {
      data: category,
      page: pageCategory,
      pages: pagesCategory,
      count: countCategory,
    },

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
    fetchListCategory,
    fetchListsByGenres,
  }

  return (
    <MovieListsContext.Provider value={state}>
      {children}
    </MovieListsContext.Provider>
  )
}
