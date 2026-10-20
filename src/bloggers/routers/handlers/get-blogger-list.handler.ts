import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { bloggersRepository } from '../../repositories/bloggers.repository';
import { mapToBloggerViewModel } from '../mappers/map-to-blogger-view-model.util';

export async function getBloggerListHandler(req: Request, res: Response) {
  try {
    const bloggers = await bloggersRepository.findAll();
    // Наружу отдаём view-model, а не «сырой» документ из БД.
    const bloggerViewModels = bloggers.map(mapToBloggerViewModel);
    res.send(bloggerViewModels);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
