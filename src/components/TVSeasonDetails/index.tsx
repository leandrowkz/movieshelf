import React, { HTMLAttributes } from 'react'
import type { TVSeason } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import classNames from 'classnames'
import { Container } from '../Container'
import { Text } from '../Text'
import { TVEpisodeList } from '../TVEpisodeList'
import { TVSeasonDetailsLoader } from './loader'

interface Props extends HTMLAttributes<HTMLDivElement> {
  season: TVSeason
  isLoading?: boolean
}

export function TVSeasonDetails({
  season,
  className,
  isLoading = false,
  ...props
}: Props) {
  if (isLoading) {
    return <TVSeasonDetailsLoader data-testid="loader" />
  }

  if (!season || !season.id) {
    return <></>
  }

  const classes = classNames(styles.tvSeasonDetails, className)

  return (
    <section className={classes} {...props}>
      <Container>
        {season.overview && (
          <Text isParagraph data-testid="season-overview">
            {season.overview}
          </Text>
        )}
        <Heading
          level={3}
          title={`Episodes (${season.episodes.length})`}
          className={styles.subtitle}
          data-testid="season-header"
        />
        <TVEpisodeList
          episodes={season.episodes}
          data-testid="season-episodes"
        />
      </Container>
    </section>
  )
}
