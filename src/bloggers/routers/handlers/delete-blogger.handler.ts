import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { bloggersRepository } from '../../repositories/bloggers.repository';

export function deleteBloggerHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  const isDeleted = bloggersRepository.delete(req.params.id);

  if (!isDeleted) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorsMessages([{ field: 'id', message: 'Blogger not found' }]),
      );
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
}
