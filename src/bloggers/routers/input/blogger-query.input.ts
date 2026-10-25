import { PaginationAndSorting } from '../../../core/types/pagination-and-sorting';
import { BloggerSortField } from './blogger-sort-field';

export type BloggerQueryInput = PaginationAndSorting<BloggerSortField> &
  Partial<{
    searchNameTerm: string;
  }>;
