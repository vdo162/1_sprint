import { Post } from '../domain/post';
import { postsRepository } from '../repositories/posts.repository';
import { NotFoundException } from '../../core/exceptions/not-found.exception';
import { PostCreateDto } from '../routers/input/post-create.dto';
import { mapPostDtoToPost } from '../routers/mappers/map-post-dto-to-post.util';
import { PostUpdateDto } from '../routers/input/post-update.dto';
import { blogsRepository } from '../../blogs/repositories/blogs.repository';

export const postsService = {
  async create(blogId: string, dto: PostCreateDto): Promise<string> {
    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      throw new NotFoundException('Blog not exist');
    }

    const newPost: Post = {
      ...mapPostDtoToPost(dto, blog),
      createdAt: new Date(),
    };

    return postsRepository.create(newPost);
  },

  async update(id: string, dto: PostUpdateDto): Promise<void> {
    const blog = await blogsRepository.findById(dto.blogId);

    if (!blog) {
      throw new NotFoundException('Blog not exist');
    }

    const isUpdated = await postsRepository.update(
      id,
      mapPostDtoToPost(dto, blog),
    );

    if (!isUpdated) {
      throw new NotFoundException('Post not exist');
    }

    return;
  },

  async delete(id: string): Promise<void> {
    const isDeleted = await postsRepository.delete(id);

    if (!isDeleted) {
      throw new NotFoundException('Post not exist');
    }

    return;
  },
};
