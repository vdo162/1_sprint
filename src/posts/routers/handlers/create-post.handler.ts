import { Request, Response } from 'express';
import { PostInputDto } from '../../dto/post.input.dto';
import { bloggersRepository } from '../../../bloggers/repositories/bloggers.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { postsRepository } from '../../repositories/posts.repository';
import { Post } from '../../types/post';

export function createPostHandler(
  req: Request<{}, {}, PostInputDto>,
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

  const newPost: Omit<Post, 'id'> = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: blogger.id,
    blogName: blogger.name,
  };

  const createdPost = postsRepository.create(newPost);
  res.status(HttpStatus.Created).send(createdPost);
}
