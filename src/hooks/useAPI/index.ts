import { default as favorites } from './apis/favorites'
import { default as genres } from './apis/genres'
import { default as movies } from './apis/movies'
import { default as newsletter } from './apis/newsletter'
import { default as tvSeasons } from './apis/tv-seasons'
import { default as tvShows } from './apis/tv-shows'

type NamespaceAPI =
  | 'favorites'
  | 'genres'
  | 'movies'
  | 'newsletter'
  | 'tv-seasons'
  | 'tv-shows'

type APIWrapper<T extends NamespaceAPI> = T extends 'favorites'
  ? typeof favorites
  : T extends 'genres'
  ? typeof genres
  : T extends 'movies'
  ? typeof movies
  : T extends 'newsletter'
  ? typeof newsletter
  : T extends 'tv-seasons'
  ? typeof tvSeasons
  : T extends 'tv-shows'
  ? typeof tvShows
  : never

export function useAPI<T extends NamespaceAPI>(namespace: T): APIWrapper<T> {
  switch (namespace) {
    default:
    case 'favorites':
      return favorites as APIWrapper<T>

    case 'genres':
      return genres as APIWrapper<T>

    case 'movies':
      return movies as APIWrapper<T>

    case 'newsletter':
      return newsletter as APIWrapper<T>

    case 'tv-seasons':
      return tvSeasons as APIWrapper<T>

    case 'tv-shows':
      return tvShows as APIWrapper<T>
  }
}
