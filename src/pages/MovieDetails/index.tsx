import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { MovieListsContext } from '../../context/MovieListsContext'
import { ShowCarousel } from '../../components/ShowCarousel'
import { ShowDetails } from 'src/components/ShowDetails'
import { NotFound } from '../404'
import { useHelpers } from 'src/hooks/useHelpers'
import { MovieDetailsContext } from 'src/context/MovieDetailsContext'

export function MovieDetails(): JSX.Element {
  const { getCreditsDirector } = useHelpers()
  const { movieId } = useParams()

  const {
    movie,
    credits,
    videos,
    states,
    isLoading,
    hasErrors,
    fetchMovie,
    fetchCredits,
    fetchVideos,
    fetchStates,
  } = useContext(MovieDetailsContext)

  const {
    similar,
    recommended,
    trending,
    fetchTrending,
    fetchRecommended,
    fetchSimilar,
  } = useContext(MovieListsContext)

  useEffect(() => {
    const id = Number(movieId)

    fetchMovie(id)
    fetchVideos(id)
    fetchStates(id)
    fetchCredits(id)

    fetchSimilar(id)
    fetchRecommended(id)
    fetchTrending()
  }, [movieId])

  if (!movie || hasErrors.fetchMovie) {
    return <NotFound data-testid="show-not-found" />
  }

  const { cast = [], crew = [] } = credits
  const director = getCreditsDirector(crew)
  const people = director ? [director, ...cast] : cast

  return (
    <Page darkHeader>
      <ShowDetails
        show={movie}
        people={people}
        videos={videos}
        states={states}
        isLoadingShow={isLoading.fetchMovie}
        isLoadingPeople={isLoading.fetchCredits}
        isLoadingActions={isLoading.fetchStates}
        data-testid="show-details"
      />
      <ShowCarousel
        shows={similar.data}
        title="More movies like this"
        isLoading={similar.isLoading}
        data-testid="carousel-similar"
      />
      <ShowCarousel
        shows={recommended.data}
        title="Recommended movies based on this title"
        isLoading={recommended.isLoading}
        data-testid="carousel-recommended"
      />
      <ShowCarousel
        shows={trending.data}
        title="Popular movies"
        isLoading={trending.isLoading}
        data-testid="carousel-trending"
      />
    </Page>
  )
}
