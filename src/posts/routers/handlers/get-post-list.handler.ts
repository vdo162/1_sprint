import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';

export async function getPostListHandler(req: Request, res: Response) {
  try {
    const posts = await postsRepository.findAll();

    // Наружу отдаём view-model, а не «сырой» документ из БД.
    const postViewModels = posts.map(mapToPostViewModel);
    res.send(postViewModels);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
