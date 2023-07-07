import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { TVShowListsContext } from '../../context/TVShowListsContext'
import { ShowCarousel } from '../../components/ShowCarousel'
import { TVShowDetailsContext } from '../../context/TVShowDetailsContext'
import { NotFound } from '../404'
import { ShowDetails } from 'src/components/ShowDetails'
import { useHelpers } from 'src/hooks/useHelpers'
import { TVSeasonsTabs } from 'src/components/TVSeasonsTabs'

export function TVShowDetails(): JSX.Element {
  const { getCreditsProducer } = useHelpers()
  const { tvShowId } = useParams()

  const {
    tvShow,
    cast,
    crew,
    videos,
    states,
    isLoadingCredits,
    isLoadingTVShow,
    isLoadingStates,
    hasTVShowErrors,
    fetchTVShow,
    fetchCredits,
    fetchVideos,
    fetchStates,
  } = useContext(TVShowDetailsContext)

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

    fetchTVShow(id)
    fetchCredits(id)
    fetchVideos(id)
    fetchStates(id)
    fetchSimilar(id)
    fetchRecommended(id)
    fetchPopular()
  }, [tvShowId])

  if (!tvShow || hasTVShowErrors) {
    return <NotFound data-testid="show-not-found" />
  }

  const director = getCreditsProducer(crew)
  const people = director ? [director, ...cast] : cast

  return (
    <Page darkHeader>
      <ShowDetails
        type="tv"
        show={tvShow}
        people={people}
        videos={videos}
        states={states}
        isLoadingShow={isLoadingTVShow}
        isLoadingPeople={isLoadingCredits}
        isLoadingActions={isLoadingStates}
        data-testid="show-details"
      />
      <TVSeasonsTabs
        title="All seasons"
        show={tvShow}
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
