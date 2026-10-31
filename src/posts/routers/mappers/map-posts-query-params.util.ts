import { MappedPostSortField, PostSortField } from '../input/post-sort-field';
import {
  MappedPostQueryParams,
  PostQueryParams,
} from '../input/post-query-params';

export const mapPostsSortField: Record<PostSortField, MappedPostSortField> = {
  [PostSortField.CreatedAt]: MappedPostSortField.CreatedAt,
  [PostSortField.Title]: MappedPostSortField.Title,
  [PostSortField.BlogName]: MappedPostSortField.BlogName,
};

export function mapPostsQueryParams(
  queryParams: PostQueryParams,
): MappedPostQueryParams {
  return {
    ...queryParams,
    sortBy: mapPostsSortField[queryParams.sortBy],
  };
}
