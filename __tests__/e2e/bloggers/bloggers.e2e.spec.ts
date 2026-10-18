import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BLOGGERS_PATH } from '../../../src/bloggers/constants/bloggers.paths';
import { BloggersInputDto } from '../../../src/bloggers/dto/bloggers.input.dto';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { clearDb } from '../../utils/clear-db';
import { getBloggerDto } from '../../utils/bloggers/get-blogger-dto';
import { createBlogger } from '../../utils/bloggers/create-blogger';
import { getBloggerById } from '../../utils/bloggers/get-blogger-by-id';
import { updateBlogger } from '../../utils/bloggers/update-blogger';
import { deleteBlogger } from '../../utils/bloggers/delete-blogger';

describe('Bloggers API', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateBasicAuthToken();

  beforeEach(async () => {
    await clearDb(app);
  });

  it('creates a blogger', async () => {
    const bloggerData = getBloggerDto();
    const blogger = await createBlogger(app, bloggerData);

    expect(blogger).toEqual({ ...bloggerData, id: expect.any(String) });
  });

  it('returns the blogger list', async () => {
    const firstBlogger = await createBlogger(app);
    const secondBlogger = await createBlogger(app, {
      ...getBloggerDto(),
      name: 'Another Blogger',
    });

    const response = await request(app)
      .get(BLOGGERS_PATH)
      .expect(HttpStatus.Ok);

    expect(response.body).toEqual([firstBlogger, secondBlogger]);
  });

  it('returns a blogger by id', async () => {
    const createdBlogger = await createBlogger(app);
    const blogger = await getBloggerById(app, createdBlogger.id);

    expect(blogger).toEqual(createdBlogger);
  });

  it('updates a blogger', async () => {
    const createdBlogger = await createBlogger(app);
    const updateData: BloggersInputDto = {
      name: 'Updated Blogger',
      description: 'Updated blogger description',
      websiteUrl: 'https://updated.example.com',
    };

    await updateBlogger(app, createdBlogger.id, updateData);

    expect(await getBloggerById(app, createdBlogger.id)).toEqual({
      ...updateData,
      id: createdBlogger.id,
    });
  });

  it('deletes a blogger', async () => {
    const blogger = await createBlogger(app);

    await deleteBlogger(app, blogger.id);

    await request(app)
      .get(`${BLOGGERS_PATH}/${blogger.id}`)
      .expect(HttpStatus.NotFound);
  });

  it('requires auth for blogger mutations', async () => {
    await request(app)
      .post(BLOGGERS_PATH)
      .send(getBloggerDto())
      .expect(HttpStatus.Unauthorized);

    const blogger = await createBlogger(app);

    await request(app)
      .put(`${BLOGGERS_PATH}/${blogger.id}`)
      .send(getBloggerDto())
      .expect(HttpStatus.Unauthorized);

    await request(app)
      .delete(`${BLOGGERS_PATH}/${blogger.id}`)
      .expect(HttpStatus.Unauthorized);

    await request(app)
      .get(`${BLOGGERS_PATH}/${blogger.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatus.Ok);
  });
});
