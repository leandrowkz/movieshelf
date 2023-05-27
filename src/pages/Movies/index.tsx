import React, { useContext, useEffect, useState } from 'react'
import { Page } from '../../components/Page'
import { MovieListsContext } from '../../context/MovieListsContext'
import { ShowCarousel } from '../../components/ShowCarousel'
import { MovieFilters } from '../../components/MovieFilters'
import { GenreCode } from '@leandrowkz/tmdb'

export function Movies(): JSX.Element {
  const [genreCodes, setGenreCodes] = useState<(number | null)[]>([null])
  const {
    action,
    adventure,
    animation,
    comedy,
    crime,
    documentary,
    drama,
    fantasy,
    family,
    history,
    horror,
    mistery,
    music,
    romance,
    scienceFiction,
    thriller,
    war,
    western,
    isLoadingAction,
    isLoadingAdventure,
    isLoadingAnimation,
    isLoadingComedy,
    isLoadingCrime,
    isLoadingDocumentary,
    isLoadingDrama,
    isLoadingFantasy,
    isLoadingFamily,
    isLoadingHistory,
    isLoadingHorror,
    isLoadingMistery,
    isLoadingMusic,
    isLoadingRomance,
    isLoadingScienceFiction,
    isLoadingThriller,
    isLoadingWar,
    isLoadingWestern,
    fetchAction,
    fetchAdventure,
    fetchAnimation,
    fetchComedy,
    fetchCrime,
    fetchDocumentary,
    fetchDrama,
    fetchFantasy,
    fetchFamily,
    fetchHistory,
    fetchHorror,
    fetchMistery,
    fetchMusic,
    fetchRomance,
    fetchScienceFiction,
    fetchThriller,
    fetchWar,
    fetchWestern,
  } = useContext(MovieListsContext)

  useEffect(() => {
    fetchAction()
    fetchAdventure()
    fetchAnimation()
    fetchComedy()
    fetchCrime()
    fetchDocumentary()
    fetchDrama()
    fetchFantasy()
    fetchFamily()
    fetchHistory()
    fetchHorror()
    fetchMistery()
    fetchMusic()
    fetchRomance()
    fetchScienceFiction()
    fetchThriller()
    fetchWar()
    fetchWestern()
  }, [])

  const carousels = [
    {
      key: 'carousel-action',
      title: 'Action',
      data: action,
      genre: GenreCode.ACTION,
      isLoading: isLoadingAction,
    },
    {
      key: 'carousel-adventure',
      title: 'Adventure',
      data: adventure,
      genre: GenreCode.ADVENTURE,
      isLoading: isLoadingAdventure,
    },
    {
      key: 'carousel-animation',
      title: 'Animation',
      data: animation,
      genre: GenreCode.ANIMATION,
      isLoading: isLoadingAnimation,
    },
    {
      key: 'carousel-comedy',
      title: 'Comedy',
      data: comedy,
      genre: GenreCode.COMEDY,
      isLoading: isLoadingComedy,
    },
    {
      key: 'carousel-crime',
      title: 'Crime',
      data: crime,
      genre: GenreCode.CRIME,
      isLoading: isLoadingCrime,
    },
    {
      key: 'carousel-documentary',
      title: 'Documentary',
      data: documentary,
      genre: GenreCode.DOCUMENTARY,
      isLoading: isLoadingDocumentary,
    },
    {
      key: 'carousel-drama',
      title: 'Drama',
      data: drama,
      genre: GenreCode.DRAMA,
      isLoading: isLoadingDrama,
    },
    {
      key: 'carousel-family',
      title: 'Family',
      data: family,
      genre: GenreCode.FAMILY,
      isLoading: isLoadingFamily,
    },
    {
      key: 'carousel-fantasy',
      title: 'Fantasy',
      data: fantasy,
      genre: GenreCode.FANTASY,
      isLoading: isLoadingFantasy,
    },
    {
      key: 'carousel-history',
      title: 'History',
      data: history,
      genre: GenreCode.HISTORY,
      isLoading: isLoadingHistory,
    },
    {
      key: 'carousel-horror',
      title: 'Horror',
      data: horror,
      genre: GenreCode.HORROR,
      isLoading: isLoadingHorror,
    },
    {
      key: 'carousel-music',
      title: 'Music',
      data: music,
      genre: GenreCode.MUSIC,
      isLoading: isLoadingMusic,
    },
    {
      key: 'carousel-mistery',
      title: 'Mistery',
      data: mistery,
      genre: GenreCode.MISTERY,
      isLoading: isLoadingMistery,
    },
    {
      key: 'carousel-romance',
      title: 'Romance',
      data: romance,
      genre: GenreCode.ROMANCE,
      isLoading: isLoadingRomance,
    },
    {
      key: 'carousel-science-fiction',
      title: 'Science fiction',
      data: scienceFiction,
      genre: GenreCode.SCIENCE_FICTION,
      isLoading: isLoadingScienceFiction,
    },
    {
      key: 'carousel-thriller',
      title: 'Thriller',
      data: thriller,
      genre: GenreCode.THRILLER,
      isLoading: isLoadingThriller,
    },
    {
      key: 'carousel-war',
      title: 'War',
      data: war,
      genre: GenreCode.WAR,
      isLoading: isLoadingWar,
    },
    {
      key: 'carousel-western',
      title: 'Western',
      data: western,
      genre: GenreCode.WESTERN,
      isLoading: isLoadingWestern,
    },
  ]

  return (
    <Page>
      <MovieFilters
        onFilter={(genreCodes) => setGenreCodes(genreCodes)}
        data-testid="filters"
      />
      {carousels
        .filter((carousel) =>
          genreCodes.length > 0 && !genreCodes.includes(null)
            ? genreCodes.includes(carousel.genre)
            : true
        )
        .map((carousel) => (
          <ShowCarousel
            key={carousel.key}
            title={carousel.title}
            shows={carousel.data}
            genreId={carousel.genre}
            isLoading={carousel.isLoading}
            data-testid={carousel.key}
            role="list"
          />
        ))}
    </Page>
  )
}
