import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '../../components/Page'
import { TVShowListsContext } from '../../store/TVShowListsContext'
import { ShowCarousel } from '../../components/ShowCarousel'
import { TVShowDetailsContext } from '../../store/TVShowDetailsContext'
import { NotFound } from '../404'
import { ShowDetails } from 'src/components/ShowDetails'
import { Container } from 'src/components/Container'

export function TVShowDetails(): JSX.Element {
  const {
    tvShow,
    cast,
    videos,
    isLoadingCast,
    isLoadingTVShow,
    isLoadingVideos,
    fetchTVShow,
    fetchCast,
    fetchVideos,
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

  const { tvShowId } = useParams()

  useEffect(() => {
    const id = Number(tvShowId)

    fetchTVShow(id)
    fetchCast(id)
    fetchVideos(id)
    fetchSimilar(id)
    fetchRecommended(id)
    fetchPopular()
  }, [tvShowId])

  if (!tvShow) {
    return <NotFound />
  }

  return (
    <Page>
      <ShowDetails
        show={tvShow}
        cast={cast}
        videos={videos}
        isLoadingCast={isLoadingCast}
        isLoadingShow={isLoadingTVShow}
        isLoadingVideos={isLoadingVideos}
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
