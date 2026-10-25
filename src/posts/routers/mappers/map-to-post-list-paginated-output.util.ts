import { WithId } from 'mongodb';
import { mapToPaginatedOutput } from '../../../core/mappers/map-to-paginated-output';
import { PostListPaginatedOutput } from '../output/post-list-paginated.output';
import { Post } from '../../domain/post';
import { mapToPostOutput } from './map-to-post-output.util';

export function mapToPostListPaginatedOutput(
  posts: WithId<Post>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): PostListPaginatedOutput {
  return mapToPaginatedOutput(posts, meta, mapToPostOutput);
}
