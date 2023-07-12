import React, { type PropsWithChildren, createContext, useState } from 'react'
import type {
  PersonCast,
  PersonCrew,
  TVShow,
  TVShowVideos,
} from '@leandrowkz/tmdb'
import type { TVShowDetailsState } from './types'
import type { UserShowStates } from 'src/types'
import { initialState } from './state'
import { useTVShowsAPI } from 'src/hooks/apis/useTVShowsAPI'

export const TVShowDetailsContext = createContext<TVShowDetailsState>({
  ...initialState,
})

export const TVShowDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const api = useTVShowsAPI()
  const [tvShow, setTVShow] = useState<TVShow>({} as TVShow)
  const [cast, setCast] = useState<PersonCast[]>([])
  const [crew, setCrew] = useState<PersonCrew[]>([])
  const [videos, setVideos] = useState<TVShowVideos['results']>([])
  const [states, setStates] = useState<UserShowStates>({} as UserShowStates)
  const [isLoadingTVShow, setIsLoadingTVShow] = useState(false)
  const [isLoadingCredits, setIsLoadingCredits] = useState(false)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [isLoadingStates, setIsLoadingStates] = useState(false)
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

  const fetchStates = async (movieId: number) => {
    setStates({} as UserShowStates)
    setIsLoadingStates(true)

    const states = await api.fetchStates(movieId)

    setStates(states)
    setIsLoadingStates(false)
  }

  const state = {
    tvShow,
    cast,
    crew,
    videos,
    states,
    isLoadingCredits,
    isLoadingTVShow,
    isLoadingVideos,
    isLoadingStates,
    hasTVShowErrors,
    fetchCredits,
    fetchTVShow,
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
