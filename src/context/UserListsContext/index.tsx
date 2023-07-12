import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { ListsState, UserListsState } from './types'
import type { ShowType, UserListType } from 'src/types'
import { initialState } from './state'
import { useUserListsAPI } from 'src/hooks/apis/useUserListsAPI'

export const UserListsContext = createContext<UserListsState>({
  ...initialState,
})

export const UserListsContextProvider = ({ children }: PropsWithChildren) => {
  const api = useUserListsAPI()
  const [favorites, setFavorites] = useState({
    ...initialState.favorites,
  })
  const [watchlist, setWatchlist] = useState({
    ...initialState.watchlist,
  })
  const [watched, setWatched] = useState({
    ...initialState.watchlist,
  })
  const [isLoading, setIsLoading] = useState({
    ...initialState.isLoading,
  })

  const fetchList = async (
    page: number,
    listType: UserListType,
    showType: ShowType
  ) => {
    const updateList = (values: ListsState) => {
      const key = showType === 'movie' ? 'movies' : 'tvShows'

      const getState = (
        prev: UserListsState['favorites' | 'watchlist' | 'watched']
      ) => ({
        ...prev,
        [key]: {
          ...prev[key],
          ...values,
        },
      })

      if (listType === 'favorites') {
        setFavorites((prev) => getState(prev))
      } else if (listType === 'watchlist') {
        setWatchlist((prev) => getState(prev))
      } else if (listType === 'watched') {
        setWatched((prev) => getState(prev))
      }
    }

    try {
      setIsLoading((prev) => ({ ...prev, fetchList: true }))
      updateList({ page, hasErrors: false, isLoading: true })

      const { data, pages } = await api.fetchList(page, listType, showType)

      updateList({ data, pages } as ListsState)
    } catch (e) {
      updateList({ data: [], hasErrors: true })
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchList: false }))
      updateList({ isLoading: false })
    }
  }

  const addToList = async (
    listType: UserListType,
    showId: number,
    showType: ShowType
  ) => {
    setIsLoading((prev) => ({ ...prev, [listType]: true }))

    const states = await api.addToList(listType, showId, showType)

    setIsLoading((prev) => ({ ...prev, [listType]: false }))

    return states
  }

  const removeFromList = async (
    listType: UserListType,
    showId: number,
    showType: ShowType
  ) => {
    setIsLoading((prev) => ({ ...prev, [listType]: true }))

    const states = await api.removeFromList(listType, showId, showType)

    setIsLoading((prev) => ({ ...prev, [listType]: false }))

    return states
  }

  const state = {
    favorites,
    watchlist,
    watched,
    isLoading,
    fetchList,
    addToList,
    removeFromList,
  }

  return (
    <UserListsContext.Provider value={state}>
      {children}
    </UserListsContext.Provider>
  )
}
