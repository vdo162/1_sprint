import { PaginationAndSortingFields } from '../../../core/types/pagination-and-sorting-fields';
import { MappedPostSortField, PostSortField } from './post-sort-field';

export type PostQueryParams = PaginationAndSortingFields<PostSortField>;

export type MappedPostQueryParams =
  PaginationAndSortingFields<MappedPostSortField>;
