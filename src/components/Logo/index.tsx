import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from 'src/types/Routes'
import ImgLogo from '../../assets/logo.svg'

export function Logo() {
  return (
    <Link to={Routes.HOME}>
      <img src={ImgLogo} alt="movieshelf logo" />
    </Link>
  )
}
