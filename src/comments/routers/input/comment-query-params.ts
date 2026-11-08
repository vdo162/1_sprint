import { PaginationAndSortingFields } from '../../../core/types/pagination-and-sorting-fields';
import { MappedCommentSortField, CommentSortField } from './comment-sort-field';

export type CommentQueryParams = PaginationAndSortingFields<CommentSortField>;

export type MappedCommentQueryParams =
  PaginationAndSortingFields<MappedCommentSortField>;
