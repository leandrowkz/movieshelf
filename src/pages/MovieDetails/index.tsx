import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from 'src/components/Header'
import { Page } from 'src/components/Page'
import { ShowBackdrop } from 'src/components/ShowBackdrop'
import { MovieContext } from 'src/store/MovieContext'
import styles from './styles.module.css'
import { Heading } from 'src/components/Heading'
import { Text } from 'src/components/Text'
import { Rating } from 'src/components/Rating'

export function MovieDetails (): JSX.Element {
  const {
    movieDetails,
    fetchMovieDetails,
  } = useContext(MovieContext)
  const { movieId } = useParams()

  useEffect(() => {
    fetchMovieDetails(Number(movieId))
  }, [movieId, fetchMovieDetails])

  return (
    <Page>
      <Header />
      {movieDetails && (
        <section className={styles.section}>
          <div>
            {movieDetails && <ShowBackdrop show={movieDetails} />}
          </div>
          <section className={styles.movieInfo}>
            <Heading level={1} title={movieDetails.title} />
            <Text isParagraph>{movieDetails.overview}</Text>
            <Rating score={movieDetails.vote_average} size="large" />
          </section>
        </section>
      )}
    </Page>
  )
}
