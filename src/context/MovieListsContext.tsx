import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { GenreCode, type MovieItem } from '@leandrowkz/tmdb'
import { moviesAPI } from '../services/MoviesAPI'

type MovieListsState = {
  inTheatres: MovieItem[]
  trending: MovieItem[]
  similar: MovieItem[]
  recommended: MovieItem[]
  mostPopular: MovieItem[]
  bestComedies: MovieItem[]
  scifiAndFantasy: MovieItem[]
  topRatedDocumentaries: MovieItem[]
  action: MovieItem[]
  adventure: MovieItem[]
  animation: MovieItem[]
  comedy: MovieItem[]
  crime: MovieItem[]
  documentary: MovieItem[]
  drama: MovieItem[]
  fantasy: MovieItem[]
  family: MovieItem[]
  history: MovieItem[]
  horror: MovieItem[]
  mistery: MovieItem[]
  music: MovieItem[]
  romance: MovieItem[]
  scienceFiction: MovieItem[]
  thriller: MovieItem[]
  war: MovieItem[]
  western: MovieItem[]
  category: MovieItem[]
  isLoadingTrending: boolean
  isLoadingInTheatres: boolean
  isLoadingSimilar: boolean
  isLoadingRecommended: boolean
  isLoadingMostPopular: boolean
  isLoadingBestComedies: boolean
  isLoadingScifiAndFantasy: boolean
  isLoadingFamily: boolean
  isLoadingTopRatedDocumentaries: boolean
  isLoadingAction: boolean
  isLoadingAdventure: boolean
  isLoadingAnimation: boolean
  isLoadingComedy: boolean
  isLoadingCrime: boolean
  isLoadingDocumentary: boolean
  isLoadingDrama: boolean
  isLoadingFantasy: boolean
  isLoadingHistory: boolean
  isLoadingHorror: boolean
  isLoadingMistery: boolean
  isLoadingMusic: boolean
  isLoadingRomance: boolean
  isLoadingScienceFiction: boolean
  isLoadingThriller: boolean
  isLoadingWar: boolean
  isLoadingWestern: boolean
  isLoadingByCategory: boolean
  hasCategoryErrors: boolean
  fetchTrending: () => void
  fetchInTheatres: () => void
  fetchSimilar: (movieId: number) => void
  fetchRecommended: (movieId: number) => void
  fetchMostPopular: () => void
  fetchBestComedies: () => void
  fetchScifiAndFantasy: () => void
  fetchFamily: () => void
  fetchTopRatedDocumentaries: () => void
  fetchAction: () => void
  fetchAdventure: () => void
  fetchAnimation: () => void
  fetchComedy: () => void
  fetchCrime: () => void
  fetchDocumentary: () => void
  fetchDrama: () => void
  fetchFantasy: () => void
  fetchHistory: () => void
  fetchHorror: () => void
  fetchMistery: () => void
  fetchMusic: () => void
  fetchRomance: () => void
  fetchScienceFiction: () => void
  fetchThriller: () => void
  fetchWar: () => void
  fetchWestern: () => void
  fetchByCategory: (categoryId: number) => void
}

export const MovieListsContext = createContext<MovieListsState>({
  trending: [],
  inTheatres: [],
  similar: [],
  recommended: [],
  mostPopular: [],
  bestComedies: [],
  scifiAndFantasy: [],
  action: [],
  adventure: [],
  animation: [],
  comedy: [],
  crime: [],
  documentary: [],
  drama: [],
  fantasy: [],
  family: [],
  history: [],
  horror: [],
  mistery: [],
  music: [],
  romance: [],
  scienceFiction: [],
  thriller: [],
  war: [],
  western: [],
  category: [],
  topRatedDocumentaries: [],
  isLoadingTrending: false,
  isLoadingInTheatres: false,
  isLoadingSimilar: false,
  isLoadingRecommended: false,
  isLoadingMostPopular: false,
  isLoadingBestComedies: false,
  isLoadingScifiAndFantasy: false,
  isLoadingFamily: false,
  isLoadingTopRatedDocumentaries: false,
  isLoadingAction: false,
  isLoadingAdventure: false,
  isLoadingAnimation: false,
  isLoadingComedy: false,
  isLoadingCrime: false,
  isLoadingDocumentary: false,
  isLoadingDrama: false,
  isLoadingFantasy: false,
  isLoadingHistory: false,
  isLoadingHorror: false,
  isLoadingMistery: false,
  isLoadingMusic: false,
  isLoadingRomance: false,
  isLoadingScienceFiction: false,
  isLoadingThriller: false,
  isLoadingWar: false,
  isLoadingWestern: false,
  isLoadingByCategory: false,
  hasCategoryErrors: false,
  fetchTrending: () => null,
  fetchSimilar: () => null,
  fetchRecommended: () => null,
  fetchMostPopular: () => null,
  fetchBestComedies: () => null,
  fetchScifiAndFantasy: () => null,
  fetchFamily: () => null,
  fetchTopRatedDocumentaries: () => null,
  fetchInTheatres: () => null,
  fetchAction: () => null,
  fetchAdventure: () => null,
  fetchAnimation: () => null,
  fetchComedy: () => null,
  fetchCrime: () => null,
  fetchDocumentary: () => null,
  fetchDrama: () => null,
  fetchFantasy: () => null,
  fetchHistory: () => null,
  fetchHorror: () => null,
  fetchMistery: () => null,
  fetchMusic: () => null,
  fetchRomance: () => null,
  fetchScienceFiction: () => null,
  fetchThriller: () => null,
  fetchWar: () => null,
  fetchWestern: () => null,
  fetchByCategory: () => null,
})

export const MovieListsContextProvider = ({ children }: PropsWithChildren) => {
  const [trending, setTrending] = useState<MovieItem[]>([])
  const [similar, setSimilar] = useState<MovieItem[]>([])
  const [recommended, setRecommended] = useState<MovieItem[]>([])
  const [mostPopular, setMostPopular] = useState<MovieItem[]>([])
  const [bestComedies, setBestComedies] = useState<MovieItem[]>([])
  const [scifiAndFantasy, setScifiAndFantasy] = useState<MovieItem[]>([])
  const [action, setAction] = useState<MovieItem[]>([])
  const [adventure, setAdventure] = useState<MovieItem[]>([])
  const [animation, setAnimation] = useState<MovieItem[]>([])
  const [comedy, setComedy] = useState<MovieItem[]>([])
  const [crime, setCrime] = useState<MovieItem[]>([])
  const [documentary, setDocumentary] = useState<MovieItem[]>([])
  const [drama, setDrama] = useState<MovieItem[]>([])
  const [fantasy, setFantasy] = useState<MovieItem[]>([])
  const [family, setFamily] = useState<MovieItem[]>([])
  const [history, setHistory] = useState<MovieItem[]>([])
  const [horror, setHorror] = useState<MovieItem[]>([])
  const [mistery, setMistery] = useState<MovieItem[]>([])
  const [music, setMusic] = useState<MovieItem[]>([])
  const [romance, setRomance] = useState<MovieItem[]>([])
  const [scienceFiction, setScienceFiction] = useState<MovieItem[]>([])
  const [thriller, setThriller] = useState<MovieItem[]>([])
  const [war, setWar] = useState<MovieItem[]>([])
  const [western, setWestern] = useState<MovieItem[]>([])
  const [category, setCategory] = useState<MovieItem[]>([])
  const [topRatedDocumentaries, setTopRatedDocumentaries] = useState<
    MovieItem[]
  >([])
  const [inTheatres, setInTheatres] = useState<MovieItem[]>([])
  const [isLoadingTrending, setIsLoadingTrending] = useState(false)
  const [isLoadingInTheatres, setIsLoadingInTheatres] = useState(false)
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false)
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false)
  const [isLoadingMostPopular, setIsLoadingMostPopular] = useState(false)
  const [isLoadingBestComedies, setIsLoadingBestComedies] = useState(false)
  const [isLoadingScifiAndFantasy, setIsLoadingScifiAndFantasy] =
    useState(false)
  const [isLoadingTopRatedDocumentaries, setIsLoadingTopRatedDocumentaries] =
    useState(false)
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const [isLoadingAdventure, setIsLoadingAdventure] = useState(false)
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false)
  const [isLoadingComedy, setIsLoadingComedy] = useState(false)
  const [isLoadingCrime, setIsLoadingCrime] = useState(false)
  const [isLoadingDocumentary, setIsLoadingDocumentary] = useState(false)
  const [isLoadingDrama, setIsLoadingDrama] = useState(false)
  const [isLoadingFantasy, setIsLoadingFantasy] = useState(false)
  const [isLoadingFamily, setIsLoadingFamily] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [isLoadingHorror, setIsLoadingHorror] = useState(false)
  const [isLoadingMistery, setIsLoadingMistery] = useState(false)
  const [isLoadingMusic, setIsLoadingMusic] = useState(false)
  const [isLoadingRomance, setIsLoadingRomance] = useState(false)
  const [isLoadingScienceFiction, setIsLoadingScienceFiction] = useState(false)
  const [isLoadingThriller, setIsLoadingThriller] = useState(false)
  const [isLoadingWar, setIsLoadingWar] = useState(false)
  const [isLoadingWestern, setIsLoadingWestern] = useState(false)
  const [isLoadingByCategory, setIsLoadingByCategory] = useState(false)

  const [hasCategoryErrors, setHasCategoryErrors] = useState(false)

  const fetchSimilar = useCallback(
    async (movieId: number) => {
      setSimilar([])
      setIsLoadingSimilar(true)

      const data = await moviesAPI.fetchListSimilar(movieId)

      setSimilar(data)
      setIsLoadingSimilar(false)
    },
    [moviesAPI]
  )

  const fetchRecommended = useCallback(
    async (movieId: number) => {
      setRecommended([])
      setIsLoadingRecommended(true)

      const data = await moviesAPI.fetchListRecommended(movieId)

      setRecommended(data)
      setIsLoadingRecommended(false)
    },
    [moviesAPI]
  )

  const fetchTrending = useCallback(async () => {
    setTrending([])
    setIsLoadingTrending(true)

    const data = await moviesAPI.fetchListTrending()

    setTrending(data)
    setIsLoadingTrending(false)
  }, [moviesAPI])

  const fetchMostPopular = useCallback(async () => {
    setMostPopular([])
    setIsLoadingMostPopular(true)

    const data = await moviesAPI.fetchListMostPopular()

    setMostPopular(data)
    setIsLoadingMostPopular(false)
  }, [moviesAPI])

  const fetchBestComedies = useCallback(async () => {
    setBestComedies([])
    setIsLoadingBestComedies(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.COMEDY], {
      'vote_average.gte': 7.5,
    })

    setBestComedies(data)
    setIsLoadingBestComedies(false)
  }, [moviesAPI])

  const fetchScifiAndFantasy = useCallback(async () => {
    setScifiAndFantasy([])
    setIsLoadingScifiAndFantasy(true)

    const data = await moviesAPI.fetchListByGenre([
      GenreCode.SCIENCE_FICTION,
      GenreCode.FANTASY,
    ])

    setScifiAndFantasy(data)
    setIsLoadingScifiAndFantasy(false)
  }, [moviesAPI])

  const fetchFamily = useCallback(async () => {
    setFamily([])
    setIsLoadingFamily(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.FAMILY])

    setFamily(data)
    setIsLoadingFamily(false)
  }, [moviesAPI])

  const fetchTopRatedDocumentaries = useCallback(async () => {
    setTopRatedDocumentaries([])
    setIsLoadingTopRatedDocumentaries(true)

    const filters = {
      sort_by: 'popularity.desc',
      'vote_average.gte': 9,
    }
    const data = await moviesAPI.fetchListByGenre(
      [GenreCode.DOCUMENTARY],
      filters
    )

    setTopRatedDocumentaries(data)
    setIsLoadingTopRatedDocumentaries(false)
  }, [moviesAPI])

  const fetchInTheatres = useCallback(async () => {
    setInTheatres([])
    setIsLoadingInTheatres(true)

    const data = await moviesAPI.fetchListInTheatres()

    setInTheatres(data)
    setIsLoadingInTheatres(false)
  }, [moviesAPI])

  const fetchAction = useCallback(async () => {
    setAction([])
    setIsLoadingAction(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.ACTION])

    setAction(data)
    setIsLoadingAction(false)
  }, [moviesAPI])

  const fetchAdventure = useCallback(async () => {
    setAdventure([])
    setIsLoadingAdventure(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.ADVENTURE])

    setAdventure(data)
    setIsLoadingAdventure(false)
  }, [moviesAPI])

  const fetchAnimation = useCallback(async () => {
    setAnimation([])
    setIsLoadingAnimation(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.ANIMATION])

    setAnimation(data)
    setIsLoadingAnimation(false)
  }, [moviesAPI])

  const fetchComedy = useCallback(async () => {
    setComedy([])
    setIsLoadingComedy(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.COMEDY])

    setComedy(data)
    setIsLoadingComedy(false)
  }, [moviesAPI])

  const fetchCrime = useCallback(async () => {
    setCrime([])
    setIsLoadingCrime(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.CRIME])

    setCrime(data)
    setIsLoadingCrime(false)
  }, [moviesAPI])

  const fetchDocumentary = useCallback(async () => {
    setDocumentary([])
    setIsLoadingDocumentary(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.DOCUMENTARY])

    setDocumentary(data)
    setIsLoadingDocumentary(false)
  }, [moviesAPI])

  const fetchDrama = useCallback(async () => {
    setDrama([])
    setIsLoadingDrama(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.DRAMA])

    setDrama(data)
    setIsLoadingDrama(false)
  }, [moviesAPI])

  const fetchFantasy = useCallback(async () => {
    setFantasy([])
    setIsLoadingFantasy(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.FANTASY])

    setFantasy(data)
    setIsLoadingFantasy(false)
  }, [moviesAPI])

  const fetchHistory = useCallback(async () => {
    setHistory([])
    setIsLoadingHistory(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.HISTORY])

    setHistory(data)
    setIsLoadingHistory(false)
  }, [moviesAPI])

  const fetchHorror = useCallback(async () => {
    setHorror([])
    setIsLoadingHorror(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.HORROR])

    setHorror(data)
    setIsLoadingHorror(false)
  }, [moviesAPI])

  const fetchMistery = useCallback(async () => {
    setMistery([])
    setIsLoadingMistery(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.MISTERY])

    setMistery(data)
    setIsLoadingMistery(false)
  }, [moviesAPI])

  const fetchMusic = useCallback(async () => {
    setMusic([])
    setIsLoadingMusic(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.MUSIC])

    setMusic(data)
    setIsLoadingMusic(false)
  }, [moviesAPI])

  const fetchRomance = useCallback(async () => {
    setRomance([])
    setIsLoadingRomance(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.ROMANCE])

    setRomance(data)
    setIsLoadingRomance(false)
  }, [moviesAPI])

  const fetchScienceFiction = useCallback(async () => {
    setScienceFiction([])
    setIsLoadingScienceFiction(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.SCIENCE_FICTION])

    setScienceFiction(data)
    setIsLoadingScienceFiction(false)
  }, [moviesAPI])

  const fetchThriller = useCallback(async () => {
    setThriller([])
    setIsLoadingThriller(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.THRILLER])

    setThriller(data)
    setIsLoadingThriller(false)
  }, [moviesAPI])

  const fetchWar = useCallback(async () => {
    setWar([])
    setIsLoadingWar(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.WAR])

    setWar(data)
    setIsLoadingWar(false)
  }, [moviesAPI])

  const fetchWestern = useCallback(async () => {
    setWestern([])
    setIsLoadingWestern(true)

    const data = await moviesAPI.fetchListByGenre([GenreCode.WESTERN])

    setWestern(data)
    setIsLoadingWestern(false)
  }, [moviesAPI])

  const fetchByCategory = useCallback(
    async (categoryId: number) => {
      try {
        setCategory([])
        setHasCategoryErrors(false)
        setIsLoadingByCategory(true)

        const data = await moviesAPI.fetchListByGenre([categoryId])

        setCategory(data)
      } catch {
        setHasCategoryErrors(true)
      } finally {
        setIsLoadingByCategory(false)
      }
    },
    [moviesAPI]
  )

  const state = {
    trending,
    similar,
    recommended,
    mostPopular,
    bestComedies,
    scifiAndFantasy,
    topRatedDocumentaries,
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
    category,
    inTheatres,
    isLoadingTrending,
    isLoadingInTheatres,
    isLoadingSimilar,
    isLoadingRecommended,
    isLoadingMostPopular,
    isLoadingBestComedies,
    isLoadingScifiAndFantasy,
    isLoadingFamily,
    isLoadingTopRatedDocumentaries,
    isLoadingAction,
    isLoadingAdventure,
    isLoadingAnimation,
    isLoadingComedy,
    isLoadingCrime,
    isLoadingDocumentary,
    isLoadingDrama,
    isLoadingFantasy,
    isLoadingHistory,
    isLoadingHorror,
    isLoadingMistery,
    isLoadingMusic,
    isLoadingRomance,
    isLoadingScienceFiction,
    isLoadingThriller,
    isLoadingWar,
    isLoadingWestern,
    isLoadingByCategory,
    hasCategoryErrors,
    fetchTrending,
    fetchSimilar,
    fetchRecommended,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
    fetchInTheatres,
    fetchAction,
    fetchAdventure,
    fetchAnimation,
    fetchComedy,
    fetchCrime,
    fetchDocumentary,
    fetchDrama,
    fetchFantasy,
    fetchHistory,
    fetchHorror,
    fetchMistery,
    fetchMusic,
    fetchRomance,
    fetchScienceFiction,
    fetchThriller,
    fetchWar,
    fetchWestern,
    fetchByCategory,
  }

  return (
    <MovieListsContext.Provider value={state}>
      {children}
    </MovieListsContext.Provider>
  )
}
