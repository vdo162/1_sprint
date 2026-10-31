import { PostCreateDto, PostCreateInput } from '../input/post-create.dto';
import { PostUpdateDto, PostUpdateInput } from '../input/post-update.dto';

export function mapCreatePostInputToDto(
  postInput: PostCreateInput,
): PostCreateDto {
  return {
    title: postInput.title,
    shortDescription: postInput.shortDescription,
    content: postInput.content,
  };
}

export function mapUpdatePostInputToDto(
  postInput: PostUpdateInput,
): PostUpdateDto {
  return {
    title: postInput.title,
    shortDescription: postInput.shortDescription,
    content: postInput.content,
    blogId: postInput.blogId,
  };
}
