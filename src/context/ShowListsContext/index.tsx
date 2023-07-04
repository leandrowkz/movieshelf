import React, { PropsWithChildren, createContext, useState } from 'react'
import { ShowType } from 'src/types/ShowType'
import { initialState } from './state'
import { ListsState, ShowListsState } from './types'
import { ListType } from 'src/types/ListType'
import { useShowListsAPI } from 'src/hooks/apis/useShowListsAPI'

export const ShowListsContext = createContext<ShowListsState>({
  ...initialState,
})

export const ShowListsContextProvider = ({ children }: PropsWithChildren) => {
  const api = useShowListsAPI()
  const [favorites, setFavorites] = useState({
    ...initialState.favorites,
  })
  const [watchlist, setWatchlist] = useState({
    ...initialState.watchlist,
  })
  const [isLoading, setIsLoading] = useState({
    ...initialState.isLoading,
  })

  const fetchShowList = async (
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
      setIsLoading((prev) => ({ ...prev, fetchShowList: true }))
      updateList({ page, hasErrors: false, isLoading: true })

      const { data, pages } = await api.fetchShowList(page, listType, showType)
      console.log(data, pages)

      updateList({ data, pages } as ListsState)
    } catch (e) {
      updateList({ data: [], hasErrors: true })
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchShowList: false }))
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

    fetchShowList(1, listType, showType)
    setIsLoading((prev) => ({ ...prev, addToList: false }))
  }

  const removeFromList = async (
    listType: ListType,
    showId: number,
    showType: ShowType
  ) => {
    setIsLoading((prev) => ({ ...prev, removeFromList: true }))

    await api.removeFromList(listType, showId, showType)

    fetchShowList(1, listType, showType)
    setIsLoading((prev) => ({ ...prev, removeFromList: false }))
  }

  const state = {
    favorites,
    watchlist,
    isLoading,
    fetchShowList,
    addToList,
    removeFromList,
  }

  return (
    <ShowListsContext.Provider value={state}>
      {children}
    </ShowListsContext.Provider>
  )
}
