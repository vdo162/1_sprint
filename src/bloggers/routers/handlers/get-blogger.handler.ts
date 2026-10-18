import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { bloggersRepository } from '../../repositories/bloggers.repository';

export function getBloggerHandler(req: Request<{ id: string }>, res: Response) {
  const blogger = bloggersRepository.findById(req.params.id);

  if (!blogger) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorsMessages([{ field: 'id', message: 'Blogger not found' }]),
      );
    return;
  }

  res.status(HttpStatus.Ok).send(blogger);
}
