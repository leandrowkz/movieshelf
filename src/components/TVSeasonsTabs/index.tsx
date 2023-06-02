import React, { HTMLAttributes, useContext, useEffect, useState } from 'react'
import type { TVSeasonItem, TVShow } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import classNames from 'classnames'
import { Button } from '../Button'
import { TVSeasonDetails } from '../TVSeasonDetails'
import { TVSeasonDetailsContext } from 'src/context/TVSeasonDetailsContext'
import { useHelpers } from 'src/hooks/useHelpers'
import { Text } from '../Text'

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: TVShow
  title: string
  isLoading?: boolean
}

export function TVSeasonsTabs({
  show,
  title,
  className,
  isLoading = false,
  ...props
}: Props) {
  const {
    season: seasonDetails,
    isLoadingSeason,
    fetchSeasonDetails,
  } = useContext(TVSeasonDetailsContext)

  const [seasonSelected, setSeasonSelected] = useState<TVSeasonItem>(
    {} as TVSeasonItem
  )

  const hasSeasons = show && show.seasons && show.seasons.length > 0

  const selectSeason = (season: TVSeasonItem) => {
    setSeasonSelected(season)
    fetchSeasonDetails(show.id, season.season_number)
  }

  useEffect(() => {
    if (hasSeasons) {
      selectSeason(show.seasons[0])
    }
  }, [show.seasons])

  if (!hasSeasons && !isLoading) {
    return <></>
  }

  const classes = classNames(styles.tvSeasonsTabs, className)

  return (
    <section className={classes} {...props}>
      <Header title={title} />
      <Tabs
        seasons={show.seasons}
        seasonSelected={seasonSelected}
        onSeasonSelect={(season) => selectSeason(season)}
      />
      <TVSeasonDetails season={seasonDetails} isLoading={isLoadingSeason} />
    </section>
  )
}

type PropsTVSeasonTabs = {
  seasons: TVSeasonItem[]
  seasonSelected: TVSeasonItem
  onSeasonSelect: (season: TVSeasonItem) => void
}

function Tabs({ seasons, seasonSelected, onSeasonSelect }: PropsTVSeasonTabs) {
  const { getYearFromDateString } = useHelpers()

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
          <div className={styles.button}>
            <span>{season.name}</span>
            <Text
              size="small"
              isMuted
              className={seasonSelected.id === season.id ? styles.active : ''}
            >
              {getYearFromDateString(season.air_date)}
            </Text>
          </div>
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
