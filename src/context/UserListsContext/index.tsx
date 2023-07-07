import React, { PropsWithChildren, createContext, useState } from 'react'
import { ShowType } from 'src/types/ShowType'
import { initialState } from './state'
import { ListsState, UserListsState } from './types'
import { UserListType } from 'src/types/UserListType'
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
    setIsLoading((prev) => ({ ...prev, addToList: true }))

    await api.addToList(listType, showId, showType)

    fetchList(1, listType, showType)
    setIsLoading((prev) => ({ ...prev, addToList: false }))
  }

  const removeFromList = async (
    listType: UserListType,
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
