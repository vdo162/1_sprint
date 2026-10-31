import { PostCreateDto } from '../input/post-create.dto';
import { Post } from '../../domain/post';
import { BlogOutput } from '../../../blogs/routers/output/blog.output';

export function mapPostDtoToPost(
  dto: PostCreateDto,
  blog: BlogOutput,
): Omit<Post, 'createdAt'> {
  return {
    title: dto.title,
    shortDescription: dto.shortDescription,
    content: dto.content,
    blog: {
      id: blog.id,
      name: blog.name,
    },
  };
}
