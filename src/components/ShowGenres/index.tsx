import React, { ComponentPropsWithoutRef } from 'react'
import { Text } from '../Text'
import { Movie } from 'src/types/Movie'

interface Props extends ComponentPropsWithoutRef<'div'> {
  show: Movie
  size?: 'small' | 'medium' | 'large'
  separator?: string
}

export function ShowGenres({ show, size = 'medium', separator = ' / ', className }: Props) {
  return (
    <div className={className} >
      {show.genres?.map((genre, index) => (
        <Text size={size} isMuted>
          {index > 0 ? <span>{separator}</span> : ''}
          {genre.name}
        </Text>
      ))}
    </div>
  )
}
