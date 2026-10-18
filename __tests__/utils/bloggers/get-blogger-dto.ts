import { BloggersInputDto } from '../../../src/bloggers/dto/bloggers.input.dto';

export function getBloggerDto(): BloggersInputDto {
  return {
    name: 'Test Blogger',
    description: 'Test blogger description',
    websiteUrl: 'https://example.com',
  };
}
