import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends PropsWithChildren, ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'medium' | 'large'
  pill?: boolean
}

export function Button({
  children,
  pill = false,
  size = 'medium',
  className,
  ...props
}: Props) {
  const classes = classNames(styles.button, className, {
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.pill]: pill,
  })

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
