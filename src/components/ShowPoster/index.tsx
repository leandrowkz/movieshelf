import classNames from 'classnames'
import React, { HTMLAttributes } from 'react'
import type { Movie, MovieItem } from '@leandrowkz/tmdb'
import { MovieHelper } from '../../services/MovieHelper'
import { Image } from '../Image'
import css from './styles.module.css'

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: MovieItem | Movie
  width?: number | 'auto'
}

export function ShowPoster({
  show,
  className,
  width = 'auto',
  ...props
}: Props) {
  const classes = classNames(css.poster, className)
  const { poster_path: poster } = show
  const img = MovieHelper.getImageUrl(poster || '')
  const style = { width }

  return (
    <div className={classes} style={style} {...props}>
      {poster && (
        <Image src={img} title={show.title} data-testid="show-poster" />
      )}
    </div>
  )
}
