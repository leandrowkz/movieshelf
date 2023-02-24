import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home } from 'src/pages/Home'
import { Routes } from 'src/types/Routes'

export const router = createBrowserRouter([
  {
    id: Routes.HOME,
    path: '/',
    element: <Home />,
  },
]);
