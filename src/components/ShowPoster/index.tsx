import React, { type HTMLAttributes } from 'react'
import classNames from 'classnames'
import type { Movie, MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { Image } from '../Image'
import css from './styles.module.css'
import { useHelpers } from 'src/hooks/useHelpers'

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: MovieItem | Movie | TVShowItem
  width?: number | 'auto'
}

export function ShowPoster({
  show,
  className,
  width = 'auto',
  ...props
}: Props) {
  const classes = classNames(css.poster, className)
  const { getShowTitle, getShowImageUrl } = useHelpers()
  const { poster_path: poster } = show
  const style = { width }

  return (
    <div className={classes} style={style} {...props}>
      {poster && (
        <Image
          src={getShowImageUrl(poster || '')}
          title={getShowTitle(show)}
          data-testid="show-poster-image"
        />
      )}
    </div>
  )
}
