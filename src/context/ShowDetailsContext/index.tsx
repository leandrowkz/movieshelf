import React, { type PropsWithChildren, createContext, useState } from 'react'
import type {
  Movie,
  MovieCredits,
  TVShow,
  TVShowCredits,
} from '@leandrowkz/tmdb'
import type { ShowType, UserShowStates } from 'src/types'
import type { ShowDetailsState } from './types'
import { initialState } from './state'
import { useShowsAPI } from 'src/hooks/apis/useShowsAPI'

export const ShowDetailsContext = createContext<ShowDetailsState>({
  ...initialState,
})

export const ShowDetailsContextProvider = ({ children }: PropsWithChildren) => {
  const api = useShowsAPI()

  const [show, setShow] = useState(initialState.show)
  const [states, setStates] = useState(initialState.states)
  const [credits, setCredits] = useState(initialState.credits)
  const [videos, setVideos] = useState(initialState.videos)
  const [isLoading, setIsLoading] = useState(initialState.isLoading)
  const [hasErrors, setHasErrors] = useState(initialState.hasErrors)

  const fetchShow = async (showId: number, showType: ShowType) => {
    try {
      setShow({} as Movie | TVShow)
      setIsLoading((prev) => ({ ...prev, fetchShow: true }))
      setHasErrors((prev) => ({ ...prev, fetchShow: false }))

      const data = await api.fetchDetails(showId, showType)

      setShow(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchShow: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchShow: false }))
    }
  }

  const fetchStates = async (showId: number, showType: ShowType) => {
    setStates({} as UserShowStates)
    setIsLoading((prev) => ({ ...prev, fetchStates: true }))
    setHasErrors((prev) => ({ ...prev, fetchStates: false }))

    const data = await api.fetchStates(showId, showType)

    setStates(data)

    setIsLoading((prev) => ({ ...prev, fetchStates: false }))
  }

  const fetchCredits = async (showId: number, showType: ShowType) => {
    setCredits({} as MovieCredits | TVShowCredits)
    setIsLoading((prev) => ({ ...prev, fetchCredits: true }))
    setHasErrors((prev) => ({ ...prev, fetchCredits: false }))

    const data = await api.fetchCredits(showId, showType)

    setCredits(data)

    setIsLoading((prev) => ({ ...prev, fetchCredits: false }))
  }

  const fetchVideos = async (showId: number, showType: ShowType) => {
    setVideos([])
    setIsLoading((prev) => ({ ...prev, fetchVideos: true }))
    setHasErrors((prev) => ({ ...prev, fetchVideos: false }))

    const data = await api.fetchVideos(showId, showType)

    setVideos(data)
    setIsLoading((prev) => ({ ...prev, fetchVideos: false }))
  }

  const state = {
    show,
    credits,
    videos,
    states,
    isLoading,
    hasErrors,
    fetchShow,
    fetchCredits,
    fetchVideos,
    fetchStates,
    setStates,
  }

  return (
    <ShowDetailsContext.Provider value={state}>
      {children}
    </ShowDetailsContext.Provider>
  )
}
