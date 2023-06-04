import React, { HTMLAttributes } from 'react'
import type { TVEpisode } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Image } from '../Image'
import { useHelpers } from 'src/hooks/useHelpers'
import { Rating } from '../Rating'
import { useScreenSize } from 'src/hooks/useScreenSize'
import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  episode: TVEpisode
}

export function TVEpisodeItem({ episode, ...props }: Props) {
  const { getShowImageUrl } = useHelpers()
  const isMobile = useScreenSize('mobile')
  const classes = classNames(styles.episode, {
    [styles.mobile]: isMobile,
  })
  const {
    runtime,
    still_path: poster,
    overview,
    episode_number: epNumber,
    vote_average: rating,
  } = episode as TVEpisode & { runtime: number }

  return (
    <div className={classes} {...props}>
      <div className={styles.imageContainer}>
        {poster && (
          <Image
            src={getShowImageUrl(poster || '')}
            className={styles.image}
            data-testid="ep-poster"
          />
        )}
        <div className={styles.imageOverview} data-testid="ep-overview-image">
          <Text size="small" isMuted>
            {overview}
          </Text>
        </div>
      </div>
      <Heading
        level={3}
        title={episode.name}
        className={styles.title}
        data-testid="ep-title"
      />
      <Text size="small" className={styles.overview} data-testid="ep-overview">
        {overview}
      </Text>
      <div className={styles.metadata}>
        {Number.isInteger(epNumber) && (
          <Text size="small" isMuted data-testid="ep-number">
            Episode {epNumber}
          </Text>
        )}
        {Boolean(runtime) && (
          <Text size="small" isMuted data-testid="ep-runtime">
            {runtime} min
          </Text>
        )}
        {rating && (
          <Rating size="small" score={rating} data-testid="ep-rating" />
        )}
      </div>
    </div>
  )
}
