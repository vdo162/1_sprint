import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapBlogInputToDto } from '../mappers/map-blog-input-to-dto.util';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { BlogInput } from '../input/blog.dto';

export async function updateBlogHandler(
  req: Request<{ id: string }, {}, BlogInput>,
  res: Response,
) {
  try {
    const id = req.params.id;

    await blogsService.update(id, mapBlogInputToDto(req.body));

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
