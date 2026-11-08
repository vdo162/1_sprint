import {
  MappedCommentSortField,
  CommentSortField,
} from '../input/comment-sort-field';
import {
  MappedCommentQueryParams,
  CommentQueryParams,
} from '../input/comment-query-params';

export const mapCommentsSortField: Record<
  CommentSortField,
  MappedCommentSortField
> = {
  [CommentSortField.CreatedAt]: MappedCommentSortField.CreatedAt,
  [CommentSortField.UserLogin]: MappedCommentSortField.UserLogin,
};

export function mapCommentsQueryParams(
  queryParams: CommentQueryParams,
): MappedCommentQueryParams {
  return {
    ...queryParams,
    sortBy: mapCommentsSortField[queryParams.sortBy],
  };
}
