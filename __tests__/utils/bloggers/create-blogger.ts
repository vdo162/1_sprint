import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BloggersInputDto } from '../../../src/bloggers/dto/bloggers.input.dto';
import { Blogger } from '../../../src/bloggers/types/blogger';
import { BLOGGERS_PATH } from '../../../src/bloggers/constants/bloggers.paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { getBloggerDto } from './get-blogger-dto';

export async function createBlogger(
  app: Express,
  bloggerDto?: BloggersInputDto,
): Promise<Blogger> {
  const testBloggerData: BloggersInputDto = {
    ...getBloggerDto(),
    ...bloggerDto,
  };

  const createdBloggerResponse = await request(app)
    .post(BLOGGERS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testBloggerData)
    .expect(HttpStatus.Created);

  return createdBloggerResponse.body;
}
