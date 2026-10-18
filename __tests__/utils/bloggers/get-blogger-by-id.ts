import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { Blogger } from '../../../src/bloggers/types/blogger';
import { BLOGGERS_PATH } from '../../../src/bloggers/constants/bloggers.paths';

export async function getBloggerById(
  app: Express,
  bloggerId: string,
): Promise<Blogger> {
  const bloggerResponse = await request(app)
    .get(`${BLOGGERS_PATH}/${bloggerId}`)
    .expect(HttpStatus.Ok);

  return bloggerResponse.body;
}
