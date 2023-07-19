import React, { type HTMLAttributes } from 'react'
import { Text } from '../Text'

interface Props extends HTMLAttributes<HTMLSpanElement> {
  score: number
  size?: 'small' | 'medium' | 'large'
}

export function Rating({ score, size = 'medium', className, ...props }: Props) {
  const rating = isNaN(score) ? 0 : score

  return (
    <Text className={className} size={size} isMuted {...props}>
      ★ {rating.toFixed(1)}
    </Text>
  )
}
