import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';

export async function getPostsHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const post = await postsRepository.findById(id);

    if (!post) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorsMessages([{ field: 'id', message: 'Post not found' }]),
        );

      return;
    }

    const postViewModel = mapToPostViewModel(post);

    res.send(postViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
