import { Request, Response } from 'express';
import { mapToPostOutput } from '../mappers/map-to-post-output.util';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function getPostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const post = await postsService.findById(id);

    const postViewOutput = mapToPostOutput(post);

    res.status(HttpStatus.Ok).send(postViewOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
