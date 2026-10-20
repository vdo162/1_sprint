import { Request, Response } from 'express';
import { PostInputDto } from '../../dto/post.input.dto';
import { bloggersRepository } from '../../../bloggers/repositories/bloggers.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorsMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { postsRepository } from '../../repositories/posts.repository';
import { Post } from '../../types/post';
import { mapPostInputDtoToPost } from '../mappers/map-post-input-dto-to-post.util';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';

export async function createPostHandler(
  req: Request<{}, {}, PostInputDto>,
  res: Response,
) {
  try {
    const bloggerId = req.body.blogId;
    const blogger = await bloggersRepository.findById(bloggerId);

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

    const newPost: Post = {
      ...mapPostInputDtoToPost(req.body, blogger),
      createdAt: new Date(),
    };

    const createdPost = await postsRepository.create(newPost);
    const postViewModel = mapToPostViewModel(createdPost);

    res.status(HttpStatus.Created).send(postViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
