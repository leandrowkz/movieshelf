import React, { PropsWithChildren, createContext, useState } from 'react'
import { Genre, type TVShowItem } from '@leandrowkz/tmdb'
import { ListByGenre } from 'src/types/ListByGenre'
import { useAPI } from 'src/hooks/useAPI'
import { TVShowListsState } from './types'
import { initialState } from './state'

export const TVShowListsContext = createContext<TVShowListsState>({
  ...initialState,
})

export const TVShowListsContextProvider = ({ children }: PropsWithChildren) => {
  const api = useAPI('tv-shows')
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

  const fetchListsByGenres = async (genres: Genre[]) => {
    setListsByGenres([])
    setIsLoadingListsByGenres(true)

    const genreIds = genres.map((genre) => genre.id)
    const data = await api.fetchListsByGenres(genreIds)

    setListsByGenres(data)
    setIsLoadingListsByGenres(false)
  }

  const fetchByGenre = async (genreId: number) => {
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
