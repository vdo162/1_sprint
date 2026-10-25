import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostInputDtoWithBlogId } from '../input/post-input.dto';
import { Unsanitized } from '../../../core/types/unsanitized.input';
import { mapUpdatePostInputToDto } from '../mappers/map-post-input-to-dto.util';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, Unsanitized<PostInputDtoWithBlogId>>,
  res: Response,
) {
  try {
    const id = req.params.id;

    await postsService.update(id, mapUpdatePostInputToDto(req.body));

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
