import React, { HTMLAttributes } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { useScreenSize } from '../../hooks/useScreenSize'

interface Props extends HTMLAttributes<HTMLInputElement> {
  size?: 'small' | 'medium' | 'large'
}

export function Input({ size = 'medium', className, ...props }: Props) {
  const isMobile = useScreenSize('mobile')
  const classes = classNames(styles.input, className, {
    [styles.mobile]: isMobile,
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
  })

  return <input className={classes} {...props} />
}
