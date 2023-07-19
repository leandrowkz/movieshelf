import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { TVShow, TVShowCredits } from '@leandrowkz/tmdb'
import type { UserShowStates } from 'src/types'
import type { TVShowDetailsState } from './types'
import { initialState } from './state'
import { useTVShowsAPI } from 'src/hooks/apis/useTVShowsAPI'

export const TVShowDetailsContext = createContext<TVShowDetailsState>({
  ...initialState,
})

export const TVShowDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const api = useTVShowsAPI()

  const [tvShow, setTVShow] = useState(initialState.tvShow)
  const [states, setStates] = useState(initialState.states)
  const [credits, setCredits] = useState(initialState.credits)
  const [videos, setVideos] = useState(initialState.videos)
  const [isLoading, setIsLoading] = useState(initialState.isLoading)
  const [hasErrors, setHasErrors] = useState(initialState.hasErrors)

  const fetchTVShow = async (showId: number) => {
    try {
      setTVShow({} as TVShow)
      setIsLoading((prev) => ({ ...prev, fetchTVShow: true }))
      setHasErrors((prev) => ({ ...prev, fetchTVShow: false }))

      const data = await api.fetchTVShow(showId)

      setTVShow(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchTVShow: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchTVShow: false }))
    }
  }

  const fetchStates = async (showId: number) => {
    setStates({} as UserShowStates)
    setIsLoading((prev) => ({ ...prev, fetchStates: true }))
    setHasErrors((prev) => ({ ...prev, fetchStates: false }))

    const data = await api.fetchStates(showId)

    setStates(data)

    setIsLoading((prev) => ({ ...prev, fetchStates: false }))
  }

  const fetchCredits = async (showId: number) => {
    setCredits({} as TVShowCredits)
    setIsLoading((prev) => ({ ...prev, fetchCredits: true }))
    setHasErrors((prev) => ({ ...prev, fetchCredits: false }))

    const data = await api.fetchCredits(showId)

    setCredits(data)

    setIsLoading((prev) => ({ ...prev, fetchCredits: false }))
  }

  const fetchVideos = async (showId: number) => {
    setVideos([])
    setIsLoading((prev) => ({ ...prev, fetchVideos: true }))
    setHasErrors((prev) => ({ ...prev, fetchVideos: false }))

    const data = await api.fetchVideos(showId)

    setVideos(data)
    setIsLoading((prev) => ({ ...prev, fetchVideos: false }))
  }

  const state = {
    tvShow,
    credits,
    videos,
    states,
    isLoading,
    hasErrors,
    fetchTVShow,
    fetchCredits,
    fetchVideos,
    fetchStates,
    setStates,
  }

  return (
    <TVShowDetailsContext.Provider value={state}>
      {children}
    </TVShowDetailsContext.Provider>
  )
}
