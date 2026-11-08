import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { commentsService } from '../../application/comments.service';
import { CommentInput } from '../input/comment.dto';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';
import { mapCommentInputToDto } from '../mappers/map-comment-input-to-dto.util';

export async function updateCommentHandler(
  req: Request<{ id: string }, {}, CommentInput>,
  res: Response,
) {
  try {
    const userId = req.userId as string;
    const id = req.params.id;

    const result = await commentsService.update(
      id,
      userId,
      mapCommentInputToDto(req.body),
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
