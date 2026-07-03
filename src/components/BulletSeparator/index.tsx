import React, { type ComponentPropsWithoutRef } from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import { Text } from '../Text'

interface Props extends ComponentPropsWithoutRef<'div'> {
  isMuted?: boolean
}

export function BulletSeparator({ className, isMuted = true }: Props) {
  const classes = classNames(styles.separator, className)

  return (
    <Text className={classes} isMuted={isMuted}>
      •
    </Text>
  )
}
