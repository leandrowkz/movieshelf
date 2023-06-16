import React, { HTMLAttributes } from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { Container } from '../Container'
import { Link, NavLink } from 'react-router-dom'
import { useScreenSize } from '../../hooks/useScreenSize'
import classNames from 'classnames'
import { UserMenu } from '../UserMenu'

interface Props extends HTMLAttributes<HTMLDivElement> {
  darkBackground?: boolean
}

export function Header({ darkBackground = false, ...props }: Props) {
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')

  return (
    <Container {...props}>
      <header className={styles.header}>
        <Logo
          className={styles.logo}
          data-testid="logo"
          onlyIcon={isMobile || isTablet}
        />
        <Menu darkBackground={darkBackground} />
        <UserMenu />
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
      <Link
        className={activeClassName({ isActive: false })}
        to="https://github.com/sponsors/leandrowkz"
        target="_blank"
      >
        Be a sponsor
      </Link>
    </div>
  )
}
