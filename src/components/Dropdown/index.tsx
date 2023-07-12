import React, { type HTMLAttributes, useContext, useRef } from 'react'
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

const Menu = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const wrapperRef = useRef(null)
  const { isOpen, close } = useContext(DropdownContext)
  const classes = classNames(styles.menu, {
    [styles.open]: isOpen,
  })

  useClickOutside(wrapperRef, close)

  return (
    <div className={classes} ref={wrapperRef} {...props}>
      {children}
    </div>
  )
}

const Item = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.item} {...props}>
      {children}
    </div>
  )
}

const Header = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.header} {...props}>
      {children}
    </div>
  )
}

export const Dropdown = {
  Item,
  Menu,
  Header,
  Trigger,
  Wrapper,
}
