import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BLOGGERS_PATH } from '../../../src/bloggers/constants/bloggers.paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';

export async function deleteBlogger(
  app: Express,
  bloggerId: string,
): Promise<void> {
  await request(app)
    .delete(`${BLOGGERS_PATH}/${bloggerId}`)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.NoContent);
}
