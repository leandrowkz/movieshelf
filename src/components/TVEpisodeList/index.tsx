import React, { type HTMLAttributes } from 'react'
import type { TVEpisode } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import classNames from 'classnames'
import { TVEpisodeListLoader } from './loader'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { TVEpisodeItem } from '../TVEpisodeItem'

interface Props extends HTMLAttributes<HTMLDivElement> {
  episodes: TVEpisode[]
  isLoading?: boolean
}

export function TVEpisodeList({
  episodes,
  className,
  isLoading = false,
  ...props
}: Props) {
  if (isLoading) {
    return <TVEpisodeListLoader data-testid="loader" />
  }

  if (!episodes.length && !isLoading) {
    return <></>
  }

  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')
  const classes = classNames(styles.episodes, className, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
  })

  return (
    <section className={classes} {...props}>
      {episodes.map((episode, index) => (
        <TVEpisodeItem
          key={`episode-${episode.id}-${index}`}
          episode={episode}
        />
      ))}
    </section>
  )
}
