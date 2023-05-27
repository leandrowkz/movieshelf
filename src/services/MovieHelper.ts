import { BaseSyntheticEvent } from 'react'
import type { Movie, MovieItem, TVShow, Video } from '@leandrowkz/tmdb'

export class MovieHelper {
  static getImageUrl(path: string, size = 300) {
    return `https://image.tmdb.org/t/p/w${size}/${path}`
  }

  static getFirstTrailerUrl(videos: Video[]) {
    if (!videos) {
      return ''
    }

    const trailer = videos.find((video) => video.type === 'Trailer')

    if (!trailer) {
      return ''
    }

    return `https://youtube.com/watch?v=${trailer.key}`
  }

  static getReleaseYear(show: Movie | MovieItem | TVShow) {
    const date =
      'first_air_date' in show ? show.first_air_date : show.release_date

    return new Date(date).getFullYear().toString()
  }

  static hideBrokenImage(event: BaseSyntheticEvent) {
    const { target } = event

    if (target) {
      target.style.display = 'none'
    }
  }
}
