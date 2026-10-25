import { WithId } from 'mongodb';
import { PostQueryInput } from '../routers/input/post-query.input';
import { Post } from '../domain/post';
import { postsRepository } from '../repositories/posts.repository';
import { bloggersRepository } from '../../bloggers/repositories/bloggers.repository';
import { NotFoundException } from '../../core/exceptions/not-found.exception';
import {
  PostInputDto,
  PostInputDtoWithBlogId,
} from '../routers/input/post-input.dto';
import { mapPostInputDtoToPost } from '../routers/mappers/map-post-input-dto-to-post.util';
import { mapQueryInput } from '../routers/mappers/map-query-input.util';

export const postsService = {
  async findMany(
    queryInput: PostQueryInput,
    blogId?: string,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    if (blogId) {
      const blogger = await bloggersRepository.findById(blogId);

      if (!blogger) {
        throw new NotFoundException('Blogger not exist');
      }
    }

    return postsRepository.findMany(mapQueryInput(queryInput), blogId);
  },

  async findById(id: string): Promise<WithId<Post>> {
    const post = await postsRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not exist');
    }

    return post;
  },

  async create(blogId: string, inputDto: PostInputDto): Promise<WithId<Post>> {
    const blogger = await bloggersRepository.findById(blogId);

    if (!blogger) {
      throw new NotFoundException('Blogger not exist');
    }

    const newPost: Post = {
      ...mapPostInputDtoToPost(inputDto, blogger),
      createdAt: new Date(),
    };

    return postsRepository.create(newPost);
  },

  async update(id: string, inputDto: PostInputDtoWithBlogId): Promise<void> {
    const blogger = await bloggersRepository.findById(inputDto.blogId);

    if (!blogger) {
      throw new NotFoundException('Blogger not exist');
    }

    const isUpdated = await postsRepository.update(
      id,
      mapPostInputDtoToPost(inputDto, blogger),
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
