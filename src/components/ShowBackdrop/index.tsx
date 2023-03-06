import React from 'react'
import styles from './styles.module.css'
import { Movie } from 'src/types/Movie'
import { MovieHelper } from 'src/services/MovieHelper'

type Props = {
  show: Movie,
}

export function ShowBackdrop({ show }: Props) {
  const img = MovieHelper.getImageUrl(show.backdrop_path, 500);

  return (
    <div className={styles.backdrop}>
      <img src={img} alt={show.title} />
    </div>
  )
}
