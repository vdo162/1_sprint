import { Request, Response } from 'express';
import { PostInputDtoWithBlogId } from '../input/post-input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToPostOutput } from '../mappers/map-to-post-output.util';
import { Unsanitized } from '../../../core/types/unsanitized.input';
import { postsService } from '../../application/posts.service';
import { mapCreatePostInputToDto } from '../mappers/map-post-input-to-dto.util';
import { errorsHandler } from '../../../core/exceptions/errors.handler';

export async function createPostHandler(
  req: Request<{}, {}, Unsanitized<PostInputDtoWithBlogId>>,
  res: Response,
) {
  try {
    const bloggerId = req.body.blogId;

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
