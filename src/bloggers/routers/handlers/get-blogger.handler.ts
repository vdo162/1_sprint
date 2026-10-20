import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { bloggersRepository } from '../../repositories/bloggers.repository';
import { mapToBloggerViewModel } from '../mappers/map-to-blogger-view-model.util';

export async function getBloggerHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const blogger = await bloggersRepository.findById(id);

    if (!blogger) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorsMessages([{ field: 'id', message: 'Blogger not found' }]),
        );

      return;
    }

    const bloggerViewModel = mapToBloggerViewModel(blogger);
    res.status(HttpStatus.Ok).send(bloggerViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
