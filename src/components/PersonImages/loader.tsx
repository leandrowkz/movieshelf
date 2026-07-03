import React, { type HTMLAttributes } from 'react'
import { Loader, Rectangle } from '../Loader'
import css from './styles.module.css'
import classNames from 'classnames'

export function PersonImagesLoader(props: HTMLAttributes<HTMLDivElement>) {
  const classes = classNames(css.images, props.className)

  return (
    <Loader {...props} className={classes}>
      <Rectangle height={100} width={100} />
      <Rectangle height={100} width={100} />
      <Rectangle height={100} width={100} />
    </Loader>
  )
}
