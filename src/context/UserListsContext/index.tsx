import React, { PropsWithChildren, createContext, useState } from 'react'
import { ShowType } from 'src/types/ShowType'
import { initialState } from './state'
import { ListsState, UserListsState } from './types'
import { ListType } from 'src/types/ListType'
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
  const [isLoading, setIsLoading] = useState({
    ...initialState.isLoading,
  })

  const fetchList = async (
    page: number,
    listType: ListType,
    showType: ShowType
  ) => {
    const updateList = (values: ListsState) => {
      const key = showType === 'movie' ? 'movies' : 'tvShows'

      if (listType === 'favorites') {
        setFavorites((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            ...values,
          },
        }))
      } else if (listType === 'watchlist') {
        setWatchlist((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            ...values,
          },
        }))
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
    listType: ListType,
    showId: number,
    showType: ShowType
  ) => {
    setIsLoading((prev) => ({ ...prev, addToList: true }))

    await api.addToList(listType, showId, showType)

    fetchList(1, listType, showType)
    setIsLoading((prev) => ({ ...prev, addToList: false }))
  }

  const removeFromList = async (
    listType: ListType,
    showId: number,
    showType: ShowType
  ) => {
    setIsLoading((prev) => ({ ...prev, removeFromList: true }))

    await api.removeFromList(listType, showId, showType)

    fetchList(1, listType, showType)
    setIsLoading((prev) => ({ ...prev, removeFromList: false }))
  }

  const state = {
    favorites,
    watchlist,
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
