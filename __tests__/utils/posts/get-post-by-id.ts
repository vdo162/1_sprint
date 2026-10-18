import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { Post } from '../../../src/posts/types/post';
import { POSTS_PATH } from '../../../src/posts/constants/posts.paths';

export async function getPostById(app: Express, postId: string): Promise<Post> {
  const postResponse = await request(app)
    .get(`${POSTS_PATH}/${postId}`)
    .expect(HttpStatus.Ok);

  return postResponse.body;
}
