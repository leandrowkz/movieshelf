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
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')
  const { session } = useContext(AuthContext)

  if (!session) {
    return (
      <Link to="/sign-up">
        <Button>Sign up</Button>
      </Link>
    )
  }

  return (
    <Container {...props}>
      <header className={styles.header}>
        <Logo
          className={styles.logo}
          data-testid="logo"
          onlyIcon={isMobile || isTablet}
        />
        <Menu darkBackground={darkBackground} />
        <Link
          to="https://github.com/sponsors/leandrowkz"
          target="_blank"
          rel="nofollow noopener noreferrer"
          data-testid="sponsor"
        >
          <Button variant="secondary" size="small" className={styles.sponsor}>
            Sponsor 💜
          </Button>
        </Link>
      </header>
    </Container>
  )
}

type MenuProps = {
  darkBackground: boolean
}

function Menu({ darkBackground = false }: MenuProps) {
  const activeClassName = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.menuItem, {
      [styles.menuActive]: isActive,
      [styles.menuDarkBackground]: darkBackground,
    })
  }

  return (
    <div className={styles.menu} data-testid="menu">
      <NavLink className={activeClassName} to="/" data-testid="menu-all">
        All
      </NavLink>
      <NavLink
        className={activeClassName}
        to="/movies"
        data-testid="menu-movies"
      >
        Movies
      </NavLink>
      <NavLink className={activeClassName} to="/tv" data-testid="menu-tv-shows">
        TV Shows
      </NavLink>
    </div>
  )
}
