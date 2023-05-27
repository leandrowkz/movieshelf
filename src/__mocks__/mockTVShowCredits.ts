import { TVShowCredits } from '@leandrowkz/tmdb'
import { mockPerson } from './mockPerson'

export const mockTVShowCredits: TVShowCredits = {
  id: 2020,
  cast: [{ ...mockPerson }, { ...mockPerson }, { ...mockPerson }],
  crew: [{ ...mockPerson }, { ...mockPerson }, { ...mockPerson }],
}
