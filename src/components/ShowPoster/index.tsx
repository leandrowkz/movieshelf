import classNames from 'classnames'
import React, { ComponentPropsWithoutRef } from 'react'
import { MovieHelper } from 'src/services/MovieHelper'
import { Image } from '../Image'
import { Movie } from 'src/types/Movie'
import css from './styles.module.css'

interface Props extends ComponentPropsWithoutRef<'div'> {
  show: Movie
  width?: number | 'auto'
}

export function ShowPoster({ show, className, width = 'auto' }: Props) {
  const classes = classNames(css.poster, className)
  const img = MovieHelper.getImageUrl(show.poster_path)
  const style = { width }

  return (
    <div className={classes} style={style}>
      <Image src={img} />
    </div>
  )
}
