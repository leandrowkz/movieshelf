import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { MovieListsContext } from '../../store/MovieListsContext'
import { ShowCarousel } from '../../components/ShowCarousel'
import { MovieDetailsContext } from '../../store/MovieDetailsContext'
import { ShowDetails } from 'src/components/ShowDetails'
import { NotFound } from '../404'

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
    return <NotFound />
  }

  return (
    <Page>
      <ShowDetails
        show={movie}
        cast={cast}
        videos={videos}
        isLoadingCast={isLoadingCast}
        isLoadingShow={isLoadingMovie}
        isLoadingVideos={isLoadingVideos}
      />
      <ShowCarousel
        shows={similar}
        title="More movies like this"
        isLoading={isLoadingSimilar}
        data-testid="carousel-similar"
      />
      <ShowCarousel
        shows={recommended}
        title="Recommended movies based on this title"
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
