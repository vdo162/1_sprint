import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { postsService } from '../../../posts/application/posts.service';
import { mapToPostListPaginatedOutput } from '../../../posts/routers/mappers/map-to-post-list-paginated-output.util';
import { PostQueryInput } from '../../../posts/routers/input/post-query.input';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function getBloggerPostListHandler(
  req: Request<{ id: string }, {}, {}, PostQueryInput>,
  res: Response,
) {
  try {
    const bloggerId = req.params.id;
    const queryInput = req.query;

    const { items, totalCount } = await postsService.findMany(
      queryInput,
      bloggerId,
    );

    const postListOutput = mapToPostListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.status(HttpStatus.Ok).send(postListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
