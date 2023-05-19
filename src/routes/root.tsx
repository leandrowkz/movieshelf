import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { MovieDetails } from '../pages/MovieDetails'
import { Movies } from '../pages/Movies'
import { MovieCategory } from 'src/pages/MovieCategory'

export const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <Home />,
  },
  {
    path: '/movies',
    element: <Movies />,
  },
  {
    path: '/movies/category/:genreId',
    element: <MovieCategory />,
  },
  {
    index: false,
    path: '/movies/:movieId',
    element: <MovieDetails />,
  },
])
