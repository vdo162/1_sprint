import { WithId } from 'mongodb';
import { BloggerQueryInput } from '../routers/input/blogger-query.input';
import { NotFoundException } from '../../core/exceptions/not-found.exception';
import { bloggersRepository } from '../repositories/bloggers.repository';
import { Blogger } from '../domain/blogger';
import { BloggerInputDto } from '../routers/input/blogger-input.dto';

export const bloggersService = {
  async findMany(
    queryInput: BloggerQueryInput,
  ): Promise<{ items: WithId<Blogger>[]; totalCount: number }> {
    return bloggersRepository.findMany(queryInput);
  },

  async findById(id: string): Promise<WithId<Blogger>> {
    const blogger = await bloggersRepository.findById(id);

    if (!blogger) {
      throw new NotFoundException('Blogger not exist');
    }

    return blogger;
  },

  async create(inputDto: BloggerInputDto): Promise<WithId<Blogger>> {
    const newBlogger: Blogger = {
      ...inputDto,
      isMembership: false,
      createdAt: new Date(),
    };

    return bloggersRepository.create(newBlogger);
  },

  async update(id: string, inputDto: BloggerInputDto): Promise<void> {
    const isUpdated = await bloggersRepository.update(id, inputDto);

    if (!isUpdated) {
      throw new NotFoundException('Blogger not exist');
    }

    return;
  },

  async delete(id: string): Promise<void> {
    const isDeleted = await bloggersRepository.delete(id);

    if (!isDeleted) {
      throw new NotFoundException('Blogger not exist');
    }

    return;
  },
};
