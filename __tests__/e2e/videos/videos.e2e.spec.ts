import request from "supertest";
import express from "express";
import { setupApp } from "../../../src/setup-app";
import { VideosCreateInputDto } from "../../../src/videos/dto/videosInputDto";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { Resolutions } from "../../../src/videos/types/video";

describe("Video API", () => {
  const app = express();
  setupApp(app);

  const testVideoData: VideosCreateInputDto = {
    title: "Введение в TypeScript за 10 минут",
    author: "Иван Иванов",
    availableResolutions: [Resolutions.P144],
  };

  beforeAll(async () => {
    await request(app).delete("/testing/all-data").expect(HttpStatus.NoContent);
  });

  it("should create video; POST /videos", async () => {
    const newVideo: VideosCreateInputDto = {
      ...testVideoData,
      title: "Как правильно готовить пасту карбонара",
      author: "Шеф-повар Антонио",
      availableResolutions: [Resolutions.P480],
    };

    await request(app)
      .post("/videos")
      .send(newVideo)
      .expect(HttpStatus.Created);
  });

  it("should return videos list; GET /videos", async () => {
    await request(app)
      .post("/videos")
      .send({
        ...testVideoData,
        title: "Как правильно готовить пасту карбонара",
      })
      .expect(HttpStatus.Created);

    await request(app)
      .post("/videos")
      .send({ ...testVideoData, name: "Another video2" })
      .expect(HttpStatus.Created);

    const videoListResponse = await request(app)
      .get("/videos")
      .expect(HttpStatus.Ok);

    expect(videoListResponse.body).toBeInstanceOf(Array);
    expect(videoListResponse.body.length).toBeGreaterThanOrEqual(2);
  });

  it("should return video by id; GET /videos/:id", async () => {
    const createResponse = await request(app)
      .post("/videos")
      .send({ ...testVideoData, name: "Another video" })
      .expect(HttpStatus.Created);

    const getResponse = await request(app)
      .get(`/videos/${createResponse.body.id}`)
      .expect(HttpStatus.Ok);

    expect(getResponse.body).toEqual({
      ...createResponse.body,
      id: expect.any(Number),
      createdAt: expect.any(String),
    });
  });
});
