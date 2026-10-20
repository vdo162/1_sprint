import { Blogger } from '../../types/blogger';
import { BloggersInputDto } from '../../dto/bloggers.input.dto';

export function mapBloggerInputDtoToBlogger(
  dto: BloggersInputDto,
): Omit<Blogger, 'isMembership' | 'createdAt'> {
  return {
    name: dto.name,
    description: dto.description,
    websiteUrl: dto.websiteUrl,
  };
}
