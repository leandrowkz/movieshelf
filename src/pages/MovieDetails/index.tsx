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
import { Image } from 'src/components/Image'
import { ShowCarousel } from 'src/components/ShowCarousel'
import { PeopleList } from 'src/components/PeopleList'
import { ShowCountries } from 'src/components/ShowCountries'
import { Container } from 'src/components/Container'
import { ShowPoster } from 'src/components/ShowPoster'
import { MovieDetailsContext } from 'src/store/MovieDetailsContext'
import { LoaderShowCast } from 'src/components/LoaderShowCast'
import { LoaderShowDetails } from 'src/components/LoaderShowDetails'
import { LoaderShowActions } from 'src/components/LoaderShowActions'
import { LoaderShowPoster } from 'src/components/LoaderShowPoster'

export function MovieDetails(): JSX.Element {
  const {
    movie,
    cast,
    videos,
    isLoadingCast,
    isLoadingMovie,
    isLoadingVideos,
    hasMovieErrors,
    fetchMovie,
    fetchCast,
    fetchVideos,
  } = useContext(MovieDetailsContext)

  const {
    similar,
    recommended,
    trending,
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

  const year = MovieHelper.getReleaseYear(movie)
  const backdrop = MovieHelper.getImageUrl(movie.backdrop_path, 500)
  const trailer = MovieHelper.getFirstTrailerUrl(videos)

  const { title, overview, runtime, vote_average: rating } = movie

  const componentMovieContent = (
    <section className={styles.content}>
      <Heading level={1} title={title} />
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
    </section>
  )

  const componentCast = (
    <PeopleList people={cast} title="Actors" className={styles.cast} />
  )

  const componentActions = (
    <div className={styles.buttons}>
      <Link to={trailer} target="_blank">
        <Button size="large">▶ Play trailer</Button>
      </Link>
    </div>
  )

  return (
    <Page>
      <Container>
        <section className={styles.details}>
          <div className={styles.backdrop}>
            {movie.backdrop_path && <Image src={backdrop} alt={title} />}
          </div>
          <div className={styles.movieInfo}>
            {isLoadingMovie ? <LoaderShowDetails /> : componentMovieContent}
            {isLoadingCast ? <LoaderShowCast /> : componentCast}
            {isLoadingVideos ? <LoaderShowActions /> : componentActions}
          </div>
          <div className={styles.poster}>
            {isLoadingMovie ? (
              <LoaderShowPoster />
            ) : (
              <ShowPoster show={movie} />
            )}
          </div>
        </section>
      </Container>
      <ShowCarousel shows={similar} title="More like this" />
      <ShowCarousel
        shows={recommended}
        title="Recommended based on this title"
      />
      <ShowCarousel shows={trending} title="Popular movies" />
    </Page>
  )
}
