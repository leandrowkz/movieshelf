import React, { type HTMLAttributes, useContext } from 'react'
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import { AuthContext } from 'src/context/AuthContext'
import { Dropdown } from '../Dropdown'
import md5 from 'md5'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Input } from '../Input'

export function ShowInputSearch(props: HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate()

  function debounce(func: any, timeout = 300) {
    let timer: any
    return (...args: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.call(args)
      }, timeout)
    }
  }

  return (
    <div {...props} className={styles.input} data-testid="user-menu">
      <Dropdown.Wrapper>
        <Dropdown.Trigger>
          <Input placeholder="Search for movies, tv shows..." />
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate('/favorites')}>
            💜 Favorites
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate('/watchlist')}>
            🎬 Watchlist
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate('/watched')}>
            ✅ Watched
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              window.open('https://github.com/sponsors/leandrowkz', '_blank')
            }
          >
            🥳 Be a sponsor
          </Dropdown.Item>
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
