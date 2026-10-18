import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';

export function getPostsHandler(req: Request<{ id: string }>, res: Response) {
  const post = postsRepository.findById(req.params.id);

  if (!post) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorsMessages([{ field: 'id', message: 'Post not found' }]));
    return;
  }

  res.status(HttpStatus.Ok).send(post);
}
