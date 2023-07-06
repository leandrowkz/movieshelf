import React, { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import type {
  Movie,
  MovieAccountStates,
  PersonCast,
  PersonCrew,
  TVShow,
  TVShowAccountStates,
  Video,
} from '@leandrowkz/tmdb'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Rating } from '../../components/Rating'
import { ShowGenres } from '../../components/ShowGenres'
import { Button } from '../../components/Button'
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
import { ShowType } from 'src/types/ShowType'
import { FavoriteButton } from '../FavoriteButton'
import { WatchlistButton } from '../WatchlistButton'
import { WatchedButton } from '../WatchedButton'
import { IoPlay } from 'react-icons/io5'

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
  type: ShowType
  videos: Video[]
  accountStates: MovieAccountStates | TVShowAccountStates
  isLoading?: boolean
}

type PosterProps = {
  show: Movie | TVShow
  isLoading?: boolean
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: Movie | TVShow
  type?: ShowType
  people: (PersonCast | PersonCrew)[]
  videos: Video[]
  accountStates: MovieAccountStates | TVShowAccountStates
  isLoadingShow: boolean
  isLoadingPeople: boolean
  isLoadingActions: boolean
}

export function ShowDetails({
  show,
  type = 'movie',
  people,
  videos,
  accountStates,
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
      <div className={styles.movieInfo}>
        <Details show={show} isLoading={isLoadingShow} />
        <Cast people={people} isLoading={isLoadingPeople} />
        <Actions
          show={show}
          type={type}
          videos={videos}
          accountStates={accountStates}
          isLoading={isLoadingActions}
        />
      </div>
      <div className={styles.poster}>
        <Poster show={show} isLoading={isLoadingShow} />
      </div>
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
  type,
  videos,
  accountStates,
  isLoading = false,
}: ActionProps): JSX.Element {
  if (isLoading) {
    return <LoaderActions />
  }

  const { getShowTrailerUrl } = useHelpers()
  const trailer = getShowTrailerUrl(videos)

  return (
    <Motion className={styles.buttons}>
      <FavoriteButton show={show} accountStates={accountStates} type={type} />
      <WatchlistButton show={show} accountStates={accountStates} type={type} />
      <WatchedButton show={show} accountStates={accountStates} type={type} />
      {/* <Button
        size="large"
        icon={<IoPlay />}
        onClick={() => window.open(trailer, '_blank')}
        data-testid="show-trailer"
      >
        Trailer
      </Button> */}
    </Motion>
  )
}

function Poster({ show, isLoading = false }: PosterProps): JSX.Element {
  if (isLoading) {
    return <LoaderPoster />
  }

  return (
    <Motion className={styles.posterImage}>
      <ShowPoster show={show} data-testid="show-poster" />
    </Motion>
  )
}
