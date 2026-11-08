import { PostCreateDto } from '../input/post-create.dto';
import { Post } from '../../domain/post';
import { WithId } from 'mongodb';
import { Blog } from '../../../blogs/domain/blog';

export function mapPostDtoToPost(
  dto: PostCreateDto,
  blog: WithId<Blog>,
): Omit<Post, 'createdAt'> {
  return {
    title: dto.title,
    shortDescription: dto.shortDescription,
    content: dto.content,
    blog: {
      id: blog._id.toString(),
      name: blog.name,
    },
  };
}
