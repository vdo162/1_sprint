import { SortDirection } from './sort-direction';

export type PaginationAndSortingFields<S> = {
  pageNumber: number;
  pageSize: number;
  sortBy: S;
  sortDirection: SortDirection;
};
