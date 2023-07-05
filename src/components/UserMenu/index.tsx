import React, { HTMLAttributes, useContext } from 'react'
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import { AuthContext } from 'src/context/AuthContext'
import { Dropdown } from '../Dropdown'
import md5 from 'md5'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { useScreenSize } from 'src/hooks/useScreenSize'

export function UserMenu(props: HTMLAttributes<HTMLDivElement>) {
  const isMobile = useScreenSize('mobile')
  const navigate = useNavigate()
  const { session, signOut } = useContext(AuthContext)

  const doSignOut = () => {
    signOut().then(() => navigate('/'))
  }

  if (!session) {
    return (
      <div {...props}>
        <Link to="/sign-up" data-testid="sign-up">
          <Button size={isMobile ? 'small' : 'medium'}>Sign up</Button>
        </Link>
      </div>
    )
  }

  const { user } = session

  return (
    <div {...props} data-testid="user-menu">
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
          <Dropdown.Item onClick={() => navigate('/favorites')}>
            💜 Favorites
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate('/watchlist')}>
            🎬 Watchlist
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              window.open('https://github.com/sponsors/leandrowkz', '_blank')
            }
          >
            🖖 Sponsor
          </Dropdown.Item>
          <Dropdown.Item onClick={() => doSignOut()}>🚪 Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Wrapper>
    </div>
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
    <div className={styles.avatar} data-testid="user-avatar">
      <img src={img} />
    </div>
  )
}
