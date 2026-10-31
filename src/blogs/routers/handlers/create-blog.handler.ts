import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapBlogInputToDto } from '../mappers/map-blog-input-to-dto.util';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { blogsQueryRepository } from '../../repositories/blogs.query.repository';
import { BlogInput } from '../input/blog.dto';

export async function createBlogHandler(
  req: Request<{}, {}, BlogInput>,
  res: Response,
) {
  try {
    const createdBlogId = await blogsService.create(
      mapBlogInputToDto(req.body),
    );

    const createdBlog = await blogsQueryRepository.findById(createdBlogId);

    res.status(HttpStatus.Created).send(createdBlog);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
