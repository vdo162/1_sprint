import { Request, Response } from 'express';
import { BloggerInputDto } from '../input/blogger-input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapBloggerInputToDto } from '../mappers/map-blogger-input-to-dto.util';
import { Unsanitized } from '../../../core/types/unsanitized.input';
import { bloggersService } from '../../application/bloggers.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';

export async function updateBloggerHandler(
  req: Request<{ id: string }, {}, Unsanitized<BloggerInputDto>>,
  res: Response,
) {
  try {
    const id = req.params.id;

    await bloggersService.update(id, mapBloggerInputToDto(req.body));

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
