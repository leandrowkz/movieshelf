import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GenresContext } from '../../context/GenresContext'
import { useScreenSize } from '../../hooks/useScreenSize'

export const Root = () => {
  const location = useLocation()
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')
  const isSmallDevice = isMobile || isTablet
  const { fetchMoviesGenresCodes, fetchTVShowsGenresCodes } =
    useContext(GenresContext)

  const toastPosition = isSmallDevice ? 'bottom-center' : 'bottom-left'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
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
