import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import type { PersonCast, TVShow, TVShowVideos } from '@leandrowkz/tmdb'
import { api } from '../services/TVShowsAPI'
import { Nullable } from '../types/Nullable'

type TVShowDetailsState = {
  tvShow: Nullable<TVShow>
  cast: PersonCast[]
  videos: TVShowVideos['results']
  isLoadingTVShow: boolean
  isLoadingCast: boolean
  isLoadingVideos: boolean
  hasTVShowErrors: boolean
  fetchTVShow: (tvShowId: number) => void
  fetchCast: (tvShowId: number) => void
  fetchVideos: (tvShowId: number) => void
}

export const TVShowDetailsContext = createContext<TVShowDetailsState>({
  tvShow: {} as TVShow,
  cast: [],
  videos: [],
  isLoadingTVShow: false,
  isLoadingCast: false,
  isLoadingVideos: false,
  hasTVShowErrors: false,
  fetchTVShow: () => null,
  fetchCast: () => null,
  fetchVideos: () => null,
})

export const TVShowDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [tvShow, setTVShow] = useState<TVShow>({} as TVShow)
  const [cast, setCast] = useState<PersonCast[]>([])
  const [videos, setVideos] = useState<TVShowVideos['results']>([])
  const [isLoadingTVShow, setIsLoadingTVShow] = useState(false)
  const [isLoadingCast, setIsLoadingCast] = useState(false)
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

  const fetchCast = useCallback(
    async (tvShowId: number) => {
      setIsLoadingCast(true)

      const { cast } = await api.fetchCredits(tvShowId)

      setCast(cast)
      setIsLoadingCast(false)
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
    videos,
    isLoadingCast,
    isLoadingTVShow,
    isLoadingVideos,
    hasTVShowErrors,
    fetchCast,
    fetchTVShow,
    fetchVideos,
  }

  return (
    <TVShowDetailsContext.Provider value={state}>
      {children}
    </TVShowDetailsContext.Provider>
  )
}
