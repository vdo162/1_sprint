import { WithId } from 'mongodb';
import { CommentOutput } from '../output/comment.output';
import { Comment } from '../../domain/comment';

export function mapToCommentOutput(comment: WithId<Comment>): CommentOutput {
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: comment.commentatorInfo,
    createdAt: comment.createdAt,
  };
}
