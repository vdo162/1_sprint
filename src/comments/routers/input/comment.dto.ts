import { Unsanitized } from '../../../core/types/unsanitized.input';

export type CommentDto = {
  content: string;
};

export type CommentInput = Unsanitized<CommentDto>;
