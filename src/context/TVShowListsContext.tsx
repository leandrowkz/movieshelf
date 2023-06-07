import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { Genre, GenreCode, type TVShowItem } from '@leandrowkz/tmdb'
import { api } from '../services/TVShowsAPI'

type ListByGenre = {
  genre: Genre
  data: TVShowItem[]
}

type TVShowListsState = {
  airingToday: TVShowItem[]
  onTheAir: TVShowItem[]
  popular: TVShowItem[]
  topRated: TVShowItem[]
  similar: TVShowItem[]
  recommended: TVShowItem[]
  byGenres: ListByGenre[]

  action: TVShowItem[]
  adventure: TVShowItem[]
  animation: TVShowItem[]
  comedy: TVShowItem[]
  crime: TVShowItem[]
  documentary: TVShowItem[]
  drama: TVShowItem[]
  fantasy: TVShowItem[]
  family: TVShowItem[]
  history: TVShowItem[]
  horror: TVShowItem[]
  mistery: TVShowItem[]
  music: TVShowItem[]
  romance: TVShowItem[]
  scienceFiction: TVShowItem[]
  thriller: TVShowItem[]
  war: TVShowItem[]
  western: TVShowItem[]

  // actionAndAdventure: TVShowItem[]
  // animation: TVShowItem[]
  // comedy: TVShowItem[]
  // crime: TVShowItem[]
  // documentary: TVShowItem[]
  // drama: TVShowItem[]
  // family: TVShowItem[]
  // kids: TVShowItem[]
  // mistery: TVShowItem[]
  // news: TVShowItem[]
  // reality: TVShowItem[]
  // scifiAndFantasy: TVShowItem[]
  // soap: TVShowItem[]
  // talk: TVShowItem[]
  // warAndPolitics: TVShowItem[]
  // western: TVShowItem[]

  isLoadingAiringToday: boolean
  isLoadingOnTheAir: boolean
  isLoadingPopular: boolean
  isLoadingTopRated: boolean
  isLoadingSimilar: boolean
  isLoadingRecommended: boolean

  isLoadingAction: boolean
  isLoadingAdventure: boolean
  isLoadingAnimation: boolean
  isLoadingComedy: boolean
  isLoadingCrime: boolean
  isLoadingDocumentary: boolean
  isLoadingDrama: boolean
  isLoadingFamily: boolean
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

  fetchAiringToday: () => void
  fetchOnTheAir: () => void
  fetchPopular: () => void
  fetchTopRated: () => void
  fetchSimilar: (tvShowId: number) => void
  fetchRecommended: (tvShowId: number) => void

  fetchAction: () => void
  fetchAdventure: () => void
  fetchAnimation: () => void
  fetchComedy: () => void
  fetchCrime: () => void
  fetchDocumentary: () => void
  fetchDrama: () => void
  fetchFamily: () => void
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
}

export const TVShowListsContext = createContext<TVShowListsState>({
  airingToday: [],
  onTheAir: [],
  popular: [],
  topRated: [],
  similar: [],
  recommended: [],
  byGenres: [],

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

  isLoadingAiringToday: false,
  isLoadingOnTheAir: false,
  isLoadingPopular: false,
  isLoadingTopRated: false,
  isLoadingSimilar: false,
  isLoadingRecommended: false,

  isLoadingAction: false,
  isLoadingAdventure: false,
  isLoadingAnimation: false,
  isLoadingComedy: false,
  isLoadingCrime: false,
  isLoadingDocumentary: false,
  isLoadingDrama: false,
  isLoadingFamily: false,
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

  fetchAiringToday: () => null,
  fetchOnTheAir: () => null,
  fetchPopular: () => null,
  fetchTopRated: () => null,
  fetchSimilar: () => null,
  fetchRecommended: () => null,

  fetchAction: () => null,
  fetchAdventure: () => null,
  fetchAnimation: () => null,
  fetchComedy: () => null,
  fetchCrime: () => null,
  fetchDocumentary: () => null,
  fetchDrama: () => null,
  fetchFamily: () => null,
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
})

export const TVShowListsContextProvider = ({ children }: PropsWithChildren) => {
  const [airingToday, setAiringToday] = useState<TVShowItem[]>([])
  const [onTheAir, setOnTheAir] = useState<TVShowItem[]>([])
  const [popular, setPopular] = useState<TVShowItem[]>([])
  const [topRated, setTopRated] = useState<TVShowItem[]>([])
  const [similar, setSimilar] = useState<TVShowItem[]>([])
  const [recommended, setRecommended] = useState<TVShowItem[]>([])
  const [byGenres, setByGenres] = useState<ListByGenre[]>([])
  const [byGenres, setByGenres] = useState<ListByGenre[]>([])

  const [action, setAction] = useState<TVShowItem[]>([])
  const [adventure, setAdventure] = useState<TVShowItem[]>([])
  const [animation, setAnimation] = useState<TVShowItem[]>([])
  const [comedy, setComedy] = useState<TVShowItem[]>([])
  const [crime, setCrime] = useState<TVShowItem[]>([])
  const [documentary, setDocumentary] = useState<TVShowItem[]>([])
  const [drama, setDrama] = useState<TVShowItem[]>([])
  const [fantasy, setFantasy] = useState<TVShowItem[]>([])
  const [family, setFamily] = useState<TVShowItem[]>([])
  const [history, setHistory] = useState<TVShowItem[]>([])
  const [horror, setHorror] = useState<TVShowItem[]>([])
  const [mistery, setMistery] = useState<TVShowItem[]>([])
  const [music, setMusic] = useState<TVShowItem[]>([])
  const [romance, setRomance] = useState<TVShowItem[]>([])
  const [scienceFiction, setScienceFiction] = useState<TVShowItem[]>([])
  const [thriller, setThriller] = useState<TVShowItem[]>([])
  const [war, setWar] = useState<TVShowItem[]>([])
  const [western, setWestern] = useState<TVShowItem[]>([])

  const [isLoadingAiringToday, setIsLoadingAiringToday] =
    useState<boolean>(false)
  const [isLoadingOnTheAir, setIsLoadingOnTheAir] = useState<boolean>(false)
  const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(false)
  const [isLoadingTopRated, setIsLoadingTopRated] = useState<boolean>(false)
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(false)
  const [isLoadingRecommended, setIsLoadingRecommended] =
    useState<boolean>(false)

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

  const fetchByGenres = useCallback(
    async (genres: Genre[]) => {
      try {
        setByGenres([])
        setIsLoadingAiringToday(true)

        await Promise.all(
          genres.map(async (genre) => {
            const data = await api.fetchListByGenre([genre.id])

            setByGenres([
              ...byGenres.filter((item) => item.genre.id !== genre.id),
              { genre, data },
            ])
          })
        )
      }
    },
    [api]
  )

  const fetchAiringToday = useCallback(async () => {
    setAiringToday([])
    setIsLoadingAiringToday(true)

    const data = await api.fetchListAiringToday()

    setAiringToday(data)
    setIsLoadingAiringToday(false)
  }, [api])

  const fetchOnTheAir = useCallback(async () => {
    setOnTheAir([])
    setIsLoadingOnTheAir(true)

    const data = await api.fetchListOnTheAir()

    setOnTheAir(data)
    setIsLoadingOnTheAir(false)
  }, [api])

  const fetchPopular = useCallback(async () => {
    setPopular([])
    setIsLoadingPopular(true)

    const data = await api.fetchListPopular()

    setPopular(data)
    setIsLoadingPopular(false)
  }, [api])

  const fetchTopRated = useCallback(async () => {
    setTopRated([])
    setIsLoadingTopRated(true)

    const data = await api.fetchListTopRated()

    setTopRated(data)
    setIsLoadingTopRated(false)
  }, [api])

  const fetchSimilar = useCallback(
    async (TVShowId: number) => {
      setSimilar([])
      setIsLoadingSimilar(true)

      const data = await api.fetchListSimilar(TVShowId)

      setSimilar(data)
      setIsLoadingSimilar(false)
    },
    [api]
  )

  const fetchRecommended = useCallback(
    async (TVShowId: number) => {
      setRecommended([])
      setIsLoadingRecommended(true)

      const data = await api.fetchListRecommended(TVShowId)

      setRecommended(data)
      setIsLoadingRecommended(false)
    },
    [api]
  )

  const fetchAction = useCallback(async () => {
    setAction([])
    setIsLoadingAction(true)

    const data = await api.fetchListByGenre([GenreCode.ACTION])

    setAction(data)
    setIsLoadingAction(false)
  }, [api])

  const fetchAdventure = useCallback(async () => {
    setAdventure([])
    setIsLoadingAdventure(true)

    const data = await api.fetchListByGenre([GenreCode.ADVENTURE])

    setAdventure(data)
    setIsLoadingAdventure(false)
  }, [api])

  const fetchAnimation = useCallback(async () => {
    setAnimation([])
    setIsLoadingAnimation(true)

    const data = await api.fetchListByGenre([GenreCode.ANIMATION])

    setAnimation(data)
    setIsLoadingAnimation(false)
  }, [api])

  const fetchComedy = useCallback(async () => {
    setComedy([])
    setIsLoadingComedy(true)

    const data = await api.fetchListByGenre([GenreCode.COMEDY])

    setComedy(data)
    setIsLoadingComedy(false)
  }, [api])

  const fetchCrime = useCallback(async () => {
    setCrime([])
    setIsLoadingCrime(true)

    const data = await api.fetchListByGenre([GenreCode.CRIME])

    setCrime(data)
    setIsLoadingCrime(false)
  }, [api])

  const fetchDocumentary = useCallback(async () => {
    setDocumentary([])
    setIsLoadingDocumentary(true)

    const data = await api.fetchListByGenre([GenreCode.DOCUMENTARY])

    setDocumentary(data)
    setIsLoadingDocumentary(false)
  }, [api])

  const fetchDrama = useCallback(async () => {
    setDrama([])
    setIsLoadingDrama(true)

    const data = await api.fetchListByGenre([GenreCode.DRAMA])

    setDrama(data)
    setIsLoadingDrama(false)
  }, [api])

  const fetchFamily = useCallback(async () => {
    setFamily([])
    setIsLoadingFamily(true)

    const data = await api.fetchListByGenre([GenreCode.FAMILY])

    setFamily(data)
    setIsLoadingFamily(false)
  }, [api])

  const fetchFantasy = useCallback(async () => {
    setFantasy([])
    setIsLoadingFantasy(true)

    const data = await api.fetchListByGenre([GenreCode.FANTASY])

    setFantasy(data)
    setIsLoadingFantasy(false)
  }, [api])

  const fetchHistory = useCallback(async () => {
    setHistory([])
    setIsLoadingHistory(true)

    const data = await api.fetchListByGenre([GenreCode.HISTORY])

    setHistory(data)
    setIsLoadingHistory(false)
  }, [api])

  const fetchHorror = useCallback(async () => {
    setHorror([])
    setIsLoadingHorror(true)

    const data = await api.fetchListByGenre([GenreCode.HORROR])

    setHorror(data)
    setIsLoadingHorror(false)
  }, [api])

  const fetchMistery = useCallback(async () => {
    setMistery([])
    setIsLoadingMistery(true)

    const data = await api.fetchListByGenre([GenreCode.MISTERY])

    setMistery(data)
    setIsLoadingMistery(false)
  }, [api])

  const fetchMusic = useCallback(async () => {
    setMusic([])
    setIsLoadingMusic(true)

    const data = await api.fetchListByGenre([GenreCode.MUSIC])

    setMusic(data)
    setIsLoadingMusic(false)
  }, [api])

  const fetchRomance = useCallback(async () => {
    setRomance([])
    setIsLoadingRomance(true)

    const data = await api.fetchListByGenre([GenreCode.ROMANCE])

    setRomance(data)
    setIsLoadingRomance(false)
  }, [api])

  const fetchScienceFiction = useCallback(async () => {
    setScienceFiction([])
    setIsLoadingScienceFiction(true)

    const data = await api.fetchListByGenre([GenreCode.SCIENCE_FICTION])

    setScienceFiction(data)
    setIsLoadingScienceFiction(false)
  }, [api])

  const fetchThriller = useCallback(async () => {
    setThriller([])
    setIsLoadingThriller(true)

    const data = await api.fetchListByGenre([GenreCode.THRILLER])

    setThriller(data)
    setIsLoadingThriller(false)
  }, [api])

  const fetchWar = useCallback(async () => {
    setWar([])
    setIsLoadingWar(true)

    const data = await api.fetchListByGenre([GenreCode.WAR])

    setWar(data)
    setIsLoadingWar(false)
  }, [api])

  const fetchWestern = useCallback(async () => {
    setWestern([])
    setIsLoadingWestern(true)

    const data = await api.fetchListByGenre([GenreCode.WESTERN])

    setWestern(data)
    setIsLoadingWestern(false)
  }, [api])

  const state = {
    airingToday,
    onTheAir,
    popular,
    topRated,
    similar,
    recommended,

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

    isLoadingAiringToday,
    isLoadingOnTheAir,
    isLoadingPopular,
    isLoadingTopRated,
    isLoadingSimilar,
    isLoadingRecommended,

    isLoadingAction,
    isLoadingAdventure,
    isLoadingAnimation,
    isLoadingComedy,
    isLoadingCrime,
    isLoadingDocumentary,
    isLoadingDrama,
    isLoadingFamily,
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

    fetchAiringToday,
    fetchOnTheAir,
    fetchPopular,
    fetchTopRated,
    fetchSimilar,
    fetchRecommended,

    fetchAction,
    fetchAdventure,
    fetchAnimation,
    fetchComedy,
    fetchCrime,
    fetchDocumentary,
    fetchDrama,
    fetchFamily,
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
  }

  return (
    <TVShowListsContext.Provider value={state}>
      {children}
    </TVShowListsContext.Provider>
  )
}
