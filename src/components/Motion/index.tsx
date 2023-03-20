import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends ComponentPropsWithoutRef<'div'> {
  tag?: keyof JSX.IntrinsicElements
  animation?: 'opacity'
}

export function Motion({
  tag = 'div',
  animation = 'opacity',
  children,
  className,
  ...props
}: Props) {
  const Tag = `${tag}` as keyof JSX.IntrinsicElements
  const classes = classNames(className, {
    [styles.opacity]: animation === 'opacity',
  })

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
