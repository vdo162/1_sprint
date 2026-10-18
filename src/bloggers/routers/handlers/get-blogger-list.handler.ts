import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { bloggersRepository } from '../../repositories/bloggers.repository';

export function getBloggerListHandler(req: Request, res: Response) {
  res.status(HttpStatus.Ok).send(bloggersRepository.findAll());
}
