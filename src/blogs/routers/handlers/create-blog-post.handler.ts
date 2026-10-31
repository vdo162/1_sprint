import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostCreateInput } from '../../../posts/routers/input/post-create.dto';
import { postsService } from '../../../posts/application/posts.service';
import { mapCreatePostInputToDto } from '../../../posts/routers/mappers/map-post-input-to-dto.util';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { postsQueryRepository } from '../../../posts/repositories/posts.query.repository';

export async function createBlogPostHandler(
  req: Request<{ id: string }, {}, PostCreateInput>,
  res: Response,
) {
  try {
    const blogId = req.params.id;

    const createdPostId = await postsService.create(
      blogId,
      mapCreatePostInputToDto(req.body),
    );

    const createdPost = await postsQueryRepository.findById(createdPostId);

    res.status(HttpStatus.Created).send(createdPost);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
