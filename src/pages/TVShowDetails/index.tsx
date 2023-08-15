import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { CountryCode } from '@leandrowkz/tmdb'
import { Page } from '../../components/Page'
import { ShowCarousel } from '../../components/ShowCarousel'
import { NotFound } from '../404'
import { ShowDetails } from 'src/components/ShowDetails'
import { useHelpers } from 'src/hooks/useHelpers'
import { TVSeasonsTabs } from 'src/components/TVSeasonsTabs'
import { TVShowDetailsContext } from 'src/context/TVShowDetailsContext'
import { TVShowListsContext } from 'src/context/TVShowListsContext'
import { ShowProviders } from 'src/components/ShowProviders'

export function TVShowDetails(): JSX.Element {
  const { getCreditsProducer, getUserGeolocationCountry } = useHelpers()
  const { tvShowId } = useParams()
  const storageCountry = localStorage.getItem(
    'WATCH_PROVIDER_COUNTRY'
  ) as CountryCode
  const [country, setCountry] = useState<CountryCode>('US')

  const {
    tvShow,
    credits,
    videos,
    states,
    providers,
    isLoading,
    hasErrors,
    fetchTVShow,
    fetchCredits,
    fetchVideos,
    fetchStates,
    fetchProviders,
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

    if (storageCountry) {
      handleCountryChange(storageCountry)
    } else {
      getUserGeolocationCountry(
        (country) => {
          handleCountryChange(country)
        },
        () => {
          handleCountryChange(country)
        }
      )
    }
  }, [tvShowId])

  if (!tvShow || hasErrors.fetchTVShow) {
    return <NotFound data-testid="show-not-found" />
  }

  const { cast = [], crew = [] } = credits
  const director = getCreditsProducer(crew)
  const people = director ? [director, ...cast] : cast

  const handleCountryChange = (country: CountryCode) => {
    setCountry(country)
    fetchProviders(Number(tvShowId), country)
  }

  return (
    <Page darkHeader>
      <ShowDetails
        show={tvShow}
        people={people}
        videos={videos}
        states={states}
        isLoadingShow={isLoading.fetchTVShow}
        isLoadingPeople={isLoading.fetchCredits}
        isLoadingActions={isLoading.fetchStates}
        data-testid="show-details"
      />
      <ShowProviders
        country={country}
        providers={providers}
        isLoading={isLoading.fetchProviders}
        onCountryChange={(code) => handleCountryChange(code)}
        data-testid="show-providers"
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
