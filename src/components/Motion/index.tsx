import React, { ElementType, FC, HTMLAttributes } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
  tag?: ElementType
  animation?: 'opacity'
}

export const Motion: FC<Props> = ({
  tag = 'div',
  animation = 'opacity',
  children,
  className,
  ...props
}) => {
  const Tag = `${tag}` as ElementType
  const classes = classNames(className, {
    [styles.opacity]: animation === 'opacity',
  })

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
