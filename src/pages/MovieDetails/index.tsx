import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { MovieListsContext } from '../../context/MovieListsContext'
import { ShowCarousel } from '../../components/ShowCarousel'
import { ShowDetails } from 'src/components/ShowDetails'
import { NotFound } from '../404'
import { useHelpers } from 'src/hooks/useHelpers'
import { ShowDetailsContext } from 'src/context/ShowDetailsContext'

export function MovieDetails(): JSX.Element {
  const { getCreditsDirector } = useHelpers()
  const { movieId } = useParams()

  const {
    show,
    credits,
    videos,
    states,
    isLoading,
    hasErrors,
    fetchShow,
    fetchCredits,
    fetchVideos,
    fetchStates,
  } = useContext(ShowDetailsContext)

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

    fetchShow(id, 'movie')
    fetchCredits(id, 'movie')
    fetchVideos(id, 'movie')
    fetchStates(id, 'movie')

    fetchSimilar(id)
    fetchRecommended(id)
    fetchTrending()
  }, [movieId])

  if (!show || hasErrors.fetchShow) {
    return <NotFound data-testid="show-not-found" />
  }

  const { cast = [], crew = [] } = credits
  const director = getCreditsDirector(crew)
  const people = director ? [director, ...cast] : cast

  return (
    <Page darkHeader>
      <ShowDetails
        show={show}
        people={people}
        videos={videos}
        states={states}
        isLoadingShow={isLoading.fetchShow}
        isLoadingPeople={isLoading.fetchCredits}
        isLoadingActions={isLoading.fetchStates}
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
