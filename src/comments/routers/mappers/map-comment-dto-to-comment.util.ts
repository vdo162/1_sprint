import { CommentDto } from '../input/comment.dto';
import { Comment } from '../../domain/comment';
import { User } from '../../../users/domain/user';
import { WithId } from 'mongodb';
import { Post } from '../../../posts/domain/post';

export function mapCommentDtoToComment(
  dto: CommentDto,
  user: WithId<User>,
  post: WithId<Post>,
): Omit<Comment, 'createdAt'> {
  return {
    content: dto.content,
    commentatorInfo: {
      userId: user._id.toString(),
      userLogin: user.login,
    },
    post: {
      id: post._id.toString(),
    },
  };
}
