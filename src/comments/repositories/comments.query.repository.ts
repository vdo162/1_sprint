import { ObjectId } from 'mongodb';
import { MappedCommentQueryParams } from '../routers/input/comment-query-params';
import { db } from '../../db';
import { mapToCommentOutput } from '../routers/mappers/map-to-comment-output.util';
import { CommentOutput } from '../routers/output/comment.output';
import { PaginatedOutput } from '../../core/types/paginated.output';
import { mapToPaginatedOutput } from '../../core/mappers/map-to-paginated-output';

export const commentsQueryRepository = {
  async findMany(
    queryParams: MappedCommentQueryParams,
    postId: string,
  ): Promise<PaginatedOutput<CommentOutput[]>> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryParams;

    let filter = { 'post.id': postId };

    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      db.collections.commentsCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      db.collections.commentsCollection.countDocuments(filter),
    ]);

    return mapToPaginatedOutput(
      items,
      {
        pageNumber: queryParams.pageNumber,
        pageSize: queryParams.pageSize,
        totalCount,
      },
      mapToCommentOutput,
    );
  },

  async findById(id: string): Promise<CommentOutput | null> {
    const comment = await db.collections.commentsCollection.findOne({
      _id: new ObjectId(id),
    });
    return comment ? mapToCommentOutput(comment) : null;
  },
};
