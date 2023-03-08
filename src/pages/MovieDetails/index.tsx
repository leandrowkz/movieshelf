import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from 'src/components/Header'
import { Page } from 'src/components/Page'
import { MovieContext } from 'src/store/MovieContext'
import { Heading } from 'src/components/Heading'
import { Text } from 'src/components/Text'
import { Rating } from 'src/components/Rating'
import { MovieHelper } from 'src/services/MovieHelper'
import styles from './styles.module.css'
import { ShowGenres } from 'src/components/ShowGenres'
import { Button } from 'src/components/Button'
import { BulletSeparator } from 'src/components/BulletSeparator'
import { Image } from 'src/components/Image'

export function MovieDetails(): JSX.Element {
  const { movieDetails, fetchMovieDetails } = useContext(MovieContext)
  const { movieId } = useParams()

  useEffect(() => {
    fetchMovieDetails(Number(movieId))
  }, [movieId, fetchMovieDetails])

  if (!movieDetails) {
    return <></>
  }

  const img = MovieHelper.getImageUrl(movieDetails.backdrop_path, 500)
  const trailer = MovieHelper.getTrailerUrl(movieDetails)
  const year = MovieHelper.getReleaseYear(movieDetails)
  const { title, overview, runtime, vote_average: rating } = movieDetails

  return (
    <Page>
      <Header />
      <section className={styles.details}>
        <div className={styles.backdrop}>
          <Image src={img} alt={title} />
        </div>
        <div className={styles.movieInfo}>
          <Heading level={1} title={title} />
          <div className={styles.metadata}>
            <Rating score={rating} size="small" className={styles.rating} />
            <Text isMuted size="small">
              {runtime} minutes
            </Text>
            <BulletSeparator />
            <ShowGenres show={movieDetails} separator=", " size="small" />
            <BulletSeparator />
            <Text isMuted size="small">
              {year}
            </Text>
          </div>
          <Text isParagraph isMuted>
            {overview}
          </Text>
          <Link to={trailer} target="_blank">
            <Button size="large">▶ Play trailer</Button>
          </Link>
        </div>
      </section>
    </Page>
  )
}
