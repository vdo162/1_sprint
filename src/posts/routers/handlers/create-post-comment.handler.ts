import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { CommentInput } from '../../../comments/routers/input/comment.dto';
import { commentsService } from '../../../comments/application/comments.service';
import { mapCommentInputToDto } from '../../../comments/routers/mappers/map-comment-input-to-dto.util';
import { commentsQueryRepository } from '../../../comments/repositories/comments.query.repository';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';

export async function createPostCommentHandler(
  req: Request<{ id: string }, {}, CommentInput>,
  res: Response,
) {
  try {
    const postId = req.params.id;
    const userId = req.userId as string;

    const result = await commentsService.create(
      postId,
      userId,
      mapCommentInputToDto(req.body),
    );

    if (result.status !== ResultStatus.Success) {
      sendErrorResult(result, res);
      return;
    }

    const createdComment = await commentsQueryRepository.findById(result.data);

    res.status(HttpStatus.Created).send(createdComment);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
