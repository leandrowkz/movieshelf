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
import md5 from 'md5'
import { Heading } from '../Heading'
import { Text } from '../Text'

interface Props extends HTMLAttributes<HTMLDivElement> {
  darkBackground?: boolean
}

export function UserMenu({ darkBackground = false, ...props }: Props) {
  const { session, signOut } = useContext(AuthContext)

  if (!session) {
    return (
      <Link to="/sign-up">
        <Button>Sign up</Button>
      </Link>
    )
  }

  const { user } = session

  return (
    <Dropdown.Wrapper>
      <Dropdown.Trigger>
        <Avatar />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Header>
          <Heading level={3} title={user.name} />
          <Text isMuted size="small">
            {user.email}
          </Text>
        </Dropdown.Header>
        <Dropdown.Item>
          <Link to="/favorites">💜 Favorites</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/settings">⚙️ Preferences</Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={signOut}>
          <Link to="#" onClick={signOut}>
            🚪 Sign out
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Wrapper>
  )
}

const Avatar = () => {
  const { session } = useContext(AuthContext)

  if (!session) {
    return <></>
  }

  const { user } = session
  const hash = md5(user.email)
  const img = `https://www.gravatar.com/avatar/${hash}?d=mp`

  return (
    <div className={styles.avatar}>
      <img src={img} />
    </div>
  )
}
