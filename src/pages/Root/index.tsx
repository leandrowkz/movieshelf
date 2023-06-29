import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'
import { GenresContext } from 'src/context/GenresContext'

export const Root = () => {
  const location = useLocation()
  const { autoSignIn } = useContext(AuthContext)
  const { fetchMoviesGenres, fetchTVShowsGenres } = useContext(GenresContext)

  useEffect(() => {
    autoSignIn()
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    fetchMoviesGenres()
    fetchTVShowsGenres()
  }, [])

  return <Outlet />
}
