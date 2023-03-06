import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from 'src/components/Header'
import { Page } from 'src/components/Page'
import { ShowBackdrop } from 'src/components/ShowBackdrop'
import { MovieContext } from 'src/store/MovieContext'

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
      {movieDetails && <ShowBackdrop show={movieDetails} />}
      {movieDetails && JSON.stringify(movieDetails)}
    </Page>
  )
}
