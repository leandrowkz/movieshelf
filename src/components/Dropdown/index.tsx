import React, {
  HTMLAttributes,
  RefObject,
  useContext,
  useEffect,
  useRef,
} from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import {
  DropdownContext,
  DropdownContextProvider,
} from 'src/context/DropdownContext'
import { useClickOutside } from 'src/hooks/useClickOutside'

const Wrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <DropdownContextProvider>
      <div className={styles.wrapper}>{children}</div>
    </DropdownContextProvider>
  )
}

const Trigger = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const { toggle } = useContext(DropdownContext)

  return (
    <div className={styles.trigger} onClick={toggle}>
      {children}
    </div>
  )
}

const Menu = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const wrapperRef = useRef(null)
  const { isOpen, close } = useContext(DropdownContext)
  const classes = classNames(styles.menu, {
    [styles.open]: isOpen,
  })

  useClickOutside(wrapperRef, close)

  return (
    <div className={classes} ref={wrapperRef}>
      {children}
    </div>
  )
}

const Item = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={styles.item}>{children}</div>
}

const Header = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={styles.header}>{children}</div>
}

export const Dropdown = {
  Item,
  Menu,
  Header,
  Trigger,
  Wrapper,
}
