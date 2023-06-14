import React, { HTMLAttributes, useContext } from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Container } from '../Container'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../Button'
import { useScreenSize } from '../../hooks/useScreenSize'
import classNames from 'classnames'
import { AuthContext } from 'src/context/AuthContext'

interface Props extends HTMLAttributes<HTMLDivElement> {
  darkBackground?: boolean
}

export function UserMenu({ darkBackground = false, ...props }: Props) {
  const { session } = useContext(AuthContext)

  console.log(session)

  if (!session?.accessToken) {
    return (
      <Link to="/sign-up">
        <Button>Sign up</Button>
      </Link>
    )
  }

  return <section {...props}>😌</section>
}
