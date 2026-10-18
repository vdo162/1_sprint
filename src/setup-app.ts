import express, { Express, Request, Response } from 'express';
import { bloggersRouter } from './bloggers/routers/bloggers.router';
import { postsRouter } from './posts/routers/posts.router';
import { testingRouter } from './testing/routers/testing.router';
import { BLOGGERS_PATH } from './bloggers/constants/bloggers.paths';
import { POSTS_PATH } from './posts/constants/posts.paths';
import { TESTING_PATH } from './testing/constants/testing.paths';
import { HttpStatus } from './core/types/http-statuses';

export const setupApp = (app: Express) => {
  // express.json() парсит JSON из тела запроса и кладёт его в req.body.
  app.use(express.json());

  // Health-check: простой ответ, что сервер жив.
  app.get('/', (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send('Hello world!');
  });

  // Каждый модуль подключается по своему базовому пути.
  app.use(BLOGGERS_PATH, bloggersRouter);
  app.use(POSTS_PATH, postsRouter);
  app.use(TESTING_PATH, testingRouter);

  return app;
};
