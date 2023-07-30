import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { ListFilters } from 'src/types'
import type { SearchState } from './types'
import { initialState } from './state'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'
import { useHelpers } from 'src/hooks/useHelpers'
import { useTVShowsAPI } from 'src/hooks/apis/useTVShowsAPI'

export const SearchContext = createContext<SearchState>({
  ...initialState,
})

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const moviesAPI = useMoviesAPI()
  const tvShowsAPI = useTVShowsAPI()
  const { getEmptyListPaginated } = useHelpers()

  const [results, setResults] = useState(initialState.results)

  const search = async (filters?: ListFilters) => {
    try {
      setResults({
        ...getEmptyListPaginated(),
        isLoading: true,
        hasErrors: false,
      })

      const [movies, tvShows] = await Promise.all([
        moviesAPI.fetchListSearch(filters),
        tvShowsAPI.fetchListSearch(filters),
      ])

      setResults((prev) => ({
        ...prev,
        data: [...movies.data, ...tvShows.data].sort(
          (a, b) => b.popularity - a.popularity
        ),
        pages: movies.pages + tvShows.pages,
        count: movies.count + tvShows.count,
        isLoading: false,
      }))
    } catch {
      setResults((prev) => ({
        ...prev,
        data: [],
        hasErrors: true,
        isLoading: false,
      }))
    }
  }

  const state = {
    results,
    search,
  }

  return (
    <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
  )
}
