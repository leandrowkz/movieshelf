import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { useScreenSize } from 'src/hooks/useScreenSize'

interface Props extends ComponentPropsWithoutRef<'div'> {
  title: string
  level: 1 | 2 | 3
  isThin?: boolean
}

export function Heading({
  title,
  level = 1,
  isThin = false,
  className,
}: Props) {
  const isMobile = useScreenSize('mobile')
  const classes = classNames(className, styles.heading, {
    [`${styles[`heading-${level}`]}`]: true,
    [styles.headingThin]: isThin,
    [styles.mobile]: isMobile,
  })

  return <div className={classes}>{title}</div>
}
