import { Movie, PersonCast, Video } from '@leandrowkz/tmdb'
import { Nullable } from 'src/types/Nullable'
import { UserShowStates } from 'src/types/UserShowStates'

export type MovieDetailsState = {
  movie: Nullable<Movie>
  states: UserShowStates
  cast: PersonCast[]
  crew: PersonCast[]
  videos: Video[]
  isLoadingMovie: boolean
  isLoadingCredits: boolean
  isLoadingVideos: boolean
  isLoadingStates: boolean
  hasMovieErrors: boolean
  fetchMovie: (movieId: number) => void
  fetchCredits: (movieId: number) => void
  fetchVideos: (movieId: number) => void
  fetchStates: (movieId: number) => void
}
