import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Root } from 'src/pages/Root'
import { Home } from '../pages/Home'
import { MovieDetails } from '../pages/MovieDetails'
import { Movies } from '../pages/Movies'
import { MovieGenre } from 'src/pages/MovieGenre'
import { TVShowDetails } from '../pages/TVShowDetails'
import { NotFound } from 'src/pages/404'
import { TVShows } from 'src/pages/TVShows'
import { TVShowGenre } from 'src/pages/TVShowGenre'
import { SignUp } from 'src/pages/SignUp'
import { SignIn } from 'src/pages/SignIn'
import { Favorites } from 'src/pages/Favorites'
import { Watchlist } from 'src/pages/Watchlist'
import { Watched } from 'src/pages/Watched'
import { PersonDetails } from 'src/pages/PersonDetails'
import { PasswordReset } from 'src/pages/PasswordReset'
import { PasswordUpdate } from 'src/pages/PasswordUpdate'

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
        path: '/password/reset',
        element: <PasswordReset />,
      },
      {
        path: '/password/update',
        element: <PasswordUpdate />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
      {
        path: '/watchlist',
        element: <Watchlist />,
      },
      {
        path: '/watched',
        element: <Watched />,
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
