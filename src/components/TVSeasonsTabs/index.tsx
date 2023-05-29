import React, { HTMLAttributes, useState } from 'react'
import type { TVSeasonItem } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { ShowItem } from '../ShowItem'
import classNames from 'classnames'
import { Motion } from '../Motion'
import { ShowCarouselLoader } from './loader'
import { Link } from 'react-router-dom'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Button } from '../Button'
import { Container } from '../Container'

interface Props extends HTMLAttributes<HTMLDivElement> {
  seasons: TVSeasonItem[]
  title: string
  isLoading?: boolean
}

export function TVSeasonsTabs({
  seasons,
  title,
  className,
  isLoading = false,
  ...props
}: Props) {
  const [seasonSelected, setSeasonSelected] = useState<TVSeasonItem>(
    {} as TVSeasonItem
  )

  if ((!seasons || !seasons.length) && !isLoading) {
    return <></>
  }

  if (!seasonSelected.id) {
    setSeasonSelected(seasons[0])
  }

  const classes = classNames(styles.tvSeasonsTabs, className)

  return (
    <section className={classes} {...props}>
      <Header title={title} />
      <Tabs
        seasons={seasons}
        seasonSelected={seasonSelected}
        onSeasonSelect={(season) => setSeasonSelected(season)}
      />
      {/* <TVSeasonTabDetails season={seasonSelected} /> */}
    </section>
  )
}

type PropsTVSeasonTabs = {
  seasons: TVSeasonItem[]
  seasonSelected: TVSeasonItem
  onSeasonSelect: (season: TVSeasonItem) => void
}

function Tabs({ seasons, seasonSelected, onSeasonSelect }: PropsTVSeasonTabs) {
  return (
    <div className={styles.tabs}>
      {seasons.map((season) => (
        <Button
          key={`tab-season-${season.id}`}
          variant="outlined"
          onClick={() => onSeasonSelect(season)}
          active={seasonSelected.id === season.id}
          pill
        >
          {season.name}
        </Button>
      ))}
    </div>
  )
}

function Header({ title }: Pick<Props, 'title'>) {
  return (
    <div className={styles.header}>
      <Heading title={title} level={2}></Heading>
    </div>
  )
}
