import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { Post } from '../../types/post';
import { postsRepository } from '../../repositories/posts.repository';
import { bloggersRepository } from '../../../bloggers/repositories/bloggers.repository';
import { PostInputDto } from '../../dto/post.input.dto';

export function updatePostHandler(
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response,
) {
  const blogger = bloggersRepository.findById(req.body.blogId);

  if (!blogger) {
    res
      .status(HttpStatus.BadRequest)
      .send(
        createErrorsMessages([
          { field: 'blogId', message: 'Blogger not found' },
        ]),
      );
    return;
  }

  const updatedPost: Omit<Post, 'id'> = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: blogger.id,
    blogName: blogger.name,
  };

  const isUpdated = postsRepository.update(req.params.id, updatedPost);

  if (!isUpdated) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorsMessages([{ field: 'id', message: 'Blogger not found' }]),
      );
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
}
