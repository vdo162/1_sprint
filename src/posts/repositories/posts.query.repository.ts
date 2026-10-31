import { ObjectId } from 'mongodb';
import { MappedPostQueryParams } from '../routers/input/post-query-params';
import { db } from '../../db';
import { mapToPostOutput } from '../routers/mappers/map-to-post-output.util';
import { PostOutput } from '../routers/output/post.output';
import { PaginatedOutput } from '../../core/types/paginated.output';
import { mapToPaginatedOutput } from '../../core/mappers/map-to-paginated-output';

export const postsQueryRepository = {
  async findMany(
    queryParams: MappedPostQueryParams,
    blogId?: string,
  ): Promise<PaginatedOutput<PostOutput[]>> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryParams;

    let filter = {};
    if (blogId) {
      filter = { 'blog.id': blogId };
    }
    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      db.collections.postsCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      db.collections.postsCollection.countDocuments(filter),
    ]);

    return mapToPaginatedOutput(
      items,
      {
        pageNumber: queryParams.pageNumber,
        pageSize: queryParams.pageSize,
        totalCount,
      },
      mapToPostOutput,
    );
  },

  async findById(id: string): Promise<PostOutput | null> {
    const post = await db.collections.postsCollection.findOne({
      _id: new ObjectId(id),
    });
    return post ? mapToPostOutput(post) : null;
  },
};
