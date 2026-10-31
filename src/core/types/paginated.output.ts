export type PaginatedOutput<I> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: I;
};
