import express, { Express, Request, Response } from "express";
import { videosRouter } from "./videos/routers/videos.router";
import { testingRouter } from "./testing/routers/testing.router";
import { HttpStatus } from "./core/types/http-statuses";
import { setupSwagger } from "./core/swagger/setup-swagger";

export const setupApp = (app: Express) => {
  // express.json() парсит JSON из тела запроса и кладёт его в req.body.
  app.use(express.json());

  // Health-check: простой ответ, что сервер жив.
  app.get("/", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send("Hello world!");
  });

  // Каждый модуль подключается по своему базовому пути.
  app.use("/videos", videosRouter);
  app.use("/testing", testingRouter);

  setupSwagger(app);
  return app;
};
