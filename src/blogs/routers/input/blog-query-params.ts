import { PaginationAndSortingFields } from '../../../core/types/pagination-and-sorting-fields';
import { BlogSortField } from './blog-sort-field';

export type BlogQueryParams = PaginationAndSortingFields<BlogSortField> & {
  searchNameTerm?: string;
};
