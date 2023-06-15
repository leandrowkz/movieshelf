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

function useOutsideAlerter(
  ref: RefObject<HTMLDivElement>,
  handleClickOutside: () => void
) {
  useEffect(() => {
    function onHandleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutside()
      }
    }

    document.addEventListener('mousedown', onHandleClickOutside)

    return () => {
      document.removeEventListener('mousedown', onHandleClickOutside)
    }
  }, [ref, handleClickOutside])
}

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

  useOutsideAlerter(wrapperRef, close)

  return (
    <div className={classes} ref={wrapperRef}>
      {children}
    </div>
  )
}

const Item = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={styles.item}>{children}</div>
}

export const Dropdown = {
  Item,
  Menu,
  Trigger,
  Wrapper,
}
