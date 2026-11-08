import { Post } from '../domain/post';
import { postsRepository } from '../repositories/posts.repository';
import { PostCreateDto } from '../routers/input/post-create.dto';
import { mapPostDtoToPost } from '../routers/mappers/map-post-dto-to-post.util';
import { PostUpdateDto } from '../routers/input/post-update.dto';
import { blogsRepository } from '../../blogs/repositories/blogs.repository';
import {
  notFoundResult,
  Result,
  successResult,
} from '../../core/result/result';

export const postsService = {
  async create(blogId: string, dto: PostCreateDto): Promise<Result<string>> {
    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      return notFoundResult('Blog not exist');
    }

    const newPost: Post = {
      ...mapPostDtoToPost(dto, blog),
      createdAt: new Date(),
    };

    const createdPostId = await postsRepository.create(newPost);

    return successResult(createdPostId);
  },

  async update(id: string, dto: PostUpdateDto): Promise<Result> {
    const blog = await blogsRepository.findById(dto.blogId);

    if (!blog) {
      return notFoundResult('Blog not exist');
    }

    const isUpdated = await postsRepository.update(
      id,
      mapPostDtoToPost(dto, blog),
    );

    if (!isUpdated) {
      return notFoundResult('Post not exist');
    }

    return successResult(null);
  },

  async delete(id: string): Promise<Result> {
    const isDeleted = await postsRepository.delete(id);

    if (!isDeleted) {
      return notFoundResult('Post not exist');
    }

    return successResult(null);
  },
};
