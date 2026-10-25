import { Request, Response } from 'express';
import { BloggerInputDto } from '../input/blogger-input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapBloggerInputToDto } from '../mappers/map-blogger-input-to-dto.util';
import { mapToBloggerOutput } from '../mappers/map-to-blogger-output.util';
import { bloggersService } from '../../application/bloggers.service';
import { Unsanitized } from '../../../core/types/unsanitized.input';
import { errorsHandler } from '../../../core/exceptions/errors.handler';

export async function createBloggerHandler(
  req: Request<{}, {}, Unsanitized<BloggerInputDto>>,
  res: Response,
) {
  try {
    const createdBlogger = await bloggersService.create(
      mapBloggerInputToDto(req.body),
    );

    const bloggerOutput = mapToBloggerOutput(createdBlogger);

    res.status(HttpStatus.Created).send(bloggerOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
