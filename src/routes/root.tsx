import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { MovieDetails } from '../pages/MovieDetails'
import { Movies } from '../pages/Movies'
import { MovieCategory } from 'src/pages/MovieCategory'
import { TVShowDetails } from '../pages/TVShowDetails'
import { NotFound } from 'src/pages/404'
import { TVShows } from 'src/pages/TVShows'
import { TVShowCategory } from 'src/pages/TVShowCategory'
import { SignUp } from 'src/pages/SignUp'

export const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <Home />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
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
    path: '/movies/:movieId',
    element: <MovieDetails />,
  },
  {
    path: '/tv',
    element: <TVShows />,
  },
  {
    path: '/tv/category/:genreId',
    element: <TVShowCategory />,
  },
  {
    path: '/tv/:tvShowId',
    element: <TVShowDetails />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
