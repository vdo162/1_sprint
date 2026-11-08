import { Comment } from '../domain/comment';
import { commentsRepository } from '../repositories/comments.repository';
import { CommentDto } from '../routers/input/comment.dto';
import { mapCommentDtoToComment } from '../routers/mappers/map-comment-dto-to-comment.util';
import { postsRepository } from '../../posts/repositories/posts.repository';
import {
  forbiddenResult,
  notFoundResult,
  Result,
  successResult,
} from '../../core/result/result';
import { usersRepository } from '../../users/repositories/users.repository';

export const commentsService = {
  async create(
    postId: string,
    userId: string,
    dto: CommentDto,
  ): Promise<Result<string>> {
    const user = await usersRepository.findById(userId);

    if (!user) {
      return notFoundResult('User not exist');
    }

    const post = await postsRepository.findById(postId);

    if (!post) {
      return notFoundResult('Post not exist');
    }

    const newComment: Comment = {
      ...mapCommentDtoToComment(dto, user, post),
      createdAt: new Date(),
    };

    const createdCommentId = await commentsRepository.create(newComment);

    return successResult(createdCommentId);
  },

  async update(id: string, userId: string, dto: CommentDto): Promise<Result> {
    const comment = await commentsRepository.findById(id);

    if (!comment) {
      return notFoundResult('Comment not exist');
    }

    if (comment.commentatorInfo.userId !== userId) {
      return forbiddenResult('Forbidden');
    }

    const isUpdated = await commentsRepository.update(id, dto);

    if (!isUpdated) {
      return notFoundResult('Comment not exist');
    }

    return successResult(null);
  },

  async delete(id: string, userId: string): Promise<Result> {
    const comment = await commentsRepository.findById(id);

    if (!comment) {
      return notFoundResult('Comment not exist');
    }

    if (comment.commentatorInfo.userId !== userId) {
      return forbiddenResult('Forbidden');
    }

    const isDeleted = await commentsRepository.delete(id);

    if (!isDeleted) {
      return notFoundResult('Comment not exist');
    }

    return successResult(null);
  },
};
