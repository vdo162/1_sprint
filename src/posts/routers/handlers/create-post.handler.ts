import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';
import { mapCreatePostInputToDto } from '../mappers/map-post-input-to-dto.util';
import { postsQueryRepository } from '../../repositories/posts.query.repository';
import { PostCreateInput } from '../input/post-create.dto';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';

export async function createPostHandler(
  req: Request<{}, {}, PostCreateInput>,
  res: Response,
) {
  try {
    const blogId = req.body.blogId;

    const result = await postsService.create(
      blogId,
      mapCreatePostInputToDto(req.body),
    );

    if (result.status !== ResultStatus.Success) {
      sendErrorResult(result, res);
      return;
    }

    const createdPost = await postsQueryRepository.findById(result.data);

    res.status(HttpStatus.Created).send(createdPost);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
