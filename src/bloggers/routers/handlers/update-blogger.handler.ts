import { Request, Response } from 'express';
import { BloggersInputDto } from '../../dto/bloggers.input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { bloggersRepository } from '../../repositories/bloggers.repository';

export function updateBloggerHandler(
  req: Request<{ id: string }, {}, BloggersInputDto>,
  res: Response,
) {
  const isUpdated = bloggersRepository.update(req.params.id, req.body);

  if (!isUpdated) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorsMessages([{ field: 'id', message: 'Blogger not found' }]),
      );
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
}
