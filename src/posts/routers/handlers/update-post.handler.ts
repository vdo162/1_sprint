import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapUpdatePostInputToDto } from '../mappers/map-post-input-to-dto.util';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { PostUpdateInput } from '../input/post-update.dto';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostUpdateInput>,
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
