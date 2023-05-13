import React, { HTMLAttributes } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { useScreenSize } from '../../hooks/useScreenSize'

interface Props extends HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large'
  alignment?: 'left' | 'center' | 'right'
  isMuted?: boolean
  isParagraph?: boolean
  isBold?: boolean
}

export function Text({
  size = 'medium',
  alignment = 'left',
  isMuted = false,
  isParagraph = false,
  isBold = false,
  children,
  className = '',
  ...props
}: Props) {
  const isMobile = useScreenSize('mobile')
  const classes = classNames({
    [className]: true,
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.center]: alignment === 'center',
    [styles.right]: alignment === 'right',
    [styles.text]: true,
    [styles.muted]: isMuted,
    [styles.bold]: isBold,
    [styles.paragraph]: isParagraph,
    [styles.mobile]: isMobile && size !== 'small',
  })

  const Text = isParagraph ? 'p' : 'span'

  return (
    <Text className={classes} {...props}>
      {children}
    </Text>
  )
}
