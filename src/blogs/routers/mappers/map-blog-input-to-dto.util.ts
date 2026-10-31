import { BlogDto, BlogInput } from '../input/blog.dto';

export function mapBlogInputToDto(blogInput: BlogInput): BlogDto {
  return {
    name: blogInput.name,
    description: blogInput.description,
    websiteUrl: blogInput.websiteUrl,
  };
}
