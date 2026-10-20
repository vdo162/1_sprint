import { WithId } from 'mongodb';
import { Blogger } from '../../../bloggers/types/blogger';
import { PostInputDto } from '../../dto/post.input.dto';
import { Post } from '../../types/post';

export function mapPostInputDtoToPost(
  dto: PostInputDto,
  blogger: WithId<Blogger>,
): Omit<Post, 'createdAt'> {
  return {
    title: dto.title,
    shortDescription: dto.shortDescription,
    content: dto.content,
    blog: {
      id: blogger._id.toString(),
      name: blogger.name,
    },
  };
}
