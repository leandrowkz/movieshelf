import React, { ComponentPropsWithoutRef, useContext } from 'react'
import { Text } from '../Text'
import { Movie } from 'src/types/Movie'
import { MovieGenresContext } from 'src/store/MovieGenresContext'
import { Genre } from 'src/types/Genre'

interface Props extends ComponentPropsWithoutRef<'div'> {
  show: Movie
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
}: Props) {
  if (!show.genres && !show.genre_ids) {
    return <></>
  }

  const { genres } = useContext(MovieGenresContext)

  const showGenres = Array.isArray(show.genre_ids)
    ? show.genre_ids.slice(0, limit).map((showGenreId: Genre) => {
        return (
          genres.find((genre) => genre.id === showGenreId) || {
            id: showGenreId,
            name: 'Other',
          }
        )
      })
    : show.genres.slice(0, limit)

  return (
    <div className={className}>
      {showGenres.map((genre, index) => (
        <Text key={index} size={size} isMuted>
          {index > 0 ? <span>{separator}</span> : ''}
          {genre.name}
        </Text>
      ))}
    </div>
  )
}
