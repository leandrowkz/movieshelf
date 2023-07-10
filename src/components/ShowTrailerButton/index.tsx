import React from 'react'
import type { Video } from '@leandrowkz/tmdb'
import { Button, ButtonProps } from '../../components/Button'
import { useHelpers } from 'src/hooks/useHelpers'
import { IoPlay } from 'react-icons/io5'

interface Props extends ButtonProps {
  videos: Video[]
}

export function ShowTrailerButton({ videos, ...props }: Props) {
  const { getShowTrailerUrl } = useHelpers()
  const trailer = getShowTrailerUrl(videos)

  if (!videos.length) {
    return <></>
  }

  return (
    <Button
      size="large"
      icon={<IoPlay />}
      onClick={() => window.open(trailer, '_blank')}
      data-testid="show-trailer"
      {...props}
    >
      Trailer
    </Button>
  )
}
