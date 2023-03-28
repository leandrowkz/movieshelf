import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { Motion } from '../Motion'

interface LoaderProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<'div'> {}

export function Loader({ className, children }: LoaderProps) {
  const classes = classNames(styles.loader, className)

  return (
    <Motion tag="div" className={classes}>
      {children}
    </Motion>
  )
}

interface CircleProps extends ComponentPropsWithoutRef<'div'> {
  width: number | string
}

export function Circle({ width, className }: CircleProps) {
  const classes = classNames(styles.circle, className)

  return <Motion className={classes} style={{ width }} />
}

interface RectangleProps extends ComponentPropsWithoutRef<'div'> {
  width?: number | string
  height?: number | string
}

export function Rectangle({ width, height, className }: RectangleProps) {
  const classes = classNames(styles.rectangle, className)

  return <Motion className={classes} style={{ width, height }} />
}

interface ParagraphProps extends ComponentPropsWithoutRef<'div'> {
  lines: number
}

export function Paragraph({ lines, className }: ParagraphProps) {
  const classes = classNames(styles.paragraph, className)
  const content = []

  for (let i = 0; i < lines; i++) {
    const min = Math.ceil(90)
    const max = Math.floor(100)
    const width = Math.floor(Math.random() * (max - min + 1)) + min

    content.push(
      <Rectangle width={`${width}%`} className={styles.paragraphLine} />
    )
  }

  return (
    <Motion tag="div" className={classes}>
      {content}
    </Motion>
  )
}
