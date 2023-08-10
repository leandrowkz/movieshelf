import React, { type HTMLAttributes } from 'react'
import { Circle, Loader, Paragraph, Rectangle } from '../Loader'
import css from './styles.module.css'
import { useScreenSize } from 'src/hooks/useScreenSize'
import classNames from 'classnames'

export function PersonLoader(props: HTMLAttributes<HTMLDivElement>) {
  const isMobile = useScreenSize('mobile')
  const classes = classNames(css.person, props.className, {
    [css.mobile]: isMobile,
  })

  return (
    <Loader {...props} className={classes}>
      <Circle className={css.avatar} width={200} />
      <Rectangle className={css.name} height={30} width={300} />
      <Rectangle className={css.knownFor} height={20} width={150} />
      <Rectangle className={css.birthplace} height={10} width={250} />
      <Rectangle className={css.birthday} height={10} width={270} />
      <Paragraph className={css.bio} lines={7} />
    </Loader>
  )
}
