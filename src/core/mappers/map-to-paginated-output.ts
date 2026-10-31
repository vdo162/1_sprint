import { PaginatedOutput } from '../types/paginated.output';

export function mapToPaginatedOutput<TItem, TData>(
  items: TItem[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
  mapItem: (item: TItem) => TData,
): PaginatedOutput<TData[]> {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: items.map(mapItem),
  };
}
