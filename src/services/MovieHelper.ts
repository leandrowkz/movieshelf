import { BaseSyntheticEvent } from 'react'
import { Movie } from 'src/types/Movie'

export class MovieHelper {
  static getImageUrl(path: string, size = 300) {
    return `https://image.tmdb.org/t/p/w${size}/${path}`
  }

  static getTrailerUrl(show: Movie) {
    const trailer = show.videos?.results.find((video) => video.type === 'Trailer')

    if (!trailer) {
      return ''
    }

    return `https://youtube.com/watch?v=${trailer.key}`
  }

  static getReleaseYear(show: Movie) {
    const { release_date: release } = show

    return new Date(release).getFullYear().toString();
  }

  static hideBrokenImage (event: BaseSyntheticEvent) {
    const { target } = event

    if (target) {
      target.style.display = 'none'
    }
  }
}
