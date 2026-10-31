import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';
import { mapCreatePostInputToDto } from '../mappers/map-post-input-to-dto.util';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { postsQueryRepository } from '../../repositories/posts.query.repository';
import { PostCreateInput } from '../input/post-create.dto';

export async function createPostHandler(
  req: Request<{}, {}, PostCreateInput>,
  res: Response,
) {
  try {
    const blogId = req.body.blogId;

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
