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

  return (
    <Page>
      <Container>
        <section className={styles.details}>
          <div className={styles.backdrop}>
            <Image src={backdrop} alt={title} />
          </div>
          <div className={styles.movieInfo}>
            <Heading level={1} title={title} />
            <div className={styles.metadata}>
              <Rating score={rating} size="small" className={styles.rating} />
              <Text isMuted size="small">
                {runtime} minutes
              </Text>
              <BulletSeparator />
              <ShowGenres show={movie} separator=", " size="small" />
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
            <PeopleList people={cast} title="Actors" className={styles.cast} />
            <div className={styles.buttons}>
              <Link to={trailer} target="_blank">
                <Button size="large">▶ Play trailer</Button>
              </Link>
            </div>
          </div>
          <div className={styles.poster}>
            <ShowPoster show={movie} />
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
