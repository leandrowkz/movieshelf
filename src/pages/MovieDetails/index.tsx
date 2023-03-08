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
import { ShowCarousel } from 'src/components/ShowCarousel'
import { ShowCast } from 'src/components/ShowCast'

export function MovieDetails(): JSX.Element {
  const {
    movieDetails,
    similar,
    trending,
    fetchTrending,
    fetchMovieDetails,
    fetchSimilar,
  } = useContext(MovieContext)
  const { movieId } = useParams()

  useEffect(() => {
    const id = Number(movieId)
    fetchMovieDetails(id)
    fetchSimilar(id)
    fetchTrending()
  }, [movieId])

  if (!movieDetails) {
    return <></>
  }

  const backdrop = MovieHelper.getImageUrl(movieDetails.backdrop_path, 500)
  const trailer = MovieHelper.getTrailerUrl(movieDetails)
  const year = MovieHelper.getReleaseYear(movieDetails)
  const { title, overview, runtime, vote_average: rating } = movieDetails

  return (
    <Page>
      <Header />
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
            <ShowGenres show={movieDetails} separator=", " size="small" />
            <BulletSeparator />
            <Text isMuted size="small">
              {year}
            </Text>
          </div>
          <div className={styles.description}>
            <div className={styles.overview}>
              <Text isParagraph isMuted className={styles.overview}>
                {overview}
              </Text>
              <div className={styles.buttons}>
                <Link to={trailer} target="_blank">
                  <Button size="large">▶ Play trailer</Button>
                </Link>
              </div>
            </div>
            <div className={styles.cast}>
              <ShowCast show={movieDetails} title="Actors" />
            </div>
          </div>
        </div>
      </section>
      <ShowCarousel shows={similar} title="More like this" />
      <ShowCarousel shows={trending} title="Popular movies" />
    </Page>
  )
}
