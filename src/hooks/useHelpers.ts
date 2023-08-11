import type {
  Department,
  Movie,
  MovieItem,
  PersonCrew,
  TVShow,
  TVShowItem,
  Video,
} from '@leandrowkz/tmdb'
import type { ListPaginated, Nullable } from 'src/types'

type Show = Movie | TVShow | MovieItem | TVShowItem

function getShowImageUrl(path: string, size = 300) {
  return `https://image.tmdb.org/t/p/w${size}/${path}`
}

function getCreditsDirector(crew: PersonCrew[]) {
  return crew.find((person) => person.job === 'Director')
}

function getCreditsProducer(crew: PersonCrew[]) {
  return crew
    .sort((a, b) => (a.popularity > b.popularity ? -1 : 1))
    .find(
      (person) =>
        person.job === 'Executive Producer' &&
        person.known_for_department !== 'Acting'
    )
}

function getShowTrailerUrl(videos: Video[]) {
  if (!videos) {
    return ''
  }

  const trailer = videos.find((video) => video.type === 'Trailer')

  if (!trailer) {
    return ''
  }

  return `https://youtube.com/watch?v=${trailer.key}`
}

function getShowReleaseYear(show: Show) {
  const date =
    'first_air_date' in show ? show.first_air_date : show.release_date

  return getYearFromDateString(date)
}

function getYearFromDateString(date: string) {
  if (!date) {
    return
  }

  return new Date(date).getFullYear().toString()
}

function getShowTitle(show: Show) {
  if ('title' in show) {
    return show.title
  }

  if ('name' in show) {
    return show.name
  }

  return ''
}

function getShowRuntimeOrSeasons(show: Show) {
  if ('runtime' in show) {
    return `${show.runtime} minutes`
  }

  if ('number_of_seasons' in show) {
    return `${show.number_of_seasons} seasons`
  }

  return ''
}

function getEmptyListPaginated<T>(): ListPaginated<T> {
  return {
    data: [],
    page: 0,
    pages: 0,
    count: 0,
    isLoading: false,
    hasErrors: false,
  }
}

function getJobByDepartment(
  department: Department,
  gender: Nullable<number> = 2
) {
  switch (department) {
    case 'Acting':
      return gender && gender > 1 ? 'Actor' : 'Actress'
    case 'Directing':
      return 'Director'
    case 'Production':
      return 'Producer'
    case 'Writing':
      return 'Writer'
    default:
      return department
  }
}

function getAgeFromDate(birthday: string) {
  const bday = new Date(birthday)
  const ageDifMs = Date.now() - bday.getTime()
  const ageDate = new Date(ageDifMs)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

function formatDate(date: string) {
  const timestamp = Date.parse(date)

  if (isNaN(timestamp)) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    Date.parse(date)
  )
}

export const useHelpers = () => ({
  getShowTitle,
  getShowRuntimeOrSeasons,
  getShowReleaseYear,
  getShowTrailerUrl,
  getShowImageUrl,
  getCreditsDirector,
  getCreditsProducer,
  getYearFromDateString,
  getEmptyListPaginated,
  getJobByDepartment,
  getAgeFromDate,
  formatDate,
})
