import React, {
  type HTMLAttributes,
  useContext,
  useRef,
  useEffect,
} from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import {
  DropdownContext,
  DropdownContextProvider,
} from 'src/context/DropdownContext'
import { useClickOutside } from 'src/hooks/useClickOutside'

interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  onOpen?: () => void
  onClose?: () => void
}

const Wrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <DropdownContextProvider>
      <div className={styles.wrapper}>{children}</div>
    </DropdownContextProvider>
  )
}

const Trigger = ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
  const { open } = useContext(DropdownContext)
  const classes = classNames(styles.trigger, className)

  return (
    <div className={classes} onClick={open} onFocus={open}>
      {children}
    </div>
  )
}

const Menu = ({
  children,
  className,
  onOpen,
  onClose,
  ...props
}: DropdownMenuProps) => {
  const wrapperRef = useRef(null)
  const { isOpen, close } = useContext(DropdownContext)
  const classes = classNames(styles.menu, className, {
    [styles.open]: isOpen,
  })

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen()
    }

    if (!isOpen && onClose) {
      onClose()
    }
  }, [isOpen])

  // const handleClose = () => {
  //   if (onClose) {
  //     onClose()
  //   }

  //   close()
  // }

  useClickOutside(wrapperRef, close)

  return (
    <div {...props} className={classes} ref={wrapperRef}>
      {children}
    </div>
  )
}

const Item = ({
  children,
  className,
  onClick,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { close } = useContext(DropdownContext)
  const classes = classNames(styles.item, className)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    close()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <div {...props} className={classes} onClick={handleClick}>
      {children}
    </div>
  )
}

const Header = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const classes = classNames(styles.header, className)

  return (
    <div className={classes} {...props}>
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
