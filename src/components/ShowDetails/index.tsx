import React, { type HTMLAttributes } from 'react'
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

type DetailsProps = {
  show: Movie | TVShow
  isLoading?: boolean
}

type CastProps = {
  people: (PersonCast | PersonCrew)[]
  isLoading?: boolean
}

type ActionProps = {
  show: Movie | TVShow
  states: UserShowStates
  isLoading?: boolean
}

type PosterProps = {
  show: Movie | TVShow
  states: UserShowStates
  videos: Video[]
  isLoading?: boolean
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: Movie | TVShow
  people: (PersonCast | PersonCrew)[]
  videos: Video[]
  states: UserShowStates
  isLoadingShow: boolean
  isLoadingPeople: boolean
  isLoadingActions: boolean
}

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
  const { getShowTitle, getShowImageUrl } = useHelpers()
  const backdrop = getShowImageUrl(show.backdrop_path || '', 500)

  return (
    <section className={styles.details} {...props}>
      <div
        className={styles.backdrop}
        style={{ backgroundImage: `url(${backdrop})` }}
        title={getShowTitle(show)}
      />
      <div className={styles.showInfo}>
        <Details show={show} isLoading={isLoadingShow} />
        <Cast people={people} isLoading={isLoadingPeople} />
        <Actions show={show} states={states} isLoading={isLoadingActions} />
      </div>
      <Poster
        show={show}
        videos={videos}
        states={states}
        isLoading={isLoadingShow}
      />
    </section>
  )
}

function Details({ show, isLoading = false }: DetailsProps): JSX.Element {
  if (isLoading) {
    return <LoaderDetails />
  }

  const { getShowTitle, getShowReleaseYear, getShowRuntimeOrSeasons } =
    useHelpers()
  const { overview, vote_average: rating } = show

  return (
    <Motion tag="section" className={styles.content}>
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
      <Text
        isParagraph
        isMuted
        className={styles.overview}
        data-testid="show-overview"
      >
        {overview}
      </Text>
    </Motion>
  )
}

function Cast({ people, isLoading = false }: CastProps): JSX.Element {
  if (isLoading) {
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

function Actions({
  show,
  states,
  isLoading = false,
}: ActionProps): JSX.Element {
  if (isLoading) {
    return <LoaderActions />
  }

  return (
    <Motion className={styles.buttons}>
      <WatchlistButton show={show} states={states} />
      <WatchedButton show={show} states={states} />
    </Motion>
  )
}

function Poster({
  show,
  states,
  videos,
  isLoading = false,
}: PosterProps): JSX.Element {
  if (isLoading) {
    return <LoaderPoster />
  }

  return (
    <Motion className={styles.poster}>
      <ShowPoster
        show={show}
        data-testid="show-poster"
        className={styles.posterImage}
      />
      <div className={styles.posterActions}>
        <FavoriteButton show={show} states={states} size="medium" rounded />
        <ShowTrailerButton videos={videos} pill size="medium" />
      </div>
    </Motion>
  )
}
