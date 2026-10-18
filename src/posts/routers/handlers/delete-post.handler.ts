import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { postsRepository } from '../../repositories/posts.repository';

export function deletePostHandler(req: Request<{ id: string }>, res: Response) {
  const isDeleted = postsRepository.delete(req.params.id);

  if (!isDeleted) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorsMessages([{ field: 'id', message: 'Post not found' }]));
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
}
