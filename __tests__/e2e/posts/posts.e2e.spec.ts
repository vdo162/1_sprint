import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { POSTS_PATH } from '../../../src/posts/constants/posts.paths';
import { PostInputDto } from '../../../src/posts/dto/post.input.dto';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { clearDb } from '../../utils/clear-db';
import { createPost } from '../../utils/posts/create-post';
import { getPostDto } from '../../utils/posts/get-post-dto';
import { getPostById } from '../../utils/posts/get-post-by-id';
import { updatePost } from '../../utils/posts/update-post';
import { deletePost } from '../../utils/posts/delete-post';

describe('Posts API', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateBasicAuthToken();

  beforeEach(async () => {
    await clearDb(app);
  });

  it('creates a post', async () => {
    const post = await createPost(app);

    expect(post).toEqual({
      ...getPostDto(post.blogId),
      id: expect.any(String),
      blogName: expect.any(String),
    });
  });

  it('returns the post list', async () => {
    const firstPost = await createPost(app);
    const secondPost = await createPost(app, {
      ...getPostDto(firstPost.blogId),
      title: 'Another test post',
    });

    const response = await request(app).get(POSTS_PATH).expect(HttpStatus.Ok);

    expect(response.body).toEqual([firstPost, secondPost]);
  });

  it('returns a post by id', async () => {
    const createdPost = await createPost(app);
    const post = await getPostById(app, createdPost.id);

    expect(post).toEqual(createdPost);
  });

  it('updates a post', async () => {
    const createdPost = await createPost(app);
    const updateData: Partial<PostInputDto> = {
      title: 'Updated post title',
      shortDescription: 'Updated short description',
      content: 'Updated post content',
    };

    await updatePost(app, createdPost.id, createdPost.blogId, updateData);

    expect(await getPostById(app, createdPost.id)).toEqual({
      ...createdPost,
      ...updateData,
    });
  });

  it('deletes a post', async () => {
    const post = await createPost(app);

    await deletePost(app, post.id);

    await request(app)
      .get(`${POSTS_PATH}/${post.id}`)
      .expect(HttpStatus.NotFound);
  });

  it('requires auth for post mutations', async () => {
    await request(app)
      .post(POSTS_PATH)
      .send({})
      .expect(HttpStatus.Unauthorized);

    const post = await createPost(app);

    await request(app)
      .put(`${POSTS_PATH}/${post.id}`)
      .send(getPostDto(post.blogId))
      .expect(HttpStatus.Unauthorized);

    await request(app)
      .delete(`${POSTS_PATH}/${post.id}`)
      .expect(HttpStatus.Unauthorized);

    await request(app)
      .get(`${POSTS_PATH}/${post.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatus.Ok);
  });
});
