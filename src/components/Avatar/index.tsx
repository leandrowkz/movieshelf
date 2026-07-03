import React, { type HTMLAttributes } from 'react'
import classNames from 'classnames'
import css from './styles.module.css'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  image: string
  width?: string
}

export function Avatar({ image, width, ...props }: AvatarProps) {
  const classes = classNames(css.avatar, props.className)

  return (
    <div
      {...props}
      className={classes}
      style={{ backgroundImage: `url(${image})`, width }}
    />
  )
}
