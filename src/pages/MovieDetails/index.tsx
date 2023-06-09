import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { MovieListsContext } from '../../context/MovieListsContext'
import { ShowCarousel } from '../../components/ShowCarousel'
import { MovieDetailsContext } from '../../context/MovieDetailsContext'
import { ShowDetails } from 'src/components/ShowDetails'
import { NotFound } from '../404'
import { useHelpers } from 'src/hooks/useHelpers'

export function MovieDetails(): JSX.Element {
  const { getCreditsDirector } = useHelpers()
  const { movieId } = useParams()

  const {
    movie,
    cast,
    crew,
    videos,
    isLoadingCredits,
    isLoadingMovie,
    isLoadingVideos,
    hasMovieErrors,
    fetchMovie,
    fetchCredits,
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

  useEffect(() => {
    const id = Number(movieId)

    fetchMovie(id)
    fetchCredits(id)
    fetchVideos(id)
    fetchSimilar(id)
    fetchRecommended(id)
    fetchTrending()
  }, [movieId])

  if (!movie || hasMovieErrors) {
    return <NotFound data-testid="show-not-found" />
  }

  const director = getCreditsDirector(crew)
  const people = director ? [director, ...cast] : cast

  return (
    <Page darkBackground>
      <ShowDetails
        show={movie}
        people={people}
        videos={videos}
        isLoadingShow={isLoadingMovie}
        isLoadingPeople={isLoadingCredits}
        isLoadingVideos={isLoadingVideos}
        data-testid="show-details"
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
