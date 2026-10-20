import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { bloggersRepository } from '../../repositories/bloggers.repository';

export async function deleteBloggerHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const isDeleted = await bloggersRepository.delete(id);

    if (!isDeleted) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorsMessages([{ field: 'id', message: 'Blogger not found' }]),
        );

      return;
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
