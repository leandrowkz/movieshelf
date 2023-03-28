import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Page } from 'src/components/Page'
import { MovieListsContext } from 'src/store/MovieListsContext'
import { Heading } from 'src/components/Heading'
import { Text } from 'src/components/Text'
import { Rating } from 'src/components/Rating'
import { MovieHelper } from 'src/services/MovieHelper'
import styles from './styles.module.css'
import { ShowGenres } from 'src/components/ShowGenres'
import { Button } from 'src/components/Button'
import { BulletSeparator } from 'src/components/BulletSeparator'
import { ShowCarousel } from 'src/components/ShowCarousel'
import { PeopleList } from 'src/components/PeopleList'
import { ShowCountries } from 'src/components/ShowCountries'
import { Container } from 'src/components/Container'
import { ShowPoster } from 'src/components/ShowPoster'
import { MovieDetailsContext } from 'src/store/MovieDetailsContext'
import { Motion } from 'src/components/Motion'
import { Person } from 'src/types/Person'
import {
  LoaderActions,
  LoaderCast,
  LoaderDetails,
  LoaderPoster,
} from './loader'
import { Movie } from 'src/types/Movie'
import { MovieVideo } from 'src/types/MovieVideo'

type DetailsProps = {
  movie: Movie
  isLoading?: boolean
}

type CastProps = {
  cast: Person[]
  isLoading?: boolean
}

type ActionProps = {
  movie?: Movie
  videos: MovieVideo[]
  isLoading?: boolean
}

type PosterProps = {
  movie: Movie
  isLoading?: boolean
}

export function MovieDetails(): JSX.Element {
  const {
    movie,
    cast,
    videos,
    isLoadingCast,
    isLoadingMovie,
    isLoadingVideos,
    fetchMovie,
    fetchCast,
    fetchVideos,
  } = useContext(MovieDetailsContext)

  const {
    similar,
    recommended,
    trending,
    isLoadingTrending,
    isLoadingRecommended,
    isLoadingSimilar,
    fetchTrending,
    fetchRecommended,
    fetchSimilar,
  } = useContext(MovieListsContext)

  const { movieId } = useParams()

  useEffect(() => {
    const id = Number(movieId)

    fetchMovie(id)
    fetchCast(id)
    fetchVideos(id)
    fetchSimilar(id)
    fetchRecommended(id)
    fetchTrending()
  }, [movieId])

  if (!movie) {
    return <></>
  }

  const backdrop = MovieHelper.getImageUrl(movie.backdrop_path, 500)

  return (
    <Page>
      <Container>
        <section className={styles.details}>
          <div
            className={styles.backdrop}
            style={{ backgroundImage: `url(${backdrop})` }}
            title={movie.title}
          />
          <div className={styles.movieInfo}>
            <Details movie={movie} isLoading={isLoadingMovie} />
            <Cast cast={cast} isLoading={isLoadingCast} />
            <Actions videos={videos} isLoading={isLoadingVideos} />
          </div>
          <div className={styles.poster}>
            <Poster movie={movie} isLoading={isLoadingMovie} />
          </div>
        </section>
      </Container>
      <ShowCarousel
        shows={similar}
        title="More like this"
        isLoading={isLoadingSimilar}
      />
      <ShowCarousel
        shows={recommended}
        title="Recommended based on this title"
        isLoading={isLoadingRecommended}
      />
      <ShowCarousel
        shows={trending}
        title="Popular movies"
        isLoading={isLoadingTrending}
      />
    </Page>
  )
}

function Details({ movie, isLoading = false }: DetailsProps): JSX.Element {
  if (isLoading) {
    return <LoaderDetails />
  }

  const { title, overview, runtime, vote_average: rating } = movie
  const year = MovieHelper.getReleaseYear(movie)

  return (
    <Motion tag="section" className={styles.content}>
      <Heading level={1} title={title} className={styles.title} />
      <div className={styles.metadata}>
        <Rating score={rating} size="small" className={styles.rating} />
        <Text isMuted size="small">
          {runtime} minutes
        </Text>
        <BulletSeparator />
        <ShowGenres show={movie} separator=", " size="small" limit={5} />
        <BulletSeparator />
        <Text isMuted size="small">
          {year}
        </Text>
        <BulletSeparator />
        <ShowCountries show={movie} size="small" />
      </div>
      <Text isParagraph isMuted className={styles.overview}>
        {overview}
      </Text>
    </Motion>
  )
}

function Cast({ cast, isLoading = false }: CastProps): JSX.Element {
  if (isLoading) {
    return <LoaderCast />
  }

  return <PeopleList people={cast} title="Actors" className={styles.cast} />
}

function Actions({ videos, isLoading = false }: ActionProps): JSX.Element {
  if (isLoading) {
    return <LoaderActions />
  }

  const trailer = MovieHelper.getFirstTrailerUrl(videos)

  return (
    <Motion className={styles.buttons}>
      <Link to={trailer} target="_blank">
        <Button size="large">▶ Play trailer</Button>
      </Link>
    </Motion>
  )
}

function Poster({ movie, isLoading = false }: PosterProps): JSX.Element {
  if (isLoading) {
    return <LoaderPoster />
  }

  return (
    <Motion>
      <ShowPoster show={movie} />
    </Motion>
  )
}
