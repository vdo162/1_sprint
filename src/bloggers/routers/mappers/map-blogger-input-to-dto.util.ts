import { BloggerInputDto } from '../input/blogger-input.dto';
import { Unsanitized } from '../../../core/types/unsanitized.input';

export function mapBloggerInputToDto(
  dto: Unsanitized<BloggerInputDto>,
): BloggerInputDto {
  return {
    name: dto.name,
    description: dto.description,
    websiteUrl: dto.websiteUrl,
  };
}
