import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { CommentQueryParams } from '../../../comments/routers/input/comment-query-params';
import { postsQueryRepository } from '../../repositories/posts.query.repository';
import { sendErrorResult } from '../../../core/result/send-error-result';
import { notFoundResult } from '../../../core/result/result';
import { commentsQueryRepository } from '../../../comments/repositories/comments.query.repository';
import { mapCommentsQueryParams } from '../../../comments/routers/mappers/map-comments-query-params.util';

export async function getPostCommentListHandler(
  req: Request<{ id: string }, {}, {}, CommentQueryParams>,
  res: Response,
) {
  try {
    const postId = req.params.id;
    const queryParams = req.query;

    const post = await postsQueryRepository.findById(postId);

    if (!post) {
      sendErrorResult(notFoundResult('Post not exist'), res);
      return;
    }

    const comments = await commentsQueryRepository.findMany(
      mapCommentsQueryParams(queryParams),
      postId,
    );

    res.status(HttpStatus.Ok).send(comments);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
