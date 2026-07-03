import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Root } from '../pages/Root'
import { Home } from '../pages/Home'
import { MovieDetails } from '../pages/MovieDetails'
import { Movies } from '../pages/Movies'
import { MovieGenre } from '../pages/MovieGenre'
import { TVShowDetails } from '../pages/TVShowDetails'
import { NotFound } from '../pages/404'
import { TVShows } from '../pages/TVShows'
import { TVShowGenre } from '../pages/TVShowGenre'
import { PersonDetails } from '../pages/PersonDetails'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
      {
        path: '/movies/category/:genreId',
        element: <MovieGenre />,
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
        element: <TVShowGenre />,
      },
      {
        path: '/tv/:tvShowId',
        element: <TVShowDetails />,
      },
      {
        path: '/person/:personId',
        element: <PersonDetails />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
