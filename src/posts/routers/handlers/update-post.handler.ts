import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { postsRepository } from '../../repositories/posts.repository';
import { bloggersRepository } from '../../../bloggers/repositories/bloggers.repository';
import { PostInputDto } from '../../dto/post.input.dto';
import { mapPostInputDtoToPost } from '../mappers/map-post-input-dto-to-post.util';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response,
) {
  try {
    const bloggerId = req.body.blogId;
    const blogger = await bloggersRepository.findById(bloggerId);

    if (!blogger) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorsMessages([{ field: 'id', message: 'Blogger not found' }]),
        );
      return;
    }

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

    await postsRepository.update(id, mapPostInputDtoToPost(req.body, blogger));
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
