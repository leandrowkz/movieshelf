import React, { type HTMLAttributes, type ReactNode } from 'react'
import { Motion } from '../Motion'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { Text } from '../Text'
import classNames from 'classnames'

interface ResultProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: ReactNode
  actions?: ReactNode
  size?: 'small' | 'medium' | 'large'
}

export function Result({
  actions,
  title,
  description,
  icon,
  size = 'medium',
  ...props
}: ResultProps) {
  const classes = classNames(styles.result, props.className)

  const sizeLevelMap = {
    small: 3,
    medium: 2,
    large: 1,
  } as const

  return (
    <Motion {...props} className={classes}>
      <div className={styles.icon}>{icon || '🍿'}</div>
      <Heading level={sizeLevelMap[size]} className={styles.title}>
        {title}
      </Heading>
      {description && <Text size={size}>{description}</Text>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </Motion>
  )
}
