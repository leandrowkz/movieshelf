import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { Motion } from '../Motion'

interface LoaderProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<'div'> {}

interface CircleProps extends ComponentPropsWithoutRef<'div'> {
  width: number | string
}

interface RectangleProps extends ComponentPropsWithoutRef<'div'> {
  width?: number | string
  height?: number | string
}

interface ParagraphProps extends ComponentPropsWithoutRef<'div'> {
  lines: number
}

export function Loader({ className, children, ...props }: LoaderProps) {
  const classes = classNames(styles.loader, className)

  return (
    <Motion tag="div" className={classes} {...props}>
      {children}
    </Motion>
  )
}

export function Circle({ width, className, ...props }: CircleProps) {
  const classes = classNames(styles.circle, className)

  return <Motion className={classes} style={{ width }} {...props} />
}

export function Rectangle({
  width,
  height,
  className,
  ...props
}: RectangleProps) {
  const classes = classNames(styles.rectangle, className)

  return <Motion className={classes} style={{ width, height }} {...props} />
}

export function Paragraph({ lines, className, ...props }: ParagraphProps) {
  const classes = classNames(styles.paragraph, className)
  const content = []

  for (let i = 0; i < lines; i++) {
    const min = Math.ceil(90)
    const max = Math.floor(100)
    const width = Math.floor(Math.random() * (max - min + 1)) + min

    content.push(
      <Rectangle
        width={`${width}%`}
        className={styles.paragraphLine}
        key={`rectangle-${i * Math.random()}`}
      />
    )
  }

  return (
    <Motion tag="div" className={classes} {...props}>
      {content}
    </Motion>
  )
}
