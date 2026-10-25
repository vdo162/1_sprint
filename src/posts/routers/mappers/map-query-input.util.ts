import { postSortFieldMapper } from '../input/post-sort-field';
import {
  MappedPostQueryInput,
  PostQueryInput,
} from '../input/post-query.input';

export function mapQueryInput(
  queryInput: PostQueryInput,
): MappedPostQueryInput {
  return {
    ...queryInput,
    sortBy: postSortFieldMapper[queryInput.sortBy],
  };
}
