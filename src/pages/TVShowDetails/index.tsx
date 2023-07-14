import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { TVShow } from '@leandrowkz/tmdb'
import { Page } from '../../components/Page'
import { TVShowListsContext } from '../../context/TVShowListsContext'
import { ShowCarousel } from '../../components/ShowCarousel'
import { NotFound } from '../404'
import { ShowDetails } from 'src/components/ShowDetails'
import { useHelpers } from 'src/hooks/useHelpers'
import { TVSeasonsTabs } from 'src/components/TVSeasonsTabs'
import { ShowDetailsContext } from 'src/context/ShowDetailsContext'

export function TVShowDetails(): JSX.Element {
  const { getCreditsProducer } = useHelpers()
  const { tvShowId } = useParams()

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
    popular,
    isLoadingRecommended,
    isLoadingSimilar,
    isLoadingPopular,
    fetchRecommended,
    fetchSimilar,
    fetchPopular,
  } = useContext(TVShowListsContext)

  useEffect(() => {
    const id = Number(tvShowId)

    fetchShow(id, 'tv')
    fetchCredits(id, 'tv')
    fetchVideos(id, 'tv')
    fetchStates(id, 'tv')
    fetchSimilar(id)
    fetchRecommended(id)
    fetchPopular()
  }, [tvShowId])

  if (!show || hasErrors.fetchShow) {
    return <NotFound data-testid="show-not-found" />
  }

  const { cast = [], crew = [] } = credits
  const director = getCreditsProducer(crew)
  const people = director ? [director, ...cast] : cast

  return (
    <Page darkHeader>
      <ShowDetails
        type="tv"
        show={show}
        people={people}
        videos={videos}
        states={states}
        isLoadingShow={isLoading.fetchShow}
        isLoadingPeople={isLoading.fetchCredits}
        isLoadingActions={isLoading.fetchStates}
        data-testid="show-details"
      />
      <TVSeasonsTabs
        title="All seasons"
        show={show as TVShow}
        data-testid="show-seasons"
      />
      <ShowCarousel
        shows={similar}
        type="tv"
        title="More TV shows like this"
        isLoading={isLoadingSimilar}
        data-testid="carousel-similar"
      />
      <ShowCarousel
        shows={recommended}
        type="tv"
        title="Recommended TV shows based on this title"
        isLoading={isLoadingRecommended}
        data-testid="carousel-recommended"
      />
      <ShowCarousel
        shows={popular}
        type="tv"
        title="Popular TV shows"
        isLoading={isLoadingPopular}
        data-testid="carousel-popular"
      />
    </Page>
  )
}
