import { PaginationAndSorting } from '../../../core/types/pagination-and-sorting';
import { MappedPostSortField, PostSortField } from './post-sort-field';

export type PostQueryInput = PaginationAndSorting<PostSortField>;
export type MappedPostQueryInput = PaginationAndSorting<MappedPostSortField>;
