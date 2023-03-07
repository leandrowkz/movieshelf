import React, { ComponentPropsWithoutRef } from 'react'
import { Text } from '../Text'

interface Props extends ComponentPropsWithoutRef<'div'> {
  score: number
  size?: 'small' | 'medium' | 'large'
}

export function Rating({ score, size = 'medium', className }: Props) {
  return (
    <Text className={className} size={size} isMuted>★ {score.toFixed(1)}</Text>
  )
}
