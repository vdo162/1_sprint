import { PostInputDto, PostInputDtoWithBlogId } from '../input/post-input.dto';
import { Unsanitized } from '../../../core/types/unsanitized.input';

export function mapCreatePostInputToDto(
  dto: Unsanitized<PostInputDto>,
): PostInputDto {
  return {
    title: dto.title,
    shortDescription: dto.shortDescription,
    content: dto.content,
  };
}

export function mapUpdatePostInputToDto(
  dto: Unsanitized<PostInputDtoWithBlogId>,
): PostInputDtoWithBlogId {
  return {
    title: dto.title,
    shortDescription: dto.shortDescription,
    content: dto.content,
    blogId: dto.blogId,
  };
}
