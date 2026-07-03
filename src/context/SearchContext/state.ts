import type { SearchState } from './types'
import { useHelpers } from '../../hooks/useHelpers'

const { getEmptyListPaginated } = useHelpers()

export const initialState: SearchState = {
  results: getEmptyListPaginated(),

  search: () => null,
}
