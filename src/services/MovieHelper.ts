export class MovieHelper {
  static getImageUrl(path: string, size = 300) {
    return `https://image.tmdb.org/t/p/w${size}/${path}`
  }
}
