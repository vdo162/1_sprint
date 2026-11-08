import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostCreateInput } from '../../../posts/routers/input/post-create.dto';
import { postsService } from '../../../posts/application/posts.service';
import { mapCreatePostInputToDto } from '../../../posts/routers/mappers/map-post-input-to-dto.util';
import { postsQueryRepository } from '../../../posts/repositories/posts.query.repository';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';

export async function createBlogPostHandler(
  req: Request<{ id: string }, {}, PostCreateInput>,
  res: Response,
) {
  try {
    const blogId = req.params.id;

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
