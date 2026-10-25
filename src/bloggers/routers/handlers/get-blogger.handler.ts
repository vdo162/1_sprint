import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBloggerOutput } from '../mappers/map-to-blogger-output.util';
import { bloggersService } from '../../application/bloggers.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';

export async function getBloggerHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const blogger = await bloggersService.findById(id);

    const bloggerOutput = mapToBloggerOutput(blogger);

    res.status(HttpStatus.Ok).send(bloggerOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
