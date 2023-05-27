import React, { HTMLAttributes, useContext } from 'react'
import type {
  Movie,
  MovieItem,
  Genre,
  GenreCode,
  TVShowItem,
} from '@leandrowkz/tmdb'
import { Text } from '../Text'
import { MovieGenresContext } from '../../context/MovieGenresContext'

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: MovieItem | Movie | TVShowItem
  size?: 'small' | 'medium' | 'large'
  separator?: string
  limit?: number
}

export function ShowGenres({
  show,
  size = 'medium',
  separator = ' / ',
  className,
  limit = 2,
  ...props
}: Props) {
  const isGenresArray = 'genres' in show && Array.isArray(show.genres)
  const isGenresIdsArray = 'genre_ids' in show && Array.isArray(show.genre_ids)

  if (!isGenresArray && !isGenresIdsArray) {
    return <></>
  }

  const { genres: genresFromContext } = useContext(MovieGenresContext)

  let showGenres: Genre[] = []

  if (isGenresArray) {
    showGenres = show.genres.slice(0, limit)
  } else if (isGenresIdsArray && show.genre_ids) {
    showGenres = show.genre_ids
      .slice(0, limit)
      .map((showGenreId: GenreCode) => {
        return (
          genresFromContext.find((genre) => genre.id === showGenreId) || {
            id: showGenreId,
            name: 'Other',
          }
        )
      })
  }

  return (
    <div className={className} {...props}>
      {showGenres.map((genre, index) => (
        <Text key={index} size={size} isMuted className="genre">
          {index > 0 ? <span>{separator}</span> : ''}
          {genre.name}
        </Text>
      ))}
    </div>
  )
}
