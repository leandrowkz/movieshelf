import { Movie, MovieAccountStates, PersonCast, Video } from '@leandrowkz/tmdb'
import { Nullable } from 'src/types/Nullable'

export type MovieDetailsState = {
  movie: Nullable<Movie>
  accountStates: MovieAccountStates
  cast: PersonCast[]
  crew: PersonCast[]
  videos: Video[]
  isLoadingMovie: boolean
  isLoadingCredits: boolean
  isLoadingVideos: boolean
  isLoadingAccountStates: boolean
  hasMovieErrors: boolean
  fetchMovie: (movieId: number) => void
  fetchCredits: (movieId: number) => void
  fetchVideos: (movieId: number) => void
  fetchAccountStates: (movieId: number) => void
}
