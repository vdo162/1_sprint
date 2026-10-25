import { Request, Response } from 'express';
import { mapToPostListPaginatedOutput } from '../mappers/map-to-post-list-paginated-output.util';
import { PostQueryInput } from '../input/post-query.input';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function getPostListHandler(
  req: Request<{}, {}, {}, PostQueryInput>,
  res: Response,
) {
  try {
    const queryInput = req.query;

    const { items, totalCount } = await postsService.findMany(queryInput);

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
