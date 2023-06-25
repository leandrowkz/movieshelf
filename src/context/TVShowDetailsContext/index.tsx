import React, { PropsWithChildren, createContext, useState } from 'react'
import type {
  PersonCast,
  PersonCrew,
  TVShow,
  TVShowAccountStates,
  TVShowVideos,
} from '@leandrowkz/tmdb'
import { useAPI } from 'src/hooks/useAPI'
import { TVShowDetailsState } from './types'
import { initialState } from './state'

export const TVShowDetailsContext = createContext<TVShowDetailsState>({
  ...initialState,
})

export const TVShowDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const api = useAPI('tv-shows')
  const [tvShow, setTVShow] = useState<TVShow>({} as TVShow)
  const [cast, setCast] = useState<PersonCast[]>([])
  const [crew, setCrew] = useState<PersonCrew[]>([])
  const [videos, setVideos] = useState<TVShowVideos['results']>([])
  const [accountStates, setAccountStates] = useState<TVShowAccountStates>(
    {} as TVShowAccountStates
  )
  const [isLoadingTVShow, setIsLoadingTVShow] = useState(false)
  const [isLoadingCredits, setIsLoadingCredits] = useState(false)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [isLoadingAccountStates, setIsLoadingAccountStates] = useState(false)
  const [hasTVShowErrors, setHasTVShowErrors] = useState(false)

  const fetchTVShow = async (tvShowId: number) => {
    try {
      setTVShow({} as TVShow)
      setIsLoadingTVShow(true)
      setHasTVShowErrors(false)

      const data = await api.fetchDetails(tvShowId)

      setTVShow(data)
    } catch (e) {
      setHasTVShowErrors(true)
    } finally {
      setIsLoadingTVShow(false)
    }
  }

  const fetchCredits = async (tvShowId: number) => {
    setIsLoadingCredits(true)

    const { cast, crew } = await api.fetchCredits(tvShowId)

    setCast(cast)
    setCrew(crew)
    setIsLoadingCredits(false)
  }

  const fetchVideos = async (tvShowId: number) => {
    setIsLoadingVideos(true)

    const videos = await api.fetchVideos(tvShowId)

    setVideos(videos)
    setIsLoadingVideos(false)
  }

  const fetchAccountStates = async (movieId: number) => {
    setAccountStates({} as TVShowAccountStates)
    setIsLoadingAccountStates(true)

    const accountStates = await api.fetchAccountStates(movieId)

    setAccountStates(accountStates)
    setIsLoadingAccountStates(false)
  }

  const state = {
    tvShow,
    cast,
    crew,
    videos,
    accountStates,
    isLoadingCredits,
    isLoadingTVShow,
    isLoadingVideos,
    isLoadingAccountStates,
    hasTVShowErrors,
    fetchCredits,
    fetchTVShow,
    fetchVideos,
    fetchAccountStates,
  }

  return (
    <TVShowDetailsContext.Provider value={state}>
      {children}
    </TVShowDetailsContext.Provider>
  )
}
