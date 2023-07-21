import React, { createContext, useContext, type HTMLAttributes } from 'react'
import type {
  Movie,
  PersonCast,
  PersonCrew,
  TVShow,
  Video,
} from '@leandrowkz/tmdb'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Rating } from '../../components/Rating'
import { ShowGenres } from '../../components/ShowGenres'
import { PeopleList } from '../../components/PeopleList'
import { ShowCountries } from '../../components/ShowCountries'
import { ShowPoster } from '../../components/ShowPoster'
import { Motion } from '../../components/Motion'
import {
  LoaderActions,
  LoaderCast,
  LoaderDetails,
  LoaderPoster,
} from './loader'
import styles from './styles.module.css'
import { useHelpers } from 'src/hooks/useHelpers'
import type { UserShowStates } from 'src/types'
import { FavoriteButton } from '../FavoriteButton'
import { WatchlistButton } from '../WatchlistButton'
import { WatchedButton } from '../WatchedButton'
import { ShowTrailerButton } from '../ShowTrailerButton'
import { useScreenSize } from 'src/hooks/useScreenSize'

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: Movie | TVShow
  people: (PersonCast | PersonCrew)[]
  videos: Video[]
  states: UserShowStates
  isLoadingShow: boolean
  isLoadingPeople: boolean
  isLoadingActions: boolean
}

const state: Props = {
  show: {} as Movie | TVShow,
  videos: [],
  people: [],
  states: {} as UserShowStates,
  isLoadingShow: false,
  isLoadingActions: false,
  isLoadingPeople: false,
}

const ShowDetailsContext = createContext(state)

export function ShowDetails({
  show,
  people,
  videos,
  states,
  isLoadingShow,
  isLoadingPeople,
  isLoadingActions,
  ...props
}: Props): JSX.Element {
  if (!show) {
    return <></>
  }

  const state = {
    show,
    people,
    videos,
    states,
    isLoadingActions,
    isLoadingPeople,
    isLoadingShow,
  }

  const { getShowTitle, getShowImageUrl } = useHelpers()
  const backdrop = getShowImageUrl(show.backdrop_path || '', 500)

  return (
    <ShowDetailsContext.Provider value={state}>
      <section className={styles.container} {...props}>
        <div
          className={styles.backdrop}
          style={{ backgroundImage: `url(${backdrop})` }}
          title={getShowTitle(show)}
        />
        <Details />
        <Cast />
        <Poster />
        <Actions />
      </section>
    </ShowDetailsContext.Provider>
  )
}

function Details(): JSX.Element {
  const { show, isLoadingShow } = useContext(ShowDetailsContext)

  if (isLoadingShow) {
    return <LoaderDetails />
  }

  const { getShowTitle, getShowReleaseYear, getShowRuntimeOrSeasons } =
    useHelpers()
  const { overview, vote_average: rating } = show

  return (
    <Motion tag="section" className={styles.details}>
      <Heading
        level={1}
        title={getShowTitle(show)}
        className={styles.title}
        data-testid="show-title"
      />
      <div className={styles.metadata}>
        <Rating
          score={rating}
          size="small"
          className={styles.rating}
          data-testid="show-rating"
        />
        <Text isMuted size="small" data-testid="show-year">
          {getShowReleaseYear(show)}
        </Text>
        <Text isMuted size="small" data-testid="show-runtime-seasons">
          {getShowRuntimeOrSeasons(show)}
        </Text>
        <ShowCountries show={show} data-testid="show-countries" />
        <ShowGenres
          show={show}
          separator=", "
          size="small"
          limit={5}
          data-testid="show-genres"
        />
      </div>
      <Text isMuted className={styles.overview} data-testid="show-overview">
        {overview}
      </Text>
    </Motion>
  )
}

function Cast(): JSX.Element {
  const { people, isLoadingPeople } = useContext(ShowDetailsContext)

  if (isLoadingPeople) {
    return <LoaderCast />
  }

  return (
    <PeopleList
      people={people}
      title="Actors"
      className={styles.cast}
      data-testid="show-cast"
    />
  )
}

function Actions(): JSX.Element {
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')
  const isSmallDevice = isMobile || isTablet
  const { show, states, videos, isLoadingActions } =
    useContext(ShowDetailsContext)

  if (isLoadingActions) {
    return <LoaderActions />
  }

  return (
    <Motion className={styles.actions}>
      <div className={styles.leftActions}>
        <WatchlistButton show={show} states={states} size="large" />
        {!isSmallDevice && (
          <WatchedButton show={show} states={states} size="large" />
        )}
      </div>
      <div className={styles.rightActions}>
        <FavoriteButton show={show} states={states} size="medium" rounded />
        {isSmallDevice && (
          <WatchedButton
            show={show}
            states={states}
            size="medium"
            rounded
            isSmallDevice
          />
        )}
        <ShowTrailerButton videos={videos} pill size="medium" />
      </div>
    </Motion>
  )
}

function Poster(): JSX.Element {
  const { show, isLoadingShow } = useContext(ShowDetailsContext)
  if (isLoadingShow) {
    return <LoaderPoster />
  }

  return (
    <Motion className={styles.poster}>
      <ShowPoster
        show={show}
        data-testid="show-poster"
        className={styles.posterImage}
      />
    </Motion>
  )
}
