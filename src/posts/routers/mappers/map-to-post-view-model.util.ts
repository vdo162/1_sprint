import { WithId } from 'mongodb';
import { PostViewModel } from '../../types/post-view-model';
import { Post } from '../../types/post';

export function mapToPostViewModel(post: WithId<Post>): PostViewModel {
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
