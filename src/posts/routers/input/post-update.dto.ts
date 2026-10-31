import { PostCreateDto } from './post-create.dto';
import { Unsanitized } from '../../../core/types/unsanitized.input';

export type PostUpdateDto = PostCreateDto & {
  blogId: string;
};

export type PostUpdateInput = Unsanitized<PostUpdateDto>;
