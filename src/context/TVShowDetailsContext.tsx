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
  TVShowVideos,
} from '@leandrowkz/tmdb'
import { api } from '../services/TVShowsAPI'
import { Nullable } from '../types/Nullable'

type TVShowDetailsState = {
  tvShow: TVShow
  cast: PersonCast[]
  crew: PersonCrew[]
  videos: TVShowVideos['results']
  isLoadingTVShow: boolean
  isLoadingCredits: boolean
  isLoadingVideos: boolean
  hasTVShowErrors: boolean
  fetchTVShow: (tvShowId: number) => void
  fetchCredits: (tvShowId: number) => void
  fetchVideos: (tvShowId: number) => void
}

export const TVShowDetailsContext = createContext<TVShowDetailsState>({
  tvShow: {} as TVShow,
  cast: [],
  crew: [],
  videos: [],
  isLoadingTVShow: false,
  isLoadingCredits: false,
  isLoadingVideos: false,
  hasTVShowErrors: false,
  fetchTVShow: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
})

export const TVShowDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [tvShow, setTVShow] = useState<TVShow>({} as TVShow)
  const [cast, setCast] = useState<PersonCast[]>([])
  const [crew, setCrew] = useState<PersonCrew[]>([])
  const [videos, setVideos] = useState<TVShowVideos['results']>([])
  const [isLoadingTVShow, setIsLoadingTVShow] = useState(false)
  const [isLoadingCredits, setIsLoadingCredits] = useState(false)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [hasTVShowErrors, setHasTVShowErrors] = useState(false)

  const fetchTVShow = useCallback(
    async (tvShowId: number) => {
      try {
        setTVShow({} as TVShow)
        setIsLoadingTVShow(true)

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

  const state = {
    tvShow,
    cast,
    crew,
    videos,
    isLoadingCredits,
    isLoadingTVShow,
    isLoadingVideos,
    hasTVShowErrors,
    fetchCredits,
    fetchTVShow,
    fetchVideos,
  }

  return (
    <TVShowDetailsContext.Provider value={state}>
      {children}
    </TVShowDetailsContext.Provider>
  )
}
