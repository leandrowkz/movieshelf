import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from 'src/components/Header'
import { Page } from 'src/components/Page'
import { MovieContext } from 'src/store/MovieContext'
import { Heading } from 'src/components/Heading'
import { Text } from 'src/components/Text'
import { Rating } from 'src/components/Rating'
import { MovieHelper } from 'src/services/MovieHelper'
import styles from './styles.module.css'

export function MovieDetails (): JSX.Element {
  const {
    movieDetails,
    fetchMovieDetails,
  } = useContext(MovieContext)
  const { movieId } = useParams()

  useEffect(() => {
    fetchMovieDetails(Number(movieId))
  }, [movieId, fetchMovieDetails])

  if (!movieDetails) {
    return <></>;
  }

  const img = MovieHelper.getImageUrl(movieDetails.backdrop_path, 500);
  const { title, overview, vote_average: rating } = movieDetails

  const styles = {

  }

  return (
    <Page>
      <section className={styles.movieInfo} style={ { background}}>
        <Header />
        <div className={styles.backdrop}>
          <img src={img} alt={title} />
        </div>
        <Heading level={1} title={title} />
        <Text isParagraph>{overview}</Text>
        <Rating score={rating} size="large" />
      </section>
    </Page>
  )
}
