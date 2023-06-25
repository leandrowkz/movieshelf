import React, { PropsWithChildren, createContext, useState } from 'react'
import type { TVEpisodeItem, TVSeason } from '@leandrowkz/tmdb'
import { useAPI } from 'src/hooks/useAPI'

type TVSeasonDetailsState = {
  season: TVSeason
  episodes: TVEpisodeItem[]
  isLoadingSeason: boolean
  hasSeasonErrors: boolean
  fetchSeasonDetails: (tvShowId: number, seasonNumber: number) => void
}

export const TVSeasonDetailsContext = createContext<TVSeasonDetailsState>({
  season: {} as TVSeason,
  episodes: [],
  isLoadingSeason: false,
  hasSeasonErrors: false,
  fetchSeasonDetails: () => null,
})

export const TVSeasonDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const api = useAPI('tv-seasons')
  const [season, setSeason] = useState<TVSeason>({} as TVSeason)
  const [episodes, setEpisodes] = useState<TVEpisodeItem[]>([])
  const [isLoadingSeason, setIsLoadingSeason] = useState(false)
  const [hasSeasonErrors, setHasSeasonErrors] = useState(false)

  const fetchSeasonDetails = async (tvShowId: number, seasonNumber: number) => {
    try {
      setSeason({} as TVSeason)
      setIsLoadingSeason(true)

      const data = await api.fetchDetails(tvShowId, seasonNumber)

      setSeason(data)
      setEpisodes(data.episodes)
    } catch (e) {
      setHasSeasonErrors(true)
    } finally {
      setIsLoadingSeason(false)
    }
  }

  const state = {
    season,
    episodes,
    isLoadingSeason,
    hasSeasonErrors,
    fetchSeasonDetails,
  }

  return (
    <TVSeasonDetailsContext.Provider value={state}>
      {children}
    </TVSeasonDetailsContext.Provider>
  )
}
