import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { ShowCarousel } from '../../components/ShowCarousel'
import { NotFound } from '../404'
import { ShowDetails } from 'src/components/ShowDetails'
import { useHelpers } from 'src/hooks/useHelpers'
import { TVSeasonsTabs } from 'src/components/TVSeasonsTabs'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { TVShowListsContext } from 'src/context/TVShowListsContext'

export function TVShowDetails(): JSX.Element {
  const { getCreditsProducer } = useHelpers()
  const { tvShowId } = useParams()

  const {
    tvShow,
    credits,
    videos,
    states,
    isLoading: isLoadingDetails,
    hasErrors,
    fetchTVShow,
    fetchCredits,
    fetchVideos,
    fetchStates,
  } = useContext(TVShowDetailsContext)

  const {
    similar,
    recommended,
    popular,
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

  if (!tvShow || hasErrors.fetchTVShow) {
    return <NotFound data-testid="show-not-found" />
  }

  const { cast = [], crew = [] } = credits
  const director = getCreditsProducer(crew)
  const people = director ? [director, ...cast] : cast

  return (
    <Page darkHeader>
      <ShowDetails
        show={tvShow}
        people={people}
        videos={videos}
        states={states}
        isLoadingShow={isLoadingDetails.fetchTVShow}
        isLoadingPeople={isLoadingDetails.fetchCredits}
        isLoadingActions={isLoadingDetails.fetchStates}
        data-testid="show-details"
      />
      <TVSeasonsTabs
        title="All seasons"
        show={tvShow}
        data-testid="show-seasons"
      />
      <ShowCarousel
        shows={similar.data}
        title="More TV shows like this"
        isLoading={similar.isLoading}
        data-testid="carousel-similar"
      />
      <ShowCarousel
        shows={recommended.data}
        title="Recommended TV shows based on this title"
        isLoading={recommended.isLoading}
        data-testid="carousel-recommended"
      />
      <ShowCarousel
        shows={popular.data}
        title="Popular TV shows"
        isLoading={popular.isLoading}
        data-testid="carousel-popular"
      />
    </Page>
  )
}
