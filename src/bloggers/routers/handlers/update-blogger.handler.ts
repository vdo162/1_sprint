import { Request, Response } from 'express';
import { BloggersInputDto } from '../../dto/bloggers.input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { bloggersRepository } from '../../repositories/bloggers.repository';
import { mapBloggerInputDtoToBlogger } from '../mappers/map-blogger-input-dto-to-blogger.util';

export async function updateBloggerHandler(
  req: Request<{ id: string }, {}, BloggersInputDto>,
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

    // В репозиторий передаём доменный объект (проекцию DTO), а не сам DTO.
    await bloggersRepository.update(id, mapBloggerInputDtoToBlogger(req.body));
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
