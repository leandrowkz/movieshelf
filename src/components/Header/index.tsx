import React, { type HTMLAttributes } from 'react'
import { Logo } from '../Logo'
import styles from './styles.module.css'
import { NavLink } from 'react-router-dom'
import { useScreenSize } from '../../hooks/useScreenSize'
import classNames from 'classnames'
import { UserMenu } from '../UserMenu'
import { Heading } from '../Heading'

interface Props extends HTMLAttributes<HTMLDivElement> {
  darkBackground?: boolean
}

export function Header({ darkBackground = false, className, ...props }: Props) {
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')

  const classes = classNames(styles.header, className, {
    [styles.mobile]: isMobile || isTablet,
    [styles.darkBackground]: darkBackground,
  })

  return (
    <header {...props} className={classes}>
      <Logo className={styles.logo} data-testid="logo" />
      <Menu data-testid="menu" />
      <UserMenu className={styles.user} data-testid="user-menu" />
    </header>
  )
}

function Menu(props: HTMLAttributes<HTMLDivElement>) {
  const activeClassName = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.menuItem, {
      [styles.menuActive]: isActive,
    })
  }

  return (
    <div {...props} className={styles.menu}>
      <input
        className={styles.menuCheckbox}
        type="checkbox"
        name="checkbox-menu"
        id="checkbox-menu"
      />
      <label htmlFor="checkbox-menu" className={styles.menuSandwichButton}>
        <Heading title="☰" level={2} />
      </label>
      <div className={styles.menuItems}>
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
        <NavLink
          className={activeClassName}
          to="/tv"
          data-testid="menu-tv-shows"
        >
          TV Shows
        </NavLink>
        <NavLink
          className={activeClassName}
          to="/favorites"
          data-testid="menu-favorites"
        >
          Favorites
        </NavLink>
        <NavLink
          className={activeClassName}
          to="/watchlist"
          data-testid="menu-watchlist"
        >
          Watchlist
        </NavLink>
      </div>
    </div>
  )
}
