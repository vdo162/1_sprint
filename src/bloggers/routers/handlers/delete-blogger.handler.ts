import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { bloggersService } from '../../application/bloggers.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';

export async function deleteBloggerHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    await bloggersService.delete(id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
