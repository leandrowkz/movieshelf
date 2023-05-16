import { BaseSyntheticEvent } from 'react'
import type { Movie, MovieItem } from '@leandrowkz/tmdb'
import { MovieVideo } from '../types/MovieVideo'

export class MovieHelper {
  static getImageUrl(path: string, size = 300) {
    return `https://image.tmdb.org/t/p/w${size}/${path}`
  }

  static getFirstTrailerUrl(videos: MovieVideo[]) {
    if (!videos) {
      return ''
    }

    const trailer = videos.find((video) => video.type === 'Trailer')

    if (!trailer) {
      return ''
    }

    return `https://youtube.com/watch?v=${trailer.key}`
  }

  static getReleaseYear(show: Movie | MovieItem) {
    const { release_date: release } = show

    return new Date(release).getFullYear().toString()
  }

  static hideBrokenImage(event: BaseSyntheticEvent) {
    const { target } = event

    if (target) {
      target.style.display = 'none'
    }
  }
}
