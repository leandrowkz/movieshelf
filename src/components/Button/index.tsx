import React, {
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { useScreenSize } from '../../hooks/useScreenSize'
import { RiLoader4Line } from 'react-icons/ri'

export interface ButtonProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'outlined' | 'success'
  active?: boolean
  pill?: boolean
  rounded?: boolean
  icon?: ReactNode
  isLoading?: boolean
}

export function Button({
  children,
  pill = false,
  rounded = false,
  size = 'medium',
  variant = 'primary',
  className,
  active,
  isLoading = false,
  icon,
  ...props
}: ButtonProps) {
  const isMobile = useScreenSize('mobile')
  const classes = classNames(styles.button, className, {
    [styles.mobile]: isMobile,
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.secondary]: variant === 'secondary',
    [styles.success]: variant === 'success',
    [styles.outlined]: variant === 'outlined',
    [styles.active]: active,
    [styles.pill]: pill,
    [styles.rounded]: rounded,
    [styles.isLoading]: isLoading,
  })

  return (
    <button className={classes} {...props}>
      {isLoading && (
        <Icon className={styles.iconLoader}>
          <RiLoader4Line />
        </Icon>
      )}
      {icon && !isLoading ? <Icon>{icon}</Icon> : <></>}
      {children}
    </button>
  )
}

function Icon({ children, className }: HTMLAttributes<HTMLDivElement>) {
  const classes = classNames(styles.icon, className)

  return <div className={classes}>{children}</div>
}
