import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from 'src/context/AuthContext'
import { GenresContext } from 'src/context/GenresContext'
import { useScreenSize } from 'src/hooks/useScreenSize'

export const Root = () => {
  const location = useLocation()
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')
  const isSmallDevice = isMobile || isTablet
  const { autoSignIn } = useContext(AuthContext)
  const { fetchMoviesGenresCodes, fetchTVShowsGenresCodes } =
    useContext(GenresContext)

  const toastPosition = isSmallDevice ? 'bottom-center' : 'bottom-left'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    autoSignIn()
    fetchMoviesGenresCodes()
    fetchTVShowsGenresCodes()
  }, [])

  return (
    <React.Fragment>
      <Outlet />
      <ToastContainer
        theme="dark"
        autoClose={3000}
        position={toastPosition}
        closeButton={false}
        hideProgressBar
      />
    </React.Fragment>
  )
}
