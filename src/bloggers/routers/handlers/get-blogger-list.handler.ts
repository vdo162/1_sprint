import { Request, Response } from 'express';
import { mapToBloggerListPaginatedOutput } from '../mappers/map-to-blogger-list-paginated-output.util';
import { BloggerQueryInput } from '../input/blogger-query.input';
import { bloggersService } from '../../application/bloggers.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function getBloggerListHandler(
  req: Request<{ id: string }, {}, {}, BloggerQueryInput>,
  res: Response,
) {
  try {
    const queryInput = req.query;

    const { items, totalCount } = await bloggersService.findMany(queryInput);

    const postListOutput = mapToBloggerListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.status(HttpStatus.Ok).send(postListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
