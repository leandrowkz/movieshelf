import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends ComponentPropsWithoutRef<'div'>, PropsWithChildren {
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
}: Props) {
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
  })

  const Text = isParagraph ? 'p' : 'span'

  return <Text className={classes}>{children}</Text>
}
