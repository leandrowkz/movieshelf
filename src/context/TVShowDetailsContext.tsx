import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import type {
  PersonCast,
  PersonCrew,
  TVShow,
  TVShowAccountStates,
  TVShowVideos,
} from '@leandrowkz/tmdb'
import { api } from '../services/TVShowsAPI'

type TVShowDetailsState = {
  tvShow: TVShow
  cast: PersonCast[]
  crew: PersonCrew[]
  videos: TVShowVideos['results']
  accountStates: TVShowAccountStates
  isLoadingTVShow: boolean
  isLoadingCredits: boolean
  isLoadingVideos: boolean
  isLoadingAccountStates: boolean
  hasTVShowErrors: boolean
  fetchTVShow: (tvShowId: number) => void
  fetchCredits: (tvShowId: number) => void
  fetchVideos: (tvShowId: number) => void
  fetchAccountStates: (movieId: number) => void
}

export const TVShowDetailsContext = createContext<TVShowDetailsState>({
  tvShow: {} as TVShow,
  cast: [],
  crew: [],
  videos: [],
  accountStates: {} as TVShowAccountStates,
  isLoadingTVShow: false,
  isLoadingCredits: false,
  isLoadingVideos: false,
  hasTVShowErrors: false,
  isLoadingAccountStates: false,
  fetchTVShow: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchAccountStates: () => null,
})

export const TVShowDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
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

  const fetchTVShow = useCallback(
    async (tvShowId: number) => {
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
    },
    [api]
  )

  const fetchCredits = useCallback(
    async (tvShowId: number) => {
      setIsLoadingCredits(true)

      const { cast, crew } = await api.fetchCredits(tvShowId)

      setCast(cast)
      setCrew(crew)
      setIsLoadingCredits(false)
    },
    [api]
  )

  const fetchVideos = useCallback(
    async (tvShowId: number) => {
      setIsLoadingVideos(true)

      const videos = await api.fetchVideos(tvShowId)

      setVideos(videos)
      setIsLoadingVideos(false)
    },
    [api]
  )

  const fetchAccountStates = useCallback(
    async (movieId: number) => {
      setAccountStates({} as TVShowAccountStates)
      setIsLoadingAccountStates(true)

      const accountStates = await api.fetchAccountStates(movieId)

      setAccountStates(accountStates)
      setIsLoadingAccountStates(false)
    },
    [api]
  )

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
