import { Request, Response } from 'express';
import { BloggersInputDto } from '../../dto/bloggers.input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Blogger } from '../../types/blogger';
import { bloggersRepository } from '../../repositories/bloggers.repository';

export function createBloggerHandler(
  req: Request<{}, {}, BloggersInputDto>,
  res: Response,
) {
  const newBlogger: Omit<Blogger, 'id'> = {
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  };

  const createdBlogger = bloggersRepository.create(newBlogger);
  res.status(HttpStatus.Created).send(createdBlogger);
}
