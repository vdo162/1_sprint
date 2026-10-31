import express, { Express, Request, Response } from 'express';
import { blogsRouter } from './blogs/routers/blogs.router';
import { postsRouter } from './posts/routers/posts.router';
import { testingRouter } from './testing/routers/testing.router';
import { POSTS_PATH } from './posts/constants/posts.paths';
import { TESTING_PATH } from './testing/constants/testing.paths';
import { HttpStatus } from './core/types/http-statuses';
import { BLOGS_PATH } from './blogs/constants/blogs.paths';
import { USERS_PATH } from './users/constants/users.paths';
import { usersRouter } from './users/routers/users.router';
import { AUTH_PATH } from './auth/constants/auth.paths';
import { authRouter } from './auth/routers/auth.router';

export const setupApp = (app: Express) => {
  app.use(express.json());

  // Health-check: простой ответ, что сервер жив.
  app.get('/', (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send('Hello world!');
  });

  app.use(AUTH_PATH, authRouter);
  app.use(USERS_PATH, usersRouter);
  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);
  app.use(TESTING_PATH, testingRouter);

  return app;
};
