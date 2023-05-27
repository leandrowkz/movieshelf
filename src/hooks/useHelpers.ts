import type {
  Movie,
  MovieItem,
  TVShow,
  TVShowItem,
  Video,
} from '@leandrowkz/tmdb'

type Show = Movie | TVShow | MovieItem | TVShowItem

function getShowImageUrl(path: string, size = 300) {
  return `https://image.tmdb.org/t/p/w${size}/${path}`
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

export const useHelpers = () => ({
  getShowTitle,
  getShowRuntimeOrSeasons,
  getShowReleaseYear,
  getShowTrailerUrl,
  getShowImageUrl,
})