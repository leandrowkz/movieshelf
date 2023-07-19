import type { MovieCredits } from '@leandrowkz/tmdb'
import { mockPerson } from './mockPerson'

export const mockMovieCredits: MovieCredits = {
  id: 1010,
  cast: [{ ...mockPerson }, { ...mockPerson }, { ...mockPerson }],
  crew: [{ ...mockPerson }, { ...mockPerson }, { ...mockPerson }],
}
