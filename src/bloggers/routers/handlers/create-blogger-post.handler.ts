import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Unsanitized } from '../../../core/types/unsanitized.input';
import { PostInputDto } from '../../../posts/routers/input/post-input.dto';
import { postsService } from '../../../posts/application/posts.service';
import { mapCreatePostInputToDto } from '../../../posts/routers/mappers/map-post-input-to-dto.util';
import { mapToPostOutput } from '../../../posts/routers/mappers/map-to-post-output.util';
import { errorsHandler } from '../../../core/exceptions/errors.handler';

export async function createBloggerPostHandler(
  req: Request<{ id: string }, {}, Unsanitized<PostInputDto>>,
  res: Response,
) {
  try {
    const bloggerId = req.params.id;

    const createdPost = await postsService.create(
      bloggerId,
      mapCreatePostInputToDto(req.body),
    );

    const postOutput = mapToPostOutput(createdPost);

    res.status(HttpStatus.Created).send(postOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
