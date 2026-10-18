import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BloggersInputDto } from '../../../src/bloggers/dto/bloggers.input.dto';
import { BLOGGERS_PATH } from '../../../src/bloggers/constants/bloggers.paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { getBloggerDto } from './get-blogger-dto';

export async function updateBlogger(
  app: Express,
  bloggerId: string,
  bloggerDto?: BloggersInputDto,
): Promise<void> {
  const testBloggerData: BloggersInputDto = {
    ...getBloggerDto(),
    ...bloggerDto,
  };

  await request(app)
    .put(`${BLOGGERS_PATH}/${bloggerId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testBloggerData)
    .expect(HttpStatus.NoContent);
}
