import { Unsanitized } from '../../../core/types/unsanitized.input';

export type PostCreateDto = {
  title: string;
  shortDescription: string;
  content: string;
};

export type PostCreateInput = Unsanitized<PostCreateDto>;
