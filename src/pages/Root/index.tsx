import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { GenresContext } from 'src/context/GenresContext'

export const Root = ({ children }: PropsWithChildren) => {
  const { fetchMoviesGenres, fetchTVShowsGenres } = useContext(GenresContext)

  useEffect(() => {
    fetchMoviesGenres()
    fetchTVShowsGenres()
  }, [])

  return <React.Fragment>{children}</React.Fragment>
}
