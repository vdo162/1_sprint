import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BLOGGERS_PATH } from '../../../src/bloggers/constants/bloggers.paths';
import { BloggersInputDto } from '../../../src/bloggers/dto/bloggers.input.dto';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { clearDb } from '../../utils/clear-db';
import { createBlogger } from '../../utils/bloggers/create-blogger';
import { getBloggerDto } from '../../utils/bloggers/get-blogger-dto';
import { getBloggerById } from '../../utils/bloggers/get-blogger-by-id';

const bloggerLengthBoundaries: Array<{
  field: keyof BloggersInputDto;
  min: number;
  max: number;
}> = [
  { field: 'name', min: 2, max: 15 },
  { field: 'description', min: 2, max: 500 },
];

describe('Blogger API body validation', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateBasicAuthToken();
  const validBloggerData: BloggersInputDto = getBloggerDto();

  beforeEach(async () => {
    await clearDb(app);
  });

  it('returns 401 when creating a blogger without auth', async () => {
    await request(app)
      .post(BLOGGERS_PATH)
      .send(validBloggerData)
      .expect(HttpStatus.Unauthorized);
  });

  it('rejects an invalid create body and does not create a blogger', async () => {
    const response = await request(app)
      .post(BLOGGERS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...validBloggerData,
        name: ' ',
        description: ' ',
        websiteUrl: 'http://invalid.example',
      })
      .expect(HttpStatus.BadRequest);

    expect(response.body.errorsMessages).toHaveLength(3);

    const bloggerListResponse = await request(app)
      .get(BLOGGERS_PATH)
      .expect(HttpStatus.Ok);
    expect(bloggerListResponse.body).toHaveLength(0);
  });

  it('rejects an invalid update body without changing the blogger', async () => {
    const blogger = await createBlogger(app, validBloggerData);

    const response = await request(app)
      .put(`${BLOGGERS_PATH}/${blogger.id}`)
      .set('Authorization', adminToken)
      .send({
        ...validBloggerData,
        name: ' ',
        description: ' ',
        websiteUrl: 'http://invalid.example',
      })
      .expect(HttpStatus.BadRequest);

    expect(response.body.errorsMessages).toHaveLength(3);
    expect(await getBloggerById(app, blogger.id)).toEqual(blogger);
  });

  it.each(bloggerLengthBoundaries)(
    'accepts $field at minimum and maximum lengths',
    async ({ field, min, max }) => {
      for (const length of [min, max]) {
        await request(app)
          .post(BLOGGERS_PATH)
          .set('Authorization', adminToken)
          .send({ ...getBloggerDto(), [field]: 'x'.repeat(length) })
          .expect(HttpStatus.Created);
      }
    },
  );

  it.each(bloggerLengthBoundaries)(
    'rejects $field below minimum length',
    async ({ field, min }) => {
      const response = await request(app)
        .post(BLOGGERS_PATH)
        .set('Authorization', adminToken)
        .send({ ...getBloggerDto(), [field]: 'x'.repeat(min - 1) })
        .expect(HttpStatus.BadRequest);

      expect(response.body.errorsMessages).toEqual([
        expect.objectContaining({ field }),
      ]);
    },
  );

  it.each(bloggerLengthBoundaries)(
    'rejects $field above maximum length',
    async ({ field, max }) => {
      const response = await request(app)
        .post(BLOGGERS_PATH)
        .set('Authorization', adminToken)
        .send({ ...getBloggerDto(), [field]: 'x'.repeat(max + 1) })
        .expect(HttpStatus.BadRequest);

      expect(response.body.errorsMessages).toEqual([
        expect.objectContaining({ field }),
      ]);
    },
  );

  it('accepts a valid websiteUrl at the 100-character maximum', async () => {
    const websiteUrl = `https://${'a'.repeat(88)}.com`;
    expect(websiteUrl).toHaveLength(100);

    await request(app)
      .post(BLOGGERS_PATH)
      .set('Authorization', adminToken)
      .send({ ...getBloggerDto(), websiteUrl })
      .expect(HttpStatus.Created);
  });

  it('rejects a valid websiteUrl over the 100-character maximum', async () => {
    const websiteUrl = `https://${'a'.repeat(89)}.com`;
    expect(websiteUrl).toHaveLength(101);

    const response = await request(app)
      .post(BLOGGERS_PATH)
      .set('Authorization', adminToken)
      .send({ ...getBloggerDto(), websiteUrl })
      .expect(HttpStatus.BadRequest);

    expect(response.body.errorsMessages).toContainEqual({
      field: 'websiteUrl',
      message: 'Length of websiteUrl is not correct',
    });
  });

  it('rejects a websiteUrl shorter than the minimum length', async () => {
    const response = await request(app)
      .post(BLOGGERS_PATH)
      .set('Authorization', adminToken)
      .send({ ...getBloggerDto(), websiteUrl: 'x' })
      .expect(HttpStatus.BadRequest);

    expect(response.body.errorsMessages).toContainEqual({
      field: 'websiteUrl',
      message: 'Length of websiteUrl is not correct',
    });
  });
});
