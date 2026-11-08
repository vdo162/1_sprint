import { CommentDto, CommentInput } from '../input/comment.dto';

export function mapCommentInputToDto(commentInput: CommentInput): CommentDto {
  return {
    content: commentInput.content,
  };
}
