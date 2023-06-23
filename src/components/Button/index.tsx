import React, {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { useScreenSize } from '../../hooks/useScreenSize'
import { Spinner } from '../Spinner'

interface Props extends PropsWithChildren, ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'outlined'
  active?: boolean
  pill?: boolean
  icon?: ReactNode
  isLoading?: boolean
}

export function Button({
  children,
  pill = false,
  size = 'medium',
  variant = 'primary',
  className,
  active,
  isLoading = false,
  icon,
  ...props
}: Props) {
  const isMobile = useScreenSize('mobile')
  const classes = classNames(styles.button, className, {
    [styles.mobile]: isMobile,
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.secondary]: variant === 'secondary',
    [styles.outlined]: variant === 'outlined',
    [styles.active]: active,
    [styles.pill]: pill,
    [styles.isLoading]: isLoading,
  })

  return (
    <button className={classes} {...props}>
      {isLoading && (
        <Spinner className={classNames(styles.icon, styles.spinner)} />
      )}
      {icon && !isLoading ? <Icon>{icon}</Icon> : <></>}
      {children}
    </button>
  )
}

function Icon({ children }: HTMLAttributes<HTMLDivElement>) {
  return <div className={styles.icon}>{children}</div>
}
