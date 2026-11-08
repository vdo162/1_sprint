import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapUpdatePostInputToDto } from '../mappers/map-post-input-to-dto.util';
import { postsService } from '../../application/posts.service';
import { PostUpdateInput } from '../input/post-update.dto';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostUpdateInput>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const result = await postsService.update(
      id,
      mapUpdatePostInputToDto(req.body),
    );

    if (result.status !== ResultStatus.Success) {
      sendErrorResult(result, res);
      return;
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
