import type { MovieItem, TMDBResponseList, TVShowItem } from '@leandrowkz/tmdb'
import type { ListPaginated, ShowType } from '../../src/types'

export function transformListResponse(
  response: TMDBResponseList<MovieItem[] | TVShowItem[]>,
  showType?: ShowType
) {
  const list: ListPaginated<MovieItem | TVShowItem> = {
    data: [],
    page: 0,
    pages: 0,
    count: 0,
  }

  const { results, page, total_pages, total_results } = response

  list.data = results
  list.page = page
  list.pages = total_pages
  list.count = total_results

  if (showType) {
    list.data.map((item) => {
      item.media_type = showType
      return item
    })
  }

  return list
}
