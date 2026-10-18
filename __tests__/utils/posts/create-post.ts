import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { PostInputDto } from '../../../src/posts/dto/post.input.dto';
import { Post } from '../../../src/posts/types/post';
import { POSTS_PATH } from '../../../src/posts/constants/posts.paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { createBlogger } from '../bloggers/create-blogger';
import { getPostDto } from './get-post-dto';

export async function createPost(
  app: Express,
  postDto?: PostInputDto,
): Promise<Post> {
  const blogId = postDto?.blogId ?? (await createBlogger(app)).id;
  const testPostData: PostInputDto = { ...getPostDto(blogId), ...postDto };

  const createdPostResponse = await request(app)
    .post(POSTS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testPostData)
    .expect(HttpStatus.Created);

  return createdPostResponse.body;
}
