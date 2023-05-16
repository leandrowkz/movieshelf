import { MovieCredits } from '../types/MovieCredits'
import { mockPerson } from './mockPerson'

export const mockMovieCredits: MovieCredits = {
  id: 'MOVIE_CREDITS_442',
  cast: [{ ...mockPerson }, { ...mockPerson }, { ...mockPerson }],
  crew: [{ ...mockPerson }, { ...mockPerson }, { ...mockPerson }],
}
