import React, { HTMLAttributes, useContext } from 'react'
import { Text } from '../Text'
import { Movie } from 'src/types/Movie'
import { MovieGenresContext } from 'src/store/MovieGenresContext'
import { Genre } from 'src/types/Genre'
import { MovieGenre } from 'src/types/MovieGenre'

interface Props extends HTMLAttributes<HTMLDivElement> {
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
  ...props
}: Props) {
  const { genres, genre_ids: genreIds } = show
  const isGenresArray = Array.isArray(genres)
  const isGenresIdsArray = Array.isArray(genreIds)

  if (!isGenresArray && !isGenresIdsArray) {
    return <></>
  }

  const { genres: genresFromContext } = useContext(MovieGenresContext)

  let showGenres: MovieGenre[] = []

  if (isGenresArray) {
    showGenres = genres.slice(0, limit)
  } else if (isGenresIdsArray) {
    showGenres = genreIds.slice(0, limit).map((showGenreId: Genre) => {
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
