import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { MovieGenresContext } from '../../store/MovieGenresContext'

export const Root = ({ children }: PropsWithChildren) => {
  const { fetchGenres } = useContext(MovieGenresContext)

  useEffect(() => {
    fetchGenres()
  }, [fetchGenres])

  return <React.Fragment>{children}</React.Fragment>
}
