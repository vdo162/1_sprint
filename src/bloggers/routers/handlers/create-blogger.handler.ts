import { Request, Response } from 'express';
import { BloggersInputDto } from '../../dto/bloggers.input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Blogger } from '../../types/blogger';
import { bloggersRepository } from '../../repositories/bloggers.repository';
import { mapBloggerInputDtoToBlogger } from '../mappers/map-blogger-input-dto-to-blogger.util';
import { mapToBloggerViewModel } from '../mappers/map-to-blogger-view-model.util';

export async function createBloggerHandler(
  req: Request<{}, {}, BloggersInputDto>,
  res: Response,
) {
  try {
    // Проекция DTO -> доменная модель; дату создания добавляем здесь.
    const newBlogger: Blogger = {
      ...mapBloggerInputDtoToBlogger(req.body),
      isMembership: false,
      createdAt: new Date(),
    };

    const createdBlogger = await bloggersRepository.create(newBlogger);
    const bloggerViewModel = mapToBloggerViewModel(createdBlogger);
    res.status(HttpStatus.Created).send(bloggerViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
