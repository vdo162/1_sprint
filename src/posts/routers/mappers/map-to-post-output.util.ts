import { WithId } from 'mongodb';
import { PostDataOutput } from '../output/post-data.output';
import { Post } from '../../domain/post';

export function mapToPostOutput(post: WithId<Post>): PostDataOutput {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blog.id,
    blogName: post.blog.name,
    createdAt: post.createdAt,
  };
}
