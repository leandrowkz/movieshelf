import React, { HTMLAttributes, useContext } from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Container } from '../Container'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../Button'
import { useScreenSize } from '../../hooks/useScreenSize'
import classNames from 'classnames'
import { AuthContext } from 'src/context/AuthContext'
import { Dropdown } from '../Dropdown'

interface Props extends HTMLAttributes<HTMLDivElement> {
  darkBackground?: boolean
}

export function UserMenu({ darkBackground = false, ...props }: Props) {
  const { session } = useContext(AuthContext)

  if (!session) {
    return (
      <Link to="/sign-up">
        <Button>Sign up</Button>
      </Link>
    )
  }

  const img = ''

  return (
    <Dropdown.Wrapper>
      <Dropdown.Trigger>😌</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>✴️</Dropdown.Item>
        <Dropdown.Item>⚔️</Dropdown.Item>
        <Dropdown.Item>🥰</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Wrapper>
  )
}
