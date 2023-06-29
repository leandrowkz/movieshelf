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
import { SignIn } from 'src/pages/SignIn'
import { Favorites } from 'src/pages/Favorites'
import { Root } from 'src/pages/Root'

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
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
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
    ],
  },
])
