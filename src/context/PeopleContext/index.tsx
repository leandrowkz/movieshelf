import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { Person } from '@leandrowkz/tmdb'
import type { PeopleState } from './types'
import { initialState } from './state'
import { usePeopleAPI } from 'src/hooks/apis/usePeopleAPI'

export const PeopleContext = createContext<PeopleState>({
  ...initialState,
})

export const PeopleContextProvider = ({ children }: PropsWithChildren) => {
  const api = usePeopleAPI()

  const [person, setPerson] = useState(initialState.person)
  const [images, setImages] = useState(initialState.images)
  const [movies, setMovies] = useState(initialState.movies)
  const [tvShows, setTVShows] = useState(initialState.tvShows)
  const [isLoading, setIsLoading] = useState(initialState.isLoading)
  const [hasErrors, setHasErrors] = useState(initialState.hasErrors)

  const fetchPerson = async (personId: number) => {
    try {
      setPerson({} as Person)
      setIsLoading((prev) => ({ ...prev, fetchPerson: true }))
      setHasErrors((prev) => ({ ...prev, fetchPerson: false }))

      const data = await api.fetchPerson(personId)

      setPerson(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchPerson: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchPerson: false }))
    }
  }

  const fetchImages = async (personId: number) => {
    try {
      setImages([])
      setIsLoading((prev) => ({ ...prev, fetchImages: true }))
      setHasErrors((prev) => ({ ...prev, fetchImages: false }))

      const data = await api.fetchImages(personId)

      setImages(data)
    } catch (e) {
      setHasErrors((prev) => ({ ...prev, fetchImages: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchImages: false }))
    }
  }

  const fetchMovies = async (personId: number) => {
    try {
      setMovies([])
      setIsLoading((prev) => ({ ...prev, fetchMovies: true }))
      setHasErrors((prev) => ({ ...prev, fetchMovies: false }))

      const data = await api.fetchMovies(personId)

      setMovies(data)
    } catch {
      setHasErrors((prev) => ({ ...prev, fetchMovies: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchMovies: false }))
    }
  }

  const fetchTVShows = async (personId: number) => {
    try {
      setTVShows([])
      setIsLoading((prev) => ({ ...prev, fetchTVShows: true }))
      setHasErrors((prev) => ({ ...prev, fetchTVShows: false }))

      const data = await api.fetchTVShows(personId)

      setTVShows(data)
    } catch {
      setHasErrors((prev) => ({ ...prev, fetchTVShows: true }))
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchTVShows: false }))
    }
  }

  const state = {
    person,
    images,
    movies,
    tvShows,
    isLoading,
    hasErrors,
    fetchPerson,
    fetchImages,
    fetchMovies,
    fetchTVShows,
  }

  return (
    <PeopleContext.Provider value={state}>{children}</PeopleContext.Provider>
  )
}
