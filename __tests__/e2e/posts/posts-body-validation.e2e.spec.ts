import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { clearDb } from '../../utils/clear-db';
import { POSTS_PATH } from '../../../src/posts/constants/posts.paths';
import { PostInputDto } from '../../../src/posts/dto/post.input.dto';
import { createBlogger } from '../../utils/bloggers/create-blogger';
import { createPost } from '../../utils/posts/create-post';
import { getPostDto } from '../../utils/posts/get-post-dto';
import { getPostById } from '../../utils/posts/get-post-by-id';

const postLengthBoundaries: Array<{
  field: keyof Pick<PostInputDto, 'title' | 'shortDescription' | 'content'>;
  min: number;
  max: number;
}> = [
  { field: 'title', min: 3, max: 30 },
  { field: 'shortDescription', min: 3, max: 100 },
  { field: 'content', min: 3, max: 1000 },
];

describe('Post API body validation', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateBasicAuthToken();

  beforeEach(async () => {
    await clearDb(app);
  });

  it('returns 401 when creating a post without auth', async () => {
    await request(app)
      .post(POSTS_PATH)
      .send({})
      .expect(HttpStatus.Unauthorized);
  });

  it('rejects an invalid create body and does not create a post', async () => {
    const blogger = await createBlogger(app);
    const validPostData: PostInputDto = getPostDto(blogger.id);

    const response = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...validPostData,
        title: ' ',
        shortDescription: ' ',
        content: ' ',
      })
      .expect(HttpStatus.BadRequest);

    expect(response.body.errorsMessages).toHaveLength(3);

    const postListResponse = await request(app)
      .get(POSTS_PATH)
      .expect(HttpStatus.Ok);
    expect(postListResponse.body).toHaveLength(0);
  });

  it('rejects an invalid blogId type', async () => {
    const blogger = await createBlogger(app);

    const response = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', adminToken)
      .send({ ...getPostDto(blogger.id), blogId: 123 })
      .expect(HttpStatus.BadRequest);

    expect(response.body.errorsMessages).toEqual([
      { field: 'blogId', message: 'blogId must be string' },
    ]);
  });

  it('rejects an invalid update body without changing the post', async () => {
    const post = await createPost(app);

    const response = await request(app)
      .put(`${POSTS_PATH}/${post.id}`)
      .set('Authorization', adminToken)
      .send({
        ...getPostDto(post.blogId),
        title: ' ',
      })
      .expect(HttpStatus.BadRequest);

    expect(response.body.errorsMessages).toHaveLength(1);
    expect(await getPostById(app, post.id)).toEqual(post);
  });

  it.each(postLengthBoundaries)(
    'accepts $field at minimum and maximum lengths',
    async ({ field, min, max }) => {
      const blogger = await createBlogger(app);

      for (const length of [min, max]) {
        await request(app)
          .post(POSTS_PATH)
          .set('Authorization', adminToken)
          .send({
            ...getPostDto(blogger.id),
            [field]: 'x'.repeat(length),
          })
          .expect(HttpStatus.Created);
      }
    },
  );

  it.each(postLengthBoundaries)(
    'rejects $field below minimum length',
    async ({ field, min }) => {
      const blogger = await createBlogger(app);
      const response = await request(app)
        .post(POSTS_PATH)
        .set('Authorization', adminToken)
        .send({ ...getPostDto(blogger.id), [field]: 'x'.repeat(min - 1) })
        .expect(HttpStatus.BadRequest);

      expect(response.body.errorsMessages).toEqual([
        expect.objectContaining({ field }),
      ]);
    },
  );

  it.each(postLengthBoundaries)(
    'rejects $field above maximum length',
    async ({ field, max }) => {
      const blogger = await createBlogger(app);
      const response = await request(app)
        .post(POSTS_PATH)
        .set('Authorization', adminToken)
        .send({ ...getPostDto(blogger.id), [field]: 'x'.repeat(max + 1) })
        .expect(HttpStatus.BadRequest);

      expect(response.body.errorsMessages).toEqual([
        expect.objectContaining({ field }),
      ]);
    },
  );
});
