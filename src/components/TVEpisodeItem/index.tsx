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
  const hasMetadata = Boolean(runtime || rating)

  return (
    <div className={classes} {...props}>
      <div className={styles.imageContainer}>
        {poster && (
          <Image src={getShowImageUrl(poster || '')} className={styles.image} />
        )}
        <div className={styles.imageOverview}>
          <Text size="small" isMuted>
            {overview}
          </Text>
        </div>
      </div>

      <Heading level={3} title={episode.name} className={styles.title} />
      <Text size="small" className={styles.overview}>
        {overview}
      </Text>
      <div className={styles.metadata}>
        {epNumber && (
          <Text size="small" isMuted>
            Episode {epNumber}
          </Text>
        )}
        {hasMetadata && (
          <>
            <Text size="small" isMuted>
              {runtime} min
            </Text>
            <Rating size="small" score={rating} />
          </>
        )}
      </div>
    </div>
  )
}
