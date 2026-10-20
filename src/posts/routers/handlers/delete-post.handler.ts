import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { postsRepository } from '../../repositories/posts.repository';

export async function deletePostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const isDeleted = await postsRepository.delete(id);

    if (!isDeleted) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorsMessages([{ field: 'id', message: 'Post not found' }]),
        );

      return;
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
