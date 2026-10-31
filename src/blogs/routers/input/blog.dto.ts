import { Unsanitized } from '../../../core/types/unsanitized.input';

export type BlogDto = {
  name: string;
  description: string;
  websiteUrl: string;
};

export type BlogInput = Unsanitized<BlogDto>;
