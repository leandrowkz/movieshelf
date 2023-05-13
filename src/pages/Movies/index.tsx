import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { MovieListsContext } from '../../store/MovieListsContext'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Rating } from '../../components/Rating'
import { MovieHelper } from '../../services/MovieHelper'
import styles from './styles.module.css'
import { ShowGenres } from '../../components/ShowGenres'
import { Button } from '../../components/Button'
import { BulletSeparator } from '../../components/BulletSeparator'
import { ShowCarousel } from '../../components/ShowCarousel'
import { PeopleList } from '../../components/PeopleList'
import { ShowCountries } from '../../components/ShowCountries'
import { Container } from '../../components/Container'
import { ShowPoster } from '../../components/ShowPoster'
import { MovieDetailsContext } from '../../store/MovieDetailsContext'
import { Motion } from '../../components/Motion'
import { Person } from '../../types/Person'
import {
  LoaderActions,
  LoaderCast,
  LoaderDetails,
  LoaderPoster,
} from './loader'
import { Movie } from '../../types/Movie'
import { MovieVideo } from '../../types/MovieVideo'

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
        data-testid="carousel-similar"
      />
      <ShowCarousel
        shows={recommended}
        title="Recommended based on this title"
        isLoading={isLoadingRecommended}
        data-testid="carousel-recommended"
      />
      <ShowCarousel
        shows={trending}
        title="Popular movies"
        isLoading={isLoadingTrending}
        data-testid="carousel-trending"
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
      <Heading
        level={1}
        title={title}
        className={styles.title}
        data-testid="movie-title"
      />
      <div className={styles.metadata}>
        <Rating
          score={rating}
          size="small"
          className={styles.rating}
          data-testid="movie-rating"
        />
        <Text isMuted size="small" data-testid="movie-runtime">
          {runtime} minutes
        </Text>
        <BulletSeparator />
        <ShowGenres
          show={movie}
          separator=", "
          size="small"
          limit={5}
          data-testid="movie-genres"
        />
        <BulletSeparator />
        <Text isMuted size="small" data-testid="movie-year">
          {year}
        </Text>
        <BulletSeparator />
        <ShowCountries show={movie} data-testid="movie-countries" />
      </div>
      <Text
        isParagraph
        isMuted
        className={styles.overview}
        data-testid="movie-overview"
      >
        {overview}
      </Text>
    </Motion>
  )
}

function Cast({ cast, isLoading = false }: CastProps): JSX.Element {
  if (isLoading) {
    return <LoaderCast />
  }

  return (
    <PeopleList
      people={cast}
      title="Actors"
      className={styles.cast}
      data-testid="movie-cast"
    />
  )
}

function Actions({ videos, isLoading = false }: ActionProps): JSX.Element {
  if (isLoading) {
    return <LoaderActions />
  }

  const trailer = MovieHelper.getFirstTrailerUrl(videos)

  return (
    <Motion className={styles.buttons}>
      <Link to={trailer} target="_blank" data-testid="movie-trailer">
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
      <ShowPoster show={movie} data-testid="movie-poster" />
    </Motion>
  )
}
