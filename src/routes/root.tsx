import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home } from 'src/pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);
