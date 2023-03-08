import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home } from 'src/pages/Home'
import { MovieDetails } from 'src/pages/MovieDetails'

export const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <Home />,
  },
  {
    index: false,
    path: '/movies/:movieId',
    element: <MovieDetails />,
  },
])
