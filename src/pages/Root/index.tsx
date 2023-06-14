import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { GenresContext } from 'src/context/GenresContext'

export const Root = ({ children }: PropsWithChildren) => {
  const { signInFromStorage } = useContext(AuthContext)
  const { fetchMoviesGenres, fetchTVShowsGenres } = useContext(GenresContext)

  useEffect(() => {
    signInFromStorage()
    fetchMoviesGenres()
    fetchTVShowsGenres()
  }, [])

  return <React.Fragment>{children}</React.Fragment>
}
