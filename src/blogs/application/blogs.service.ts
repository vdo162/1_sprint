import { NotFoundException } from '../../core/exceptions/not-found.exception';
import { blogsRepository } from '../repositories/blogs.repository';
import { Blog } from '../domain/blog';
import { BlogDto } from '../routers/input/blog.dto';

export const blogsService = {
  async create(dto: BlogDto): Promise<string> {
    const newBlog: Blog = {
      ...dto,
      isMembership: false,
      createdAt: new Date(),
    };

    return blogsRepository.create(newBlog);
  },

  async update(id: string, dto: BlogDto): Promise<void> {
    const isUpdated = await blogsRepository.update(id, dto);

    if (!isUpdated) {
      throw new NotFoundException('Blog not exist');
    }

    return;
  },

  async delete(id: string): Promise<void> {
    const isDeleted = await blogsRepository.delete(id);

    if (!isDeleted) {
      throw new NotFoundException('Blog not exist');
    }

    return;
  },
};
